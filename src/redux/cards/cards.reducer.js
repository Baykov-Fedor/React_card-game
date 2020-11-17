import { closeCard, openCard } from "./cards.utils";

const { cardsActionTypes } = require("./cards.types");

const INITIAL_STATE = {
  cardsState: [],
};

const cardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cardsActionTypes.OPEN_CARD:
      return {
        cardsState: openCard(state.cardsState, action.payload),
      };
    case cardsActionTypes.CLOSE_CARD:
      return {
        cardsState: closeCard(state.cardsState, action.payload),
      };
    default:
      return state;
  }
};

export default cardsReducer;
