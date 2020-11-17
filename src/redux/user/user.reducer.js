const { userActionTypes } = require("./user.types");

const INITIAL_STATE = {
  currentUser: "",
  currentDifficulty: "easy",
  currentTurns: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userActionTypes.SET_CURRENT_DIFFICULTY:
      return {
        ...state,
        currentDifficulty: action.payload,
      };
    case userActionTypes.INCREASE_NUM_OF_TURNS:
      return {
        ...state,
        currentTurns: state.currentTurns + action.payload,
      };
    case userActionTypes.RESET_NUM_OF_TURNS:
      return {
        ...state,
        currentTurns: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
