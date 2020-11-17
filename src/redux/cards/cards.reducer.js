import { closeCardHelper, openCardHelper } from "./cards.utils";

const { cardsActionTypes } = require("./cards.types");

const INITIAL_STATE = {
  arrOfCards: [],
  cardsState: [],
  match: "",
};

const cardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cardsActionTypes.SET_MATCH:
      return {
        ...state,
        match: action.payload,
      };
    case cardsActionTypes.SET_CARDS_STATE:
      return {
        ...state,
        cardsState: action.payload,
      };
    case cardsActionTypes.SET_ARR_OF_CARDS:
      return {
        ...state,
        arrOfCards: action.payload,
      };
    case cardsActionTypes.OPEN_CARD:
      return {
        ...state,
        cardsState: openCardHelper(state.cardsState, action.payload),
      };
    case cardsActionTypes.CLOSE_CARD:
      return {
        ...state,
        cardsState: closeCardHelper(state.cardsState, action.payload),
      };
    default:
      return state;
  }
};

export default cardsReducer;
