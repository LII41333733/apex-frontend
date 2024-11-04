export interface TradeSummarySnapshot<T> {
    pendingTrades: number[];
    openTrades: number[];
    runnerTrades: number[];
    filledTrades: number[];
    canceledTrades: number[];
    rejectedTrades: number[];
}
