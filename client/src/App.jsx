import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { GlobalProvider } from './shared/context/GlobalState';
import NavBar from './shared/components/NavBar';
import Play from './score/pages/Play';
import Scoreboard from './score/pages/Scoreboard';
import './App.css';

const App = () => {
  const history = useHistory();
  console.log(window.location.pathname);

  return (
    <GlobalProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Play}></Route>
          <Route path="/scoreboard" exact component={Scoreboard}></Route>
          <Route
            path="/scoreboard/:playerId"
            exact
            component={Scoreboard}
          ></Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
};

export default App;
