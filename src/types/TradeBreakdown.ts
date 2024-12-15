import Trade from './Trade';

export type TradeBreakdown = {
    tradesByDay: { [key: string]: Trade[] };
    tradesByYear: { [key: string]: Trade[] };
    tradesByWeek: { [key: string]: Trade[] };
    tradesByMonth: { [key: string]: Trade[] };
    tradesByRiskType: { [key: string]: Trade[] };
};
