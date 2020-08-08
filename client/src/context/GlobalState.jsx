import React, { createContext, useReducer } from 'react';

import {
  RESET_HTTP_ERROR,
  RESET_SIGNUP,
  SIGNUP,
  LOGIN,
  LOGOUT,
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
import trivia from '../api/trivia-quiz';

const initialState = {
  httpError: null,
  isLoggedIn: false,
  isSignedUp: false,
  user: null,
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

  const resetHttpError = async () => {
    dispatch({
      type: RESET_HTTP_ERROR,
    });
  };

  const resetSignup = async () => {
    dispatch({
      type: RESET_SIGNUP,
    });
  };

  const signup = async (name, email, password) => {
    let error = null;
    let isSignedUp = false;

    try {
      await trivia.post('/users', {
        name,
        email,
        password,
      });

      isSignedUp = true;
    } catch (e) {
      error = e.response.data.error;
    }

    dispatch({
      type: SIGNUP,
      payload: { isSignedUp, error },
    });
  };

  const login = async (email, password) => {
    let user = null;
    let error = null;
    let isLoggedIn = false;

    try {
      const response = await trivia.post('/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        user = response.data.user;
        isLoggedIn = true;
      } else {
        throw new Error(response);
      }
    } catch (e) {
      error = e.response.data.error;
    }

    dispatch({
      type: LOGIN,
      payload: { isLoggedIn, user, error },
    });
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

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
    const resetState = {
      questionNumber: 0,
      option: {},
      qa: [],
      score: 0,
      boolScore: [],
      start: false,
    };

    dispatch({
      type: CLEAR_QA,
      payload: resetState,
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
        httpError: state.httpError,
        isSignedUp: state.isSignedUp,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        start: state.start,
        option: state.option,
        questionNumber: state.questionNumber,
        qa: state.qa,
        score: state.score,
        boolScore: state.boolScore,
        resetHttpError,
        resetSignup,
        signup,
        login,
        logout,
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
