import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface searchValueState {
  searchValue: string;
}

const initialState: searchValueState = {
  searchValue: "",
};

export const searchValueSlice = createSlice({
  name: "setSearchValue",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;

export default searchValueSlice.reducer;
