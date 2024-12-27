import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Trade from '@/interfaces/Trade';
import TradeSummary from '@/interfaces/TradeSummary';
import BaseTrade from '@/interfaces/BaseTrade';
import LottoTrade from '@/interfaces/LottoTrade';
import VisionTrade from '@/interfaces/VisionTrade';
import consumeTrades from '@/utils/consumeTrades';
import { RiskType } from '@/constants';
import { TradeProfile } from '@/types/TradeProfile';

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
    tradeProfiles: TradeProfile;
    todaysTrades: [];
    thisWeeksTrades: [];
    thisMonthsTrades: [];
    thisYearsTrades: [];
    statDailyTotalPl: number;
    statDailyHighPl: number;
    statDailyAveragePl: number;
    statWeeklyTotalPl: number;
    statWeeklyHighPl: number;
    statWeeklyAveragePl: number;
    statMonthlyTotalPl: number;
    statMonthlyHighPl: number;
    statMonthlyAveragePl: number;
    statYearlyTotalPl: number;
    statYearlyHighPl: number;
    statYearlyAveragePl: number;
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
    tradeProfiles: {},

    todaysTrades: [],
    thisWeeksTrades: [],
    thisMonthsTrades: [],
    thisYearsTrades: [],
    statDailyTotalPl: 0,
    statDailyHighPl: 0,
    statDailyAveragePl: 0,
    statWeeklyTotalPl: 0,
    statWeeklyHighPl: 0,
    statWeeklyAveragePl: 0,
    statMonthlyTotalPl: 0,
    statMonthlyHighPl: 0,
    statMonthlyAveragePl: 0,
    statYearlyTotalPl: 0,
    statYearlyHighPl: 0,
    statYearlyAveragePl: 0,
};

export const tradeSlice = createSlice({
    name: 'trades',
    initialState,
    reducers: {
        updateTrades: consumeTrades,
        updateTradeSummary: (state, action: PayloadAction<TradeSummary>) => {
            state.tradeSummary = action.payload;
        },
        updateTradeProfiles: (state, action: PayloadAction<TradeProfile>) => {
            state.tradeProfiles = action.payload;
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
    tradeProfiles: trades.tradeProfiles,
});

export const { updateTrades, updateTradeSummary, updateTradeProfiles } =
    tradeSlice.actions;

export default tradeSlice.reducer;
