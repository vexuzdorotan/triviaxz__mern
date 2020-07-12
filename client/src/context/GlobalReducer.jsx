export default (state, action) => {
  switch (action.type) {
    case 'INC_QNUMBER':
      const n = action.payload === 0 ? ++action.payload : action.payload++;

      return {
        ...state,
        questionNumber: n,
      };
    default:
      return state;
  }
};
