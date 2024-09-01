import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Displays } from "@/constants";
import Trade from "@/interfaces/Trade";

export interface TradeState {
  trades: Trade[];
}

export const initialState: TradeState = {
  trades: [],
};

export const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    updateTrades: (state, action: PayloadAction<Trade[]>) => {
      state.trades = action.payload;
    },
  },
});

export const { updateTrades } = tradeSlice.actions;

export default tradeSlice.reducer;
