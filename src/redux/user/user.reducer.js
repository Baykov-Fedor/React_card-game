const { userActionTypes } = require("./user.types");

const INITIAL_STATE = {
  currentUser: null,
  currentDifficulty: "easy",
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

    default:
      return state;
  }
};

export default userReducer;
