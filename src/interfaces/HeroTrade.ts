import Trade from './Trade';

export default interface HeroTrade extends Trade {
    lossId?: number;
    recoveryId?: number;
    lossStreak?: number;
    win?: number;
    loss?: number;
    stopLossPercentage?: number;
    targetPercentage?: number;
    runnersFloorDeltaPercentage?: number;
}
