import { configureStore } from "@reduxjs/toolkit";
import symbolsReducer from "./symbolsReducer";
import colorsReducer from "./colorsReducer";

export const store = configureStore({
  reducer: {
    symbols: symbolsReducer,
    colors: colorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
