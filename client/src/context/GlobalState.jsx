import React, { createContext, useReducer } from 'react';

import { FETCH_QA, INC_QNUMBER, SAVE_SCORE } from './GlobalReducer';
import GlobalReducer from './GlobalReducer';

const initialState = {
  questionNumber: 0,
  qa: [
    {
      category: '',
      type: '',
      difficulty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
    },
  ],
  score: 0,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const fetchQA = (qa) => {
    dispatch({
      type: FETCH_QA,
      payload: qa,
    });
  };

  const incrementQNumber = (n) => {
    dispatch({
      type: INC_QNUMBER,
      payload: n,
    });
  };

  const saveScore = (score) => {
    dispatch({
      type: SAVE_SCORE,
      payload: score,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        questionNumber: state.questionNumber,
        qa: state.qa,
        score: state.score,
        fetchQA,
        incrementQNumber,
        saveScore,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
