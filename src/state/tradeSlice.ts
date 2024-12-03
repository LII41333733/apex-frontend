import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Trade from '@/interfaces/Trade';
import TradeSummary from '@/interfaces/TradeSummary';
import BaseTrade from '@/interfaces/BaseTrade';
import LottoTrade from '@/interfaces/LottoTrade';
import VisionTrade from '@/interfaces/VisionTrade';
import consumeTrades from '@/utils/consumeTrades';

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

export const getAllTrades = ({
    tradeSummary: { baseTrades, lottoTrades, visionTrades },
}: TradeState) => {
    const base: BaseTrade[] = baseTrades.allTrades;
    const lotto: LottoTrade[] = lottoTrades.allTrades;
    const vision: VisionTrade[] = visionTrades.allTrades;
    return [...base, ...lotto, ...vision];
};

export const getTradeBreakdown = ({ trades }: any) => ({
    trades: trades.trades,
    tradesByDay: trades.tradesByDay,
    tradesByWeek: trades.tradesByWeek,
    tradesByMonth: trades.tradesByMonth,
    tradesByYear: trades.tradesByYear,
});

export const { updateTrades, updateTradeSummary } = tradeSlice.actions;

export default tradeSlice.reducer;
