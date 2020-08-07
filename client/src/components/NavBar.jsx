import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

import { GlobalContext } from '../context/GlobalState';
import Login from './Login';

const NavBar = () => {
  const { isLoggedIn, logout, user, start, clearQA } = useContext(
    GlobalContext
  );
  const [modalShow, setModalShow] = React.useState(false);

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
        <Navbar.Brand as={NavLink} to="/">
          OpenTrivia
        </Navbar.Brand>

        {/* <Navbar.Text>Score: </Navbar.Text> */}
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
          <Navbar.Text className="mr-2">
            Login as{' '}
            <span className="text-light">
              {isLoggedIn ? user.name : 'Guest'}
            </span>
          </Navbar.Text>
          <Button
            variant="outline-primary"
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
