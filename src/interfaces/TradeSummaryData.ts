export interface TradeSummaryData<T> {
  allTrades: { [key: number]: T };
  pendingTrades: number[];
  openTrades: number[];
  runnerTrades: number[];
  filledTrades: number[];
  canceledTrades: number[];
  rejectedTrades: number[];
}
