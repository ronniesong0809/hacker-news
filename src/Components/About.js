import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Container, Jumbotron, Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBug} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

class About extends Component {
  render() {
    return (
      <div>
        <Header />
          <Container>
            <Jumbotron className="About m-5" fluid>
              <h1>Welcome!</h1>
              <p>This is a simple PWA webapp that allows its display the top 100 Hacker News.</p>
              <Button
                variant="btn btn-lg btn-outline-dark"
                className="m-1"
                href="https://github.com/ronniesong0809/hacker-news"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub}/> Learn More
              </Button>
              <Button
                variant="btn btn-lg btn-outline-warning"
                className="m-1"
                href="https://github.com/ronniesong0809/hacker-news/issues/new"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faBug}/> Submit a Bug
              </Button>
            </Jumbotron>
          </Container>
        <Footer />
      </div>
    )
  }
}

export default About