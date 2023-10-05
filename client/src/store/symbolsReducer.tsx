import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SymbolState {
  symbol: string;
}

const initialState: SymbolState = {
  symbol: "",
};

export const symbolSlice = createSlice({
  name: "setSymbol",
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const { setSymbol } = symbolSlice.actions;

export default symbolSlice.reducer;
