import { cardsActionTypes } from "./cards.types";

export const openCard = (index) => ({
  type: cardsActionTypes.OPEN_CARD,
  payload: index,
});

export const openAllCards = () => ({
  type: cardsActionTypes.OPEN_ALL_CARDS,
});

export const closeCard = (index) => ({
  type: cardsActionTypes.CLOSE_CARD,
  payload: index,
});

export const setArrOfCards = (arr) => ({
  type: cardsActionTypes.SET_ARR_OF_CARDS,
  payload: arr,
});

export const setCardsState = (arr) => ({
  type: cardsActionTypes.SET_CARDS_STATE,
  payload: arr,
});

export const setMatch = (index) => ({
  type: cardsActionTypes.SET_MATCH,
  payload: index,
});
