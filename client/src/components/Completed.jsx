import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

const Completed = () => {
  const { score } = useContext(GlobalContext);

  return (
    <>
      <h1>Score: {score}</h1>
    </>
  );
};

export default Completed;
