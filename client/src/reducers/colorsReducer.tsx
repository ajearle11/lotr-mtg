import type { PayloadAction } from "@reduxjs/toolkit";
const initialState = { color: "" };

const colorsReducer = (state = initialState, action: PayloadAction<number>) => {
  switch (action.type) {
    case "setColor":
      return { ...state, color: action.payload };
    default:
      return state;
  }
};

export default colorsReducer;
