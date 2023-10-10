import { configureStore, combineReducers } from "@reduxjs/toolkit";
import symbolsReducer from "./symbolsReducer";
import colorsReducer from "./colorsReducer";
import multiClickReducer from "./multiClickReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  symbols: symbolsReducer,
  colors: colorsReducer,
  multiClick: multiClickReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
