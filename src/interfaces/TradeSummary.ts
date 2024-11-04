import { Trade } from '@/types/Trade';
import { TradeSummaryData } from './TradeSummaryData';
import BaseTrade from './BaseTrade';
import LottoTrade from './LottoTrade';
import VisionTrade from './VisionTrade';

export default interface TradeSummary {
    baseTrades: TradeSummaryData<BaseTrade>;
    lottoTrades: TradeSummaryData<LottoTrade>;
    visionTrades: TradeSummaryData<VisionTrade>;
}
