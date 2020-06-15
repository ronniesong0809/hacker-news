import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { ReactComponent as Logo } from './Logo.svg';

class Headers extends Component {
  render() {
    return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <Logo fill="white" src="/Logo.svg" width="30" height="30" className="d-inline-block align-top" />{' '}
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