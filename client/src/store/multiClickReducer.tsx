import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponseDataArray } from "../interfaces/";

export interface multiClickState {
  multiClick: ApiResponseDataArray;
}

const initialState: multiClickState = {
  multiClick: [],
};

export const multiClickSlice = createSlice({
  name: "setMultiClick",
  initialState,
  reducers: {
    setMultiClick: (state, action: PayloadAction<ApiResponseDataArray>) => {
      return { ...state, multiClick: action.payload };
    },
  },
});

export const { setMultiClick } = multiClickSlice.actions;

export default multiClickSlice.reducer;
