import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={NavLink} to="/">
          OpenTrivia
        </Navbar.Brand>

        {/* <Navbar.Text>Score: </Navbar.Text> */}
        <Nav variant="pills" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/" exact>
              Play
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/scoreboard" exact>
              Scoreboard
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
