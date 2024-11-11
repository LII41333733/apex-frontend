import Trade from './Trade';

export default interface LottoTrade extends Trade {
    trim1Price?: number;
    trim1PriceFinal?: number;
    trim1Quantity?: number;
    stopLossPercentage?: number;
    trim1Percentage?: number;
    runnersFloorPercentage?: number;
}
