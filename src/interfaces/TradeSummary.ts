import BaseTrade from "./BaseTrade";
import Trade from "./Trade";

export default interface TradeSummary {
  baseTrades: {
    allTrades: { [key: number]: BaseTrade };
    pendingTrades: number[];
    openTrades: number[];
    runnerTrades: number[];
    filledTrades: number[];
    canceledTrades: number[];
    rejectedTrades: number[];
  };
}
