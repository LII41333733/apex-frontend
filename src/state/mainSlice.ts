import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Displays } from "@/constants";

export interface MainState {
  display: Displays;
}

// Define the initial state using that type
const initialState: MainState = {
  display: Displays.POSITIONS,
};

export const mainSlice = createSlice({
  name: "main",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateDisplay: (state, action: PayloadAction<Displays>) => {
      state.display = action.payload;
    },
  },
});

export const { updateDisplay } = mainSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default mainSlice.reducer;
