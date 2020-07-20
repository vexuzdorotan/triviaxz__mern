import _ from 'lodash';

export const START_GAME = 'START_GAME';
export const SET_OPTION = 'SET_OPTION';
export const FETCH_QA = 'FETCH_QA';
export const CLEAR_QA = 'CLEAR_QA';
export const INC_QNUMBER = 'INC_QNUMBER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const BOOL_SCORE = 'BOOL_SCORE';

export default (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        start: action.payload,
      };

    case SET_OPTION:
      return {
        ...state,
        option: action.payload,
      };

    case FETCH_QA:
      return {
        ...state,
        qa: action.payload,
      };

    case CLEAR_QA:
      return action.payload;

    case INC_QNUMBER:
      return {
        ...state,
        questionNumber: action.payload + 1,
      };

    case SAVE_SCORE:
      return {
        ...state,
        score: action.payload,
      };

    case BOOL_SCORE:
      return {
        ...state,
        boolScore: action.payload,
      };

    default:
      return state;
  }
};
