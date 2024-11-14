import { RiskType, TradeStatus } from '@/constants';

export default interface Trade {
    id?: number;
    riskType: RiskType;
    preTradeBalance?: number;
    postTradeBalance?: number;
    optionSymbol?: string;
    symbol?: string;
    fillPrice: number;
    initialAsk?: number;
    openDate?: string;
    closeDate?: string;
    maxPrice: number;
    pl: number;
    tradeAmount?: number;
    lastPrice?: number;
    finalAmount?: number;
    status?: TradeStatus;
    trimStatus?: number;
    stopPrice?: number;
    stopPriceFinal?: number;
    runnersFloorPrice?: number;
    runnersDelta?: number;
    quantity?: number;
    runnersQuantity?: number;
    demoOutcomePercentages?: number[];
    tradeAmountPercentage?: number;
}
