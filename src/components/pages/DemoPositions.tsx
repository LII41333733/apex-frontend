import React from 'react';
import { RiskType, TradeStatus } from '@/constants';
import OrderFilter from '../OrderFilter';
import TradeCard from '../TradeCard';
import Trade from '@/types/Trade';
import round from '@/utils/round';
import { useAppSelector } from '@/state/hooks';
import DemoPosition from '../demo/DemoPosition';

export enum Phase {
    STOP,
    T1,
    RUNNERS,
}

const { STOP, T1, RUNNERS } = Phase;

const DemoPositions: React.FC = () => {
    return (
        <div
            id="positions"
            className="dashboard flex positions mb-8 md:w-full flex-col"
        >
            <OrderFilter />
            <div className="md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto">
                <DemoPosition trade={defaultDemos.Base} phase={STOP} />
                <DemoPosition trade={defaultDemos.Base} phase={T1} />
                <DemoPosition trade={defaultDemos.Base} phase={RUNNERS} />
            </div>
            <div className="md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto">
                <DemoPosition trade={defaultDemos.Vision} phase={STOP} />
                <DemoPosition trade={defaultDemos.Vision} phase={T1} />
                <DemoPosition trade={defaultDemos.Vision} phase={RUNNERS} />
            </div>
            <div className="md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto">
                <DemoPosition trade={defaultDemos.Lotto} phase={STOP} />
                <DemoPosition trade={defaultDemos.Lotto} phase={RUNNERS} />
            </div>
            <div className="md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto">
                <DemoPosition trade={defaultDemos.Hero} phase={STOP} />
                <DemoPosition trade={defaultDemos.Hero} phase={RUNNERS} />
            </div>
            <div className="md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto">
                <TradeCard trade={defaultDemos.Base} openDemo />
            </div>
        </div>
    );
};

export default React.memo(DemoPositions);

const defaultDemos = {
    Base: {
        id: 101220172496,
        fillOrderId: 0,
        riskType: RiskType.Base,
        preTradeBalance: 15977,
        postTradeBalance: 16381,
        optionSymbol: 'PYPL241004C00270000',
        symbol: 'PYPL',
        fillPrice: 0.9,
        initialAsk: 0.9,
        openDate: '2024-11-11T09:30:00',
        closeDate: '2024-11-11T16:00:00',
        maxPrice: 0.9,
        pl: 0,
        tradeAmount: 1260,
        lastPrice: 1.44,
        finalAmount: 1664,
        status: TradeStatus.OPEN,
        trimStatus: 0,
        stopPrice: 0.63,
        stopPriceFinal: 1.44,
        runnersFloorPrice: 1.15,
        runnersDelta: 0.29,
        quantity: 14,
        runnersQuantity: 4,
        trim1Price: 1.17,
        trim1PriceFinal: 1.17,
        trim1Quantity: 5,
        trim2Price: 1.44,
        trim2PriceFinal: 1.44,
        trim2Quantity: 5,
    },
    Vision: {
        id: 30121834290,
        fillOrderId: 0,
        preTradeBalance: 23173,
        postTradeBalance: 23221,
        optionSymbol: 'NVDA241011C00047000',
        symbol: 'NVDA',
        fillPrice: 0.41,
        initialAsk: 0.41,
        openDate: '2024-11-25T09:30:00',
        closeDate: '2024-11-25T16:00:00',
        maxPrice: 0.41,
        pl: 0,
        tradeAmount: 328,
        lastPrice: 0.41,
        finalAmount: 376,
        status: TradeStatus.OPEN,
        trimStatus: 0,
        stopPrice: 0.25,
        stopPriceFinal: 0.57,
        quantity: 8,
        runnersQuantity: 2,
        stopPercentage: 0,
        runnersFloorIsActive: false,
        trim1Price: 0.57,
        trim1PriceFinal: 0.57,
        trim1Quantity: 3,
        trim1Percentage: 0,
        trim2Price: 0.74,
        trim2PriceFinal: 0,
        trim2Quantity: 3,
        trim2Percentage: 0,
        riskType: RiskType.Vision,
    },
    Lotto: {
        id: 101220172554,
        fillOrderId: 2,
        riskType: RiskType.Lotto,
        preTradeBalance: 25800,
        postTradeBalance: 26157,
        optionSymbol: 'DAL241011C00047000',
        symbol: 'DAL',
        fillPrice: 0.34,
        initialAsk: 0.34,
        openDate: '2024-10-14T09:30:00',
        closeDate: '2024-10-14T16:00:00',
        maxPrice: 0.34,
        pl: 0,
        tradeAmount: 1020,
        lastPrice: 0.51,
        finalAmount: 1377,
        status: TradeStatus.OPEN,
        trimStatus: 0,
        stopPrice: 0.17,
        stopPriceFinal: 0.51,
        runnersFloorPrice: 0.41,
        runnersDelta: 0.1,
        quantity: 30,
        runnersQuantity: 9,
        trim1Price: 0.51,
        trim1PriceFinal: 0.51,
        trim1Quantity: 21,
    },
    Hero: {
        id: 101220172639,
        fillOrderId: 3,
        riskType: RiskType.Hero,
        preTradeBalance: 46512,
        postTradeBalance: 49151,
        optionSymbol: 'SPY241001P00567000',
        symbol: 'SPY',
        fillPrice: 0.39,
        initialAsk: 0.39,
        openDate: '2024-09-04T09:30:00',
        closeDate: '2024-09-04T16:00:00',
        maxPrice: 0.39,
        pl: 0,
        tradeAmount: 1807,
        lastPrice: 3.42,
        finalAmount: 4446,
        status: TradeStatus.OPEN,
        trimStatus: 0,
        stopPrice: 0.06,
        stopPriceFinal: 3.42,
        runnersFloorPrice: 1.45,
        runnersDelta: 0.36,
        quantity: 13,
        runnersQuantity: 13,
        lossId: 0,
        recoveryId: 0,
        lossStreak: 0,
        win: 0,
        loss: 0,
    },
};
