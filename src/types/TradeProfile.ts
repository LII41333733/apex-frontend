import { RiskType } from '@/constants';

export type TradeProfile = {
    [key in RiskType]?: {
        riskType: RiskType;
        demoOutcoomePercentages: number[];
        stopPercentage: number;
        trim1Percentage: number | null;
        trim2Percentage: number | null;
        tradeAmountPercentage: number | null;
        tradeAmountAllotment: number | null;
    };
};
