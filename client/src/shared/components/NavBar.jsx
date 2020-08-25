import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import jwt from 'jsonwebtoken';

import { GlobalContext } from '../context/GlobalState';
import Login from '../../user/pages/Login';

const NavBar = () => {
  const { isLoggedIn, login, logout, user, start, clearQA } = useContext(
    GlobalContext
  );

  const [expanded, setExpanded] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.token && !isLoggedIn) {
      try {
        const decoded = jwt.verify(
          userData.token,
          process.env.REACT_APP_JWT_SECRET_KEY
        );

        const remainingTime = decoded.exp * 1000 - new Date().getTime();
        setTimeout(() => {
          logout(false);
        }, remainingTime);

        login(null, null, userData);
      } catch (error) {
        console.log(error);
        logout(false);
      }
    }
  }, [isLoggedIn, login, logout]);

  const homeOnClick = () => {
    if (start) {
      clearQA();
    }
  };

  const handleLogout = () => {
    setModalShow(false);
    logout(false);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        expanded={expanded}
      >
        <Navbar.Brand as={NavLink} to="/" className="font-weight-bolder">
          tri<span className="text-primary">V</span>ia
          <span className="text-primary">X</span>
          <span className="text-primary">Z</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(expanded ? false : 'expanded')}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/"
                exact
                onClick={() => {
                  homeOnClick();
                  setExpanded(false);
                }}
              >
                {start ? 'Quit' : 'Play'}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to="/scoreboard"
                exact
                onClick={() => setExpanded(false)}
              >
                Scoreboard
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Nav className="ml-auto">
            <div className="mr-2 mb-2 mb-md-0">
              {isLoggedIn && (
                <span>
                  <Image
                    src={`http://localhost:5000/${user.image}`}
                    className="my-auto mr-2"
                    roundedCircle
                    // fluid
                    style={{ height: '6vh' }}
                  />
                </span>
              )}
              <Navbar.Text>
                Login as{' '}
                <span className="text-light">
                  {isLoggedIn ? (
                    <Link
                      to={`/scoreboard/${user._id}`}
                      className="text-light"
                      onClick={() => setExpanded(false)}
                    >
                      {user.name}
                    </Link>
                  ) : (
                    'Guest'
                  )}
                </span>
              </Navbar.Text>
            </div>
            <Button
              variant="outline-light"
              onClick={() => {
                !isLoggedIn ? setModalShow(true) : handleLogout();
                setExpanded(false);
              }}
            >
              {!isLoggedIn ? 'Login' : 'Logout'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {!isLoggedIn && (
        <Login show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </>
  );
};

export default NavBar;
