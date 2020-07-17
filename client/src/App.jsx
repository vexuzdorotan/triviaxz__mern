import React from 'react';
import history from './history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { GlobalProvider } from './context/GlobalState';
import NavBar from './components/NavBar';
import QuestionAnswer from './components/QuestionAnswer';
import Scoreboard from './components/Scoreboard';

const App = () => {
  return (
    <GlobalProvider>
      <Router history={history}>
        <NavBar />
        {/* <Container> */}
        <Switch>
          <Route path="/" exact component={QuestionAnswer}></Route>
          <Route path="/scoreboard" exact component={Scoreboard}></Route>
        </Switch>
        {/* </Container> */}
      </Router>
    </GlobalProvider>
  );
};

export default App;
