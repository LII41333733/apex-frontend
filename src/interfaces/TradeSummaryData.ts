export interface TradeSummaryData<T> {
    allTrades: T[];
    pendingTrades: number[];
    openTrades: number[];
    runnerTrades: number[];
    filledTrades: number[];
    canceledTrades: number[];
    rejectedTrades: number[];
}
