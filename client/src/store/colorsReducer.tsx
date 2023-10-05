import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ColorState {
  color: string;
}

const initialState: ColorState = {
  color: "",
};

export const colorSlice = createSlice({
  name: "setColor",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export const { setColor } = colorSlice.actions;

export default colorSlice.reducer;
