import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { GlobalProvider } from './shared/context/GlobalState';
import NavBar from './shared/components/NavBar';
// import Play from './score/pages/Play';
// import Scoreboard from './score/pages/Scoreboard';
import './App.css';

const Play = React.lazy(() => import('./score/pages/Play'));
const Scoreboard = React.lazy(() => import('./score/pages/Scoreboard'));

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <NavBar />
        <Suspense
          fallback={
            <Spinner animation="border" variant="primary" className="spinner" />
          }
        >
          <Switch>
            <Route path="/" exact component={Play}></Route>
            <Route path="/scoreboard" exact component={Scoreboard}></Route>
            <Route
              path="/scoreboard/:playerId"
              exact
              component={Scoreboard}
            ></Route>
          </Switch>
        </Suspense>
      </Router>
    </GlobalProvider>
  );
};

export default App;
