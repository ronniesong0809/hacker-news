import React, {Component} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import {ListGroup, Container} from 'react-bootstrap'
import Axios from 'axios'
import moment from 'moment'

class Body extends Component {
  constructor(){
    super();
    this.state = {
      items: []
    }
  }

  displayStory(i){
    // console.log(i)
    const base = "https://hacker-news.firebaseio.com/v0/item/"+i+".json"
    Axios.get(base)
    .then(res => {
      // console.log(res.data)
      this.setState({
        items: [...this.state.items, res.data]
      })
      // console.log(this.state.items)
    })
    .catch(err => {
      console.log(err);
    })
  }

  shortUrl(url){
    if(url){
      console.log(url)
      var pathArray = url.split( '/' );
      var host = pathArray[2];
      return "("+host+")"
    }
  }

  time(timestamp){
    return moment(timestamp*1000).format('MMMM Do YYYY, h:mm:ss a')
    // return moment(timestamp*1000).startOf('hour').fromNow()
  }

  componentDidMount(){
    const base = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    Axios.get(base)
    .then(async(res) => {
      res.data.slice(0, 100).forEach(element => {
        // console.log(element)
        this.displayStory(element)
      }, 2);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <Header/>
          <Container className="my-5">
          <ListGroup>
          {this.state.items.map((item, item_key) =>
            <ListGroup.Item key={item_key}>
              {item_key+1}. <a href={item.url}>{item.title}</a> {this.shortUrl(item.url)}<br/>
              {item.score} points by <a href={item.url}>{item.by}</a> {this.time(item.time)}
            </ListGroup.Item>
          )}
          </ListGroup>
        </Container>
        <Footer/>
      </div>
    )
  }
}

export default Body