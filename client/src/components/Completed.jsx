import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

import { GlobalContext } from '../context/GlobalState';

const Completed = () => {
  const { score, startGame, clearQA } = useContext(GlobalContext);

  const playAgainOnClick = () => {
    clearQA();
  };

  return (
    <>
      <h1>Score: {score}</h1>
      <Button
        variant="primary"
        size="md"
        block
        onClick={() => playAgainOnClick()}
      >
        Start Game
      </Button>
    </>
  );
};

export default Completed;
