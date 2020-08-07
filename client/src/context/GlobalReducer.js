export const RESET_HTTP_ERROR = 'RESET_HTTP_ERROR';
export const RESET_SIGNUP = 'RESET_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const START_GAME = 'START_GAME';
export const SET_OPTION = 'SET_OPTION';
export const FETCH_QA = 'FETCH_QA';
export const CLEAR_QA = 'CLEAR_QA';
export const INC_QNUMBER = 'INC_QNUMBER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const BOOL_SCORE = 'BOOL_SCORE';

export default (state, action) => {
  switch (action.type) {
    case RESET_HTTP_ERROR:
      return {
        ...state,
        httpError: null,
      };
    case RESET_SIGNUP:
      return {
        ...state,
        isSignedUp: false,
      };
    case SIGNUP:
      return {
        ...state,
        isSignedUp: action.payload.isSignedUp,
        httpError: action.payload.error,
      };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        httpError: action.payload.error,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
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
