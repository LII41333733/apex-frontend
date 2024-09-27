import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Trade from "@/interfaces/Trade";
import TradeSummary from "@/interfaces/TradeSummary";
import BaseTrade from "@/interfaces/BaseTrade";
import LottoTrade from "@/interfaces/LottoTrade";

export interface TradeState {
  trades: BaseTrade[];
  tradeSummary: TradeSummary;
  tradeSummarySnapshot: TradeSummary | null;
}

const initialSummary = {
  allTrades: {},
  pendingTrades: [],
  openTrades: [],
  runnerTrades: [],
  filledTrades: [],
  canceledTrades: [],
  rejectedTrades: [],
};

export const initialState: TradeState = {
  trades: [],
  tradeSummary: {
    baseTrades: initialSummary,
    lottoTrades: initialSummary,
  },
  tradeSummarySnapshot: null,
};

export const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    updateTrades: (state, action: PayloadAction<BaseTrade[]>) => {
      state.trades = action.payload.reverse();
    },
    updateTradeSummary: (state, action: PayloadAction<TradeSummary>) => {
      const tradeSummaryCopy: TradeSummary = { ...action.payload };
      state.tradeSummary = tradeSummaryCopy;

      delete tradeSummaryCopy.a;

      if (!state.tradeSummarySnapshot) {
        state.tradeSummarySnapshot;
      }
      // state.trades = Object.entries(action.payload.baseTrades.allTrades);
    },
  },
});

export const getAllTrades = ({
  tradeSummary: { baseTrades, lottoTrades },
}: TradeState) => {
  const base: [string, BaseTrade][] = Object.entries(baseTrades.allTrades);
  const lotto: [string, LottoTrade][] = Object.entries(lottoTrades.allTrades);
  return [...base, ...lotto];
};

export const { updateTrades, updateTradeSummary } = tradeSlice.actions;

export default tradeSlice.reducer;
