import type { PayloadAction } from "@reduxjs/toolkit";
const initialState = { symbol: "" };

const symbolsReducer = (
  state = initialState,
  action: PayloadAction<number>
) => {
  switch (action.type) {
    case "setSymbol":
      return { ...state, symbol: action.payload };
    default:
      return state;
  }
};

export default symbolsReducer;
