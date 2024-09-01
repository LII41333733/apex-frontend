import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Displays } from "@/constants";

export interface MainState {
  display: Displays;
}

export const initialState: MainState = {
  display: Displays.CHAIN,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateDisplay: (state, action: PayloadAction<Displays>) => {
      state.display = action.payload;
    },
  },
});

export const { updateDisplay } = mainSlice.actions;

export default mainSlice.reducer;
