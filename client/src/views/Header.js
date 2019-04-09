import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const Header = ({user}) => {  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
  <Navbar.Brand href="#home">Online course platform</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      Signed in as: <a href="#login">{user}</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
  );
}


export default Header;