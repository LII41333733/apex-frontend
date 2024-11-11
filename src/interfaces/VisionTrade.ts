import Trade from './Trade';

export default interface VisionTrade extends Trade {
    trim1Price: number;
    trim1Quantity: number;
    trim2Price?: number;
    trim2Quantity: number;
    runnersQuantity: number;
    runnersFloorPrice: number;
    runnersDelta: number;
    stopPrice: number;
    trimStatus: number;
}
