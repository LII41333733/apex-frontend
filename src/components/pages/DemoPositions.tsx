import React from 'react';
import { RiskType, TradeStatus } from '@/constants';
import OrderFilter from '../OrderFilter';
import TradeCard from '../TradeCard';
import Trade from '@/types/Trade';
import round from '@/utils/round';

enum Phases {
    STOP,
    T1,
    T2,
    RUNNERS,
}

const { STOP, T1, T2, RUNNERS } = Phases;

type PhasesData = {
    [key: string]: Phases[];
};

const phasesByRiskType: PhasesData = {
    Base: [STOP, T1, T2],
    Vision: [STOP, T1, T2],
    Lotto: [STOP, T1],
    Hero: [STOP],
};

const DemoPositions: React.FC = () => {
    const [showButtonsId, setShowButtonsId] = React.useState<number>(0);
    const [confirmSellId, setConfirmSellId] = React.useState<number>(0);

    const DemoPosition: React.FC<{ riskType: string }> = React.memo(
        ({ riskType }) => {
            const demoTrades = HandleDemoTradeState(
                defaultDemos[riskType],
                riskType
            );
            return (
                <>
                    {demoTrades.map((trade: Trade, i: number) => {
                        return (
                            <TradeCard
                                key={trade.id + i}
                                confirmSellId={confirmSellId}
                                setConfirmSellId={setConfirmSellId}
                                setShowButtonsId={setShowButtonsId}
                                showButtonsId={showButtonsId}
                                trade={trade}
                                zIndex={demoTrades.length - i}
                            />
                        );
                    })}
                </>
            );
        }
    );

    return (
        <div
            id="positions"
            className="dashboard flex positions mb-8 md:w-full flex-col"
        >
            <OrderFilter />
            <div className="md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto">
                <DemoPosition riskType="Base" />
            </div>
            <div className="md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto">
                <DemoPosition riskType="Lotto" />
            </div>
        </div>
    );
};

export default React.memo(DemoPositions);

const getMultipliers = (t: Trade, e: any) => {
    let max, min, max2, min2, limit;
    switch (t.riskType) {
        case RiskType.Base:
            switch (e) {
                case STOP:
                    max = round(t.fillPrice * 1.2);
                    min = round(t.stopPrice);
                    break;
                case T1:
                    limit = 1.5;
                    max = round(t.fillPrice * limit);
                    min = round(
                        t.fillPrice * limit - t.fillPrice * limit * 0.3
                    );
                    break;
                case T2:
                    limit = 2;
                    max = round(t.fillPrice * limit);
                    min = round(
                        t.fillPrice * limit - t.fillPrice * limit * 0.2
                    );
                    break;
                default:
                    max = 0;
                    min = 0;
            }
            break;
        case RiskType.Lotto:
            switch (e) {
                case STOP:
                    max = round(t.fillPrice * 1.2);
                    min = round(t.stopPrice);
                    break;
                case T1:
                    limit = 3;
                    max = round(t.fillPrice * limit);
                    min = round(
                        t.fillPrice * limit - t.fillPrice * limit * 0.2
                    );
                    max2 = round(t.fillPrice * limit);
                    min2 = round(
                        t.fillPrice * limit - t.fillPrice * limit * 0.2
                    );
                    break;
                default:
                    max = 0;
                    min = 0;
                    break;
            }
    }
    return [max, min, max2, min2];
};

const HandleDemoTradeState = (trade: Trade, riskType: string) => {
    const [trades, setTrades] = React.useState<Trade[]>([]);
    const [prices, setPrices] = React.useState<number[][]>([]);
    const [max, setMax] = React.useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState<number[]>([]);

    React.useEffect(() => {
        const t = { ...trade };
        t.lastPrice = t.fillPrice;
        setMax(phasesByRiskType[riskType].map(() => 0));
        setTrades(phasesByRiskType[riskType].map(() => t));
        setCurrentIndex(phasesByRiskType[riskType].map(() => 0));
        const prices = phasesByRiskType[riskType].map((e: Phases) => {
            const [max, min] = getMultipliers(t, e);
            const p = [t.fillPrice];
            while (p[p.length - 1] < max) {
                p.push(round(p[p.length - 1] + 0.01));
            }
            while (p[p.length - 1] > min) {
                p.push(round(p[p.length - 1] - 0.01));
            }
            for (let i = 0; i < 4; i++) {
                p.push(p[p.length - 1]);
            }
            return p;
        });
        setPrices(prices);
    }, []);

    React.useEffect(() => {
        if (prices.length && currentIndex.length) {
            const intervalId = setInterval(handleTimer, 300);
            return () => clearInterval(intervalId);
        }
    }, [prices, currentIndex, trades]);

    const handleTimer = () => {
        const indexes: number[] = currentIndex.map((e: number, i: number) => {
            if (e + 1 === prices[i].length) {
                return 0;
            }
            return e + 1;
        });

        setCurrentIndex(indexes);
        const newMax = trades.map((e: Trade, i: number, a) => {
            const index = indexes[i];
            if (index === 0) {
                return prices[i][0];
            }
            const newPrice = prices[i][index];
            return Math.max(max[i], newPrice);
        });
        setMax(newMax);
        setTrades(
            trades.map((e: Trade, i: number) => {
                const index = indexes[i];
                const newPrice =
                    prices[i][index] <= trade.stopPrice
                        ? trade.stopPrice
                        : prices[i][index];
                console.log(prices[i][index]);
                console.log(trade.stopPrice);
                const trim1Index = prices[i].findIndex(
                    (pr) => 'trim1Price' in e && pr === e.trim1Price
                );
                const trim2Index = prices[i].findIndex(
                    (pr) => 'trim2Price' in e && pr === e.trim2Price
                );
                const trim1Hit = index >= trim1Index && trim1Index > -1;
                const trim2Hit = index >= trim2Index && trim2Index > -1;
                const originalStopPrice = defaultDemos[riskType].stopPrice;

                const handleStopPrice = (trade: Trade) => {
                    if ('trim1Price' in e) {
                        if (trim2Hit) {
                            if (newPrice <= prices[i][index - 1]) {
                                return trade.stopPrice;
                            }
                            return newPrice - newPrice * 0.2;
                        }
                        if (trim1Hit) {
                            if (newPrice <= prices[i][index - 1]) {
                                return trade.stopPrice;
                            }
                            return newPrice - newPrice * 0.2;
                        }
                    }
                    return originalStopPrice;
                };

                const stop = handleStopPrice(e);

                console.log(stop);
                console.log(newPrice);
                return {
                    ...e,
                    lastPrice: newPrice,
                    status:
                        ('trim2Price' in e && trim2Hit) ||
                        (!('trim2Price' in e) && trim1Hit)
                            ? TradeStatus.RUNNERS
                            : newPrice <= stop
                            ? TradeStatus.FILLED
                            : TradeStatus.OPEN,
                    stopPrice: stop,
                    trimStatus: trim2Hit ? 2 : trim1Hit ? 1 : 0,
                    maxPrice: newMax[i],
                };
            })
        );
    };

    return trades;
};

const defaultDemos: { [key: string]: Trade } = {
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
        maxPrice: 2.33,
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
        id: 101220172576,
        fillOrderId: 1,
        riskType: RiskType.Vision,
        preTradeBalance: 31759,
        postTradeBalance: 31787,
        optionSymbol: 'MMM241011C00043000',
        symbol: 'MMM',
        fillPrice: 0.13,
        initialAsk: 0.13,
        openDate: '2024-10-03T09:30:00',
        closeDate: '2024-10-03T16:00:00',
        maxPrice: 0.35,
        pl: 0,
        tradeAmount: 91,
        lastPrice: 0.21,
        finalAmount: 119,
        status: TradeStatus.OPEN,
        trimStatus: 0,
        stopPrice: 0.09,
        stopPriceFinal: 0.21,
        runnersFloorPrice: 0.17,
        runnersDelta: 0.04,
        quantity: 7,
        runnersQuantity: 2,
        trim1Price: 0.17,
        trim1PriceFinal: 0.17,
        trim1Quantity: 3,
        trim2Price: 0.21,
        trim2PriceFinal: 0.21,
        trim2Quantity: 2,
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
        maxPrice: 0.94,
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
        fillPrice: 1.39,
        initialAsk: 1.39,
        openDate: '2024-09-04T09:30:00',
        closeDate: '2024-09-04T16:00:00',
        maxPrice: 4.09,
        pl: 0,
        tradeAmount: 1807,
        lastPrice: 3.42,
        finalAmount: 4446,
        status: TradeStatus.FILLED,
        trimStatus: 0,
        stopPrice: 0.02,
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
