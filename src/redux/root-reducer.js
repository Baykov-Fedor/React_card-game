import { combineReducers } from "redux";
import cardsReducer from "./cards/cards.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
  cards: cardsReducer,
  user: userReducer,
});
