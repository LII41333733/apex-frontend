import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Displays } from "@/constants";
import { PriceData } from "@/types/PriceData";

export interface MainState {
  display: Displays;
  SPY: PriceData;
  QQQ: PriceData;
  IWM: PriceData;
}

export const initialState: MainState = {
  display: Displays.CHAIN,
  SPY: {
    symbol: "SPY",
    price: 0,
    changeDollars: 0,
    changePercentage: 0,
  },
  QQQ: {
    symbol: "QQQ",
    price: 0,
    changeDollars: 0,
    changePercentage: 0,
  },
  IWM: {
    symbol: "IWM",
    price: 0,
    changeDollars: 0,
    changePercentage: 0,
  },
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateDisplay: (state, action: PayloadAction<Displays>) => {
      state.display = action.payload;
    },
    updateSPYData: (state, action: PayloadAction<PriceData>) => {
      state.SPY = action.payload;
    },
    updateQQQData: (state, action: PayloadAction<PriceData>) => {
      state.QQQ = action.payload;
    },
    updateIWMData: (state, action: PayloadAction<PriceData>) => {
      state.IWM = action.payload;
    },
  },
});

export const { updateDisplay, updateSPYData, updateQQQData, updateIWMData } =
  mainSlice.actions;

export default mainSlice.reducer;
