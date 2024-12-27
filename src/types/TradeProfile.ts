export type TradeProfile = {
    [key: string]: {
        riskType: string;
        demoOutcoomePercentages: number[];
        stopPercentage: number;
        trim1Percentage: number;
        trim2Percentage: number;
        tradeAmountPercentage: number;
    };
};
