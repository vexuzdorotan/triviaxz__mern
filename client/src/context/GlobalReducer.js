export const FETCH_QA = 'FETCH_QA';
export const INC_QNUMBER = 'INC_QNUMBER';
export const SAVE_SCORE = 'SAVE_SCORE';

export default (state, action) => {
  switch (action.type) {
    case FETCH_QA:
      return {
        ...state,
        qa: action.payload,
      };

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

    default:
      return state;
  }
};
