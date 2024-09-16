import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Trade from "@/interfaces/Trade";
import TradeSummary from "@/interfaces/TradeSummary";

export interface TradeState {
  trades: Trade[];
  tradeSummary: TradeSummary;
}

export const initialState: TradeState = {
  trades: [],
  tradeSummary: {
    baseTrades: {
      allTrades: {},
      pendingTrades: [],
      openTrades: [],
      runnerTrades: [],
      filledTrades: [],
      canceledTrades: [],
      rejectedTrades: [],
    },
  },
};

export const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    updateTrades: (state, action: PayloadAction<Trade[]>) => {
      state.trades = action.payload.reverse();
    },
    updateTradeSummary: (state, action: PayloadAction<TradeSummary>) => {
      state.tradeSummary = action.payload;
    },
  },
});

export const { updateTrades, updateTradeSummary } = tradeSlice.actions;

export default tradeSlice.reducer;
