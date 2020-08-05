import React, { createContext, useReducer } from 'react';

import {
  SET_OPTION,
  START_GAME,
  FETCH_QA,
  CLEAR_QA,
  INC_QNUMBER,
  SAVE_SCORE,
  BOOL_SCORE,
} from './GlobalReducer';
import GlobalReducer from './GlobalReducer';
import opentdb from '../api/opentdb';

const initialState = {
  questionNumber: 0,
  option: {},
  qa: [],
  score: 0,
  boolScore: [],
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
    const { category } = state.option;
    const amount = 2;
    const params = Object.assign(
      {},
      category && { category },
      amount && { amount }
    );

    const response = await opentdb.get('', {
      params,
    });

    dispatch({
      type: FETCH_QA,
      payload: response.data.results,
    });
  };

  const clearQA = () => {
    dispatch({
      type: CLEAR_QA,
      payload: initialState,
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

  const setBoolScore = (bool) => {
    dispatch({
      type: BOOL_SCORE,
      payload: [...state.boolScore, bool],
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
        boolScore: state.boolScore,
        startGame,
        setOption,
        fetchQA,
        clearQA,
        incrementQNumber,
        saveScore,
        setBoolScore,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
