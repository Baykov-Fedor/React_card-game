const { userActionTypes } = require("./user.types");

export const setCurrentUser = (userName) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: userName,
});

export const setCurrentDifficulty = (difficulty) => ({
  type: userActionTypes.SET_CURRENT_DIFFICULTY,
  payload: difficulty,
});
