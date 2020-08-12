import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';

import { GlobalContext } from '../context/GlobalState';
import Login from '../../user/pages/Login';

const NavBar = () => {
  const { isLoggedIn, logout, user, start, clearQA } = useContext(
    GlobalContext
  );
  const [modalShow, setModalShow] = useState(false);

  const homeOnClick = () => {
    if (start) {
      clearQA();
    }
  };

  const handleLogout = () => {
    setModalShow(false);
    logout();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={NavLink} to="/" className="font-weight-bolder">
          Tri<span className="text-primary">V</span>ia
          <span className="text-primary">X</span>
          <span className="text-primary">Z</span>
        </Navbar.Brand>

        <Nav variant="pills" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/" exact onClick={() => homeOnClick()}>
              {start ? 'Quit' : 'Play'}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/scoreboard" exact>
              Scoreboard
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Nav className="ml-auto">
          <Image
            src="https://picsum.photos/200"
            className="my-auto mr-2"
            roundedCircle
            fluid
            style={{ height: '6vh' }}
          />
          <Navbar.Text className="mr-2">
            Login as{' '}
            <span className="text-light">
              {isLoggedIn ? user.name : 'Guest'}
            </span>
          </Navbar.Text>
          <Button
            variant="outline-light"
            onClick={() => (!isLoggedIn ? setModalShow(true) : handleLogout())}
          >
            {!isLoggedIn ? 'Login' : 'Logout'}
          </Button>
        </Nav>
      </Navbar>

      {!isLoggedIn && (
        <Login show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </>
  );
};

export default NavBar;
