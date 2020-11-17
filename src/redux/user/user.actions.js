import { userActionTypes } from "./user.types";

export const setCurrentUser = (userName) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: userName,
});

export const setCurrentDifficulty = (difficulty) => ({
  type: userActionTypes.SET_CURRENT_DIFFICULTY,
  payload: difficulty,
});

export const increaseNumOfTurns = () => ({
  type: userActionTypes.INCREASE_NUM_OF_TURNS,
  payload: 1,
});

export const resetNumOfTurns = () => ({
  type: userActionTypes.RESET_NUM_OF_TURNS,
  payload: 0,
});
