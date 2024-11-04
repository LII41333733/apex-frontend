import { RiskType, TradeStatus } from '@/constants';

export default interface Trade {
    id: number;
    preTradeBalance: number;
    postTradeBalance: number;
    optionSymbol: string;
    symbol: string;
    fillPrice: number;
    openDate: string;
    closeDate: string;
    maxPrice: number;
    quantity: number;
    pl: number;
    tradeAmount: number;
    finalAmount: number;
    lastPrice: number;
    fillOrderId: number;
    status: TradeStatus;
}
