import React, { createContext, useReducer } from 'react';

import {
  SET_OPTION,
  START_GAME,
  FETCH_QA,
  INC_QNUMBER,
  SAVE_SCORE,
} from './GlobalReducer';
import GlobalReducer from './GlobalReducer';
import opentdb from '../api/opentdb';

const initialState = {
  questionNumber: 0,
  option: {
    category: 0,
    difficulty: '',
    numQ: 0,
  },
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
  start: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const startGame = (start) => {
    dispatch({
      type: START_GAME,
      payload: start,
    });
  };

  const setOption = (option) => {
    dispatch({
      type: SET_OPTION,
      payload: option,
    });
  };

  const fetchQA = () => async () => {
    const response = await opentdb.get('', {
      params: {
        amount: state.option.numQ,
        category: state.option.category,
        difficulty: state.option.difficulty,
        type: 'multiple',
      },
    });

    console.log(response.data.results);

    dispatch({
      type: FETCH_QA,
      payload: response.data.results,
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
        start: state.start,
        option: state.option,
        questionNumber: state.questionNumber,
        qa: state.qa,
        score: state.score,
        startGame,
        setOption,
        fetchQA,
        incrementQNumber,
        saveScore,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
