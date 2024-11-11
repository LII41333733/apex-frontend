import Trade from './Trade';

export default interface BaseTrade extends Trade {
    trim1Price?: number;
    trim1PriceFinal?: number;
    trim1Quantity?: number;
    trim2Price?: number;
    trim2PriceFinal?: number;
    trim2Quantity?: number;
    stopLossPercentage?: number;
    trim1Percentage?: number;
    trim2Percentage?: number;
    runnersFloorPercentage?: number;
}
