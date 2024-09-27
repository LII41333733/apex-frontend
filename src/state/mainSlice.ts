import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Displays } from "@/constants";
import { PriceData } from "@/types/PriceData";
import { apexApi } from "./api/apex";

export interface MainState {
  token: string | null;
  display: Displays;
  SPY: PriceData;
  QQQ: PriceData;
  IWM: PriceData;
}

export const initialState: MainState = {
  token: localStorage.getItem("token"),
  display: Displays.POSITIONS,
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
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  updateDisplay,
  updateSPYData,
  updateQQQData,
  updateIWMData,
  setToken,
  removeToken,
} = mainSlice.actions;

export default mainSlice.reducer;
