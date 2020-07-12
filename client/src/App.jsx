import React from 'react';
import { Container } from 'react-bootstrap';

import { GlobalProvider } from './context/GlobalState';
import QuestionAnswer from './components/QuestionAnswer';

const App = () => {
  return (
    <GlobalProvider>
      <Container>
        <QuestionAnswer />
      </Container>
    </GlobalProvider>
  );
};

export default App;
