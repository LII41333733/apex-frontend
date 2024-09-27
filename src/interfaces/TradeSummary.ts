import BaseTrade from "./BaseTrade";
import LottoTrade from "./LottoTrade";
import { TradeSummaryData } from "./TradeSummaryData";

export default interface TradeSummary {
  baseTrades: TradeSummaryData<BaseTrade>;
  lottoTrades: TradeSummaryData<LottoTrade>;
}
