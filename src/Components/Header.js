import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode} from '@fortawesome/free-solid-svg-icons'

class Headers extends Component {
  render() {
    return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faCode}/>{' '}
          Hacker News Top 100
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/About">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Headers