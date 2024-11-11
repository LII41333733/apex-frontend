import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Trade from '@/interfaces/Trade';
import TradeSummary from '@/interfaces/TradeSummary';
import BaseTrade from '@/interfaces/BaseTrade';
import LottoTrade from '@/interfaces/LottoTrade';
import VisionTrade from '@/interfaces/VisionTrade';

export interface TradeState {
    trades: Trade[];
    positivePlTrades: Trade[];
    negativePlTrades: Trade[];
    tradeSummary: TradeSummary;
}

const initialSummary = {
    allTrades: [],
    pendingTrades: [],
    openTrades: [],
    runnerTrades: [],
    filledTrades: [],
    canceledTrades: [],
    rejectedTrades: [],
};

export const initialState: TradeState = {
    trades: [],
    positivePlTrades: [],
    negativePlTrades: [],
    tradeSummary: {
        baseTrades: initialSummary,
        lottoTrades: initialSummary,
        visionTrades: initialSummary,
    },
};

export const tradeSlice = createSlice({
    name: 'trades',
    initialState,
    reducers: {
        updateTrades: (
            state,
            {
                payload,
            }: PayloadAction<{
                allTrades: Trade[];
                negativePlTrades: Trade[];
                positivePlTrades: Trade[];
            }>
        ) => {
            state.trades = payload.allTrades;
            state.positivePlTrades = payload.positivePlTrades;
            state.negativePlTrades = payload.negativePlTrades;
        },
        updateTradeSummary: (state, action: PayloadAction<TradeSummary>) => {
            state.tradeSummary = action.payload;
        },
    },
});

export const getAllTrades = ({
    tradeSummary: { baseTrades, lottoTrades, visionTrades },
}: TradeState) => {
    const base: BaseTrade[] = baseTrades.allTrades;
    const lotto: LottoTrade[] = lottoTrades.allTrades;
    const vision: VisionTrade[] = visionTrades.allTrades;
    return [...base, ...lotto, ...vision];
};

export const { updateTrades, updateTradeSummary } = tradeSlice.actions;

export default tradeSlice.reducer;
