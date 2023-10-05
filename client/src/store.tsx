import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers/";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const composedFunctions = composeWithDevTools(...[applyMiddleware(thunk)]);

const store = createStore(allReducers, composedFunctions);

export { store };
