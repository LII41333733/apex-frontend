import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Trade from '@/interfaces/Trade';
import TradeSummary from '@/interfaces/TradeSummary';
import BaseTrade from '@/interfaces/BaseTrade';
import LottoTrade from '@/interfaces/LottoTrade';
import VisionTrade from '@/interfaces/VisionTrade';
import consumeTrades from '@/utils/consumeTrades';
import { RiskType } from '@/constants';

const initialSummary = {
    allTrades: [],
    pendingTrades: [],
    openTrades: [],
    runnerTrades: [],
    filledTrades: [],
    canceledTrades: [],
    rejectedTrades: [],
};

export interface TradeState {
    trades: Trade[];
    lastFilledBeforeToday: Trade | null;
    negativePlTrades: Trade[];
    positivePlTrades: Trade[];
    tradesByYear: { [key: string]: Trade[] };
    tradesByDay: { [key: string]: Trade[] };
    tradesByWeek: { [key: string]: Trade[] };
    tradesByMonth: { [key: string]: Trade[] };
    tradesByRiskType: { [key: string]: Trade[] };
    last20Trades: Trade[];
    tradeSummary: TradeSummary;
}

export const initialState: TradeState = {
    trades: [],
    lastFilledBeforeToday: null,
    positivePlTrades: [],
    negativePlTrades: [],
    tradeSummary: {
        baseTrades: initialSummary,
        lottoTrades: initialSummary,
        visionTrades: initialSummary,
    },
    tradesByRiskType: {},
    tradesByDay: {},
    tradesByYear: {},
    tradesByWeek: {},
    tradesByMonth: {},
    last20Trades: [],
};

export const tradeSlice = createSlice({
    name: 'trades',
    initialState,
    reducers: {
        updateTrades: consumeTrades,
        updateTradeSummary: (state, action: PayloadAction<TradeSummary>) => {
            state.tradeSummary = action.payload;
        },
    },
});

export const getTradeBreakdown = ({ trades }: any) => ({
    trades: trades.trades,
    tradesByDay: trades.tradesByDay,
    tradesByYear: trades.tradesByYear,
    tradesByWeek: trades.tradesByWeek,
    tradesByMonth: trades.tradesByMonth,
    tradesByRiskType: trades.tradesByRiskType,
});

export const { updateTrades, updateTradeSummary } = tradeSlice.actions;

export default tradeSlice.reducer;
