import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';

import { GlobalContext } from '../context/GlobalState';
import Login from '../../user/pages/Login';

const NavBar = () => {
  const {
    isLoggedIn,
    login,
    logout,
    user,
    setPlayingStatus,
    start,
    clearQA,
  } = useContext(GlobalContext);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.token && !isLoggedIn) {
      login(null, null, userData);
    }
  }, [login, isLoggedIn]);

  const homeOnClick = () => {
    if (start) {
      clearQA();
      setPlayingStatus('OPTION');
    }
  };

  const handleLogout = () => {
    setModalShow(false);
    logout();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand as={NavLink} to="/" className="font-weight-bolder">
          tri<span className="text-primary">V</span>ia
          <span className="text-primary">X</span>
          <span className="text-primary">Z</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav defaultActiveKey="/">
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
                  {isLoggedIn ? user.name : 'Guest'}
                </span>
              </Navbar.Text>
            </div>
            <Button
              variant="outline-light"
              onClick={() =>
                !isLoggedIn ? setModalShow(true) : handleLogout()
              }
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
