import { combineReducers } from "redux";
import colorsReducer from "./colorsReducer.tsx";
import symbolsReducer from "./symbolsReducer.tsx";

const allReducers = combineReducers({
  colors: colorsReducer,
  symbols: symbolsReducer,
});

export default allReducers;
