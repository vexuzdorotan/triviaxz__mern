import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

const Completed = () => {
  const { score } = useContext(GlobalContext);

  console.log(score);

  return (
    <div>
      <h1>Score: {score}</h1>
    </div>
  );
};

export default Completed;
