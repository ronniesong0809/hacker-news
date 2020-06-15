import React, {Component} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import {ListGroup, Container, ProgressBar} from 'react-bootstrap'
import Axios from 'axios'
import moment from 'moment'
import './stylesheet.css';

class Body extends Component {
  constructor(){
    super();
    this.state = {
      items: [],
      isLoad: false,
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
      // console.log(url)
      var pathArray = url.split( '/' );
      var host = pathArray[2];
      return "("+host+")"
    }
  }

  time(timestamp){
    return moment(timestamp*1000).format('MMMM Do YYYY, h:mm:ss a')
    // return moment(timestamp*1000).startOf('hour').fromNow()
  }

  getUserUrl(userId){
    return "https://news.ycombinator.com/user?id=" + userId
  }

  getIndex(){
    console.log(this.state.index)
    return this.state.index/1000
  }

  componentDidMount(){
    const base = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    Axios.get(base)
    .then(async(res) => {
      res.data.forEach((element, e_index) => {
        // console.log(element)
        this.displayStory(element)
      });
      this.setState({
        isLoad: true
      })
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
              <span className="title">{item_key+1}. <a  className="blackLink" href={item.url}>{item.title}</a></span> <span className="subtitle">{this.shortUrl(item.url)}</span><br/>
              <span className="subtitle">{item.score} points by <a  className="blackLink" href={this.getUserUrl(item.by)}>{item.by}</a> {this.time(item.time)}</span>
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