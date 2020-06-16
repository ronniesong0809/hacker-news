import React, {Component} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import {ListGroup, Container, Media, Spinner, Badge} from 'react-bootstrap'
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

  getStory(i){
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

  fromNow(timestamp){
    return moment(timestamp*1000).fromNow()
    // return moment(timestamp*1000).startOf('hour').fromNow()
  }

  getUserUrl(userId){
    return "https://news.ycombinator.com/user?id=" + userId
  }

  getKidsUrl(kidsId){
    if(kidsId){
      return kidsId.length
    }else{
      return 0
    }
  }

  getItemUrl(itemId){
    return "https://news.ycombinator.com/item?id=" + itemId
  }

  componentDidMount(){
    const base = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    Axios.get(base)
    .then(async(res) => {
      res.data.slice(0,100).forEach((element, e_index) => {
        // console.log(element)
        this.getStory(element)
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
            {!this.state.isLoad &&
            <span className="loading my-5">
              <Spinner animation="grow" /> {" "}
              <Spinner animation="grow" /> {" "}
              <Spinner animation="grow" /> {" "}
              <Spinner animation="grow" /> {" "}
              <Spinner animation="grow" />
            </span>}

            {this.state.isLoad &&
            <ListGroup variant="flush">
              {this.state.items.map((item, item_key) =>
              <ListGroup.Item key={item_key}>
                <Media>
                  <span className="mr-3">
                    {item_key+1}
                  </span>
                  <Media.Body>
                    <span className="title">
                      <a  className="blackLink" href={item.url} rel="noopener noreferrer" target="_blank">{item.title}</a>
                    </span> {" "}
                    <span className="subtitle">
                      {this.shortUrl(item.url)}
                    </span><br/>
                    <span className="subtitle">
                      {item.score} points by {" "}
                      <Badge variant="dark">
                        <a className="whiteLink" href={this.getUserUrl(item.by)} rel="noopener noreferrer" target="_blank">{item.by}</a>
                      </Badge>{" "}
                      <time title={this.time(item.time)}>{this.fromNow(item.time)}</time> |{" "}
                      <a className="blackLink" href={this.getItemUrl(item.id)} rel="noopener noreferrer" target="_blank">
                        {this.getKidsUrl(item.kids)} comments
                      </a>
                    </span>
                  </Media.Body>
                </Media>
              </ListGroup.Item>
              )}
            </ListGroup>}
        </Container>
        <Footer/>
      </div>
    )
  }
}

export default Body