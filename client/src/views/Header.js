import React from 'react'
import Navbar from 'react-bootstrap/Navbar'


const Header = ({user}) => {  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Online course platform</Navbar.Brand>      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">{user}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default Header;