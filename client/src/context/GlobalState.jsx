import React, { createContext, useReducer } from 'react';

import GlobalReducer from './GlobalReducer';

const initialState = {
  questionNumber: 0,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  // Actions
  const incrementQNumber = (n) => {
    dispatch({
      type: 'INC_QNUMBER',
      payload: n,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        questionNumber: state.questionNumber,
        incrementQNumber,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
