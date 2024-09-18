import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Trade from "@/interfaces/Trade";
import TradeSummary from "@/interfaces/TradeSummary";
import BaseTrade from "@/interfaces/BaseTrade";

export interface TradeState {
  trades: BaseTrade[];
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
    updateTrades: (state, action: PayloadAction<BaseTrade[]>) => {
      state.trades = action.payload.reverse();
    },
    updateTradeSummary: (state, action: PayloadAction<TradeSummary>) => {
      state.tradeSummary = action.payload;
      // state.trades = Object.entries(action.payload.baseTrades.allTrades);
    },
  },
});

export const { updateTrades, updateTradeSummary } = tradeSlice.actions;

export default tradeSlice.reducer;
