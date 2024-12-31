import React from 'react';
import { Phase } from '../pages/DemoPositions';
import Trade from '@/types/Trade';
import { TradeStatus } from '@/constants';
import floatNumber from '@/utils/floatNumber';
import round from '@/utils/round';
import TradeCard from '../TradeCard';

const DemoPosition: React.FC<{
    trade: Trade;
    phase: Phase;
}> = ({ trade, phase }) => {
    const [prices, setPrices] = React.useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const [currentTrade, setCurrentTrade] = React.useState<Trade>(trade);
    const [trim1Hit, setTrim1Hit] = React.useState<boolean>(false);
    const [trim2Hit, setTrim2Hit] = React.useState<boolean>(false);

    const limits = React.useMemo(
        () => handleCalculateLimits(trade, phase),
        [trade, phase]
    );

    React.useEffect(() => {
        const calculatedPrices = handleCalculatePrices(trade, limits);
        setPrices(calculatedPrices);
    }, [trade, limits]);

    React.useEffect(() => {
        if (prices.length) {
            const tradeIsFilled = currentTrade.status === TradeStatus.FILLED;
            const timerValue = tradeIsFilled ? 5000 : 300;
            const intervalId = setInterval(() => {
                if (tradeIsFilled) {
                    setCurrentTrade({
                        ...currentTrade,
                        lastPrice: trade.fillPrice,
                        stopPrice: trade.stopPrice,
                        trimStatus: 0,
                        maxPrice: trade.fillPrice,
                        status: TradeStatus.OPEN,
                    });
                    setCurrentIndex(0);
                    setTrim1Hit(false);
                    setTrim2Hit(false);
                } else {
                    const newIndex = currentIndex + 1;
                    const newPrice = prices[newIndex];
                    setCurrentIndex(newIndex);
                    setCurrentTrade({
                        ...currentTrade,
                        lastPrice: newPrice,
                        stopPrice: currentTrade.stopPrice,
                        trimStatus: currentTrade.trimStatus,
                        maxPrice: Math.max(currentTrade.maxPrice, newPrice),
                        status:
                            currentTrade.stopPrice >= newPrice && newIndex > 1
                                ? TradeStatus.FILLED
                                : currentTrade.status,
                    });
                }
            }, timerValue);
            return () => clearInterval(intervalId);
        }
    }, [prices, currentIndex, currentTrade, trim1Hit, trim2Hit]);

    React.useEffect(() => {
        const trimStatus = handleTrimStatus();
        setCurrentTrade({
            ...currentTrade,
            trimStatus: handleTrimStatus(),
            status: handleTradeStatus(trimStatus),
        });
    }, [trade.lastPrice, trim1Hit, trim2Hit]);

    React.useEffect(() => {
        handleTrims();
        handleStopPrice();
    }, [trade.lastPrice, currentIndex]);

    function handleTrims() {
        if ('trim2Price' in trade) {
            if (!trim2Hit && prices[currentIndex] >= trade.trim2Price) {
                setTrim2Hit(true);
            } else if (!trim1Hit && prices[currentIndex] >= trade.trim1Price) {
                setTrim1Hit(true);
            }
        } else if ('trim1Price' in trade) {
            if (!trim1Hit && prices[currentIndex] >= trade.trim1Price) {
                setTrim1Hit(true);
            }
        }
    }

    function handleTrimStatus() {
        if ('trim2Price' in trade) {
            if (trim2Hit) {
                return 2;
            } else if (trim1Hit) {
                return 1;
            }
        } else if ('trim1Price' in trade) {
            if (trim1Hit) {
                return 1;
            }
        }
        return 0;
    }

    function handleStopPrice() {
        let stopPrice = currentTrade.stopPrice;
        const lastPrice = currentTrade.lastPrice;
        const percent20FromLast = lastPrice / 1.2;
        const percent30FromLast = lastPrice / 1.2;

        if ('trim2Price' in trade) {
            if (trim2Hit && stopPrice <= percent20FromLast) {
                stopPrice = percent20FromLast;
            } else if (trim1Hit && stopPrice < percent30FromLast) {
                stopPrice = percent30FromLast;
            }
        } else if ('trim1Price' in trade) {
            if (trim1Hit && stopPrice < percent30FromLast) {
                stopPrice = percent30FromLast;
            }
        } else {
            if (currentIndex > 0 && stopPrice < percent30FromLast) {
                stopPrice = percent20FromLast;
            }
        }
        setCurrentTrade({
            ...currentTrade,
            stopPrice,
        });
    }

    function handleTradeStatus(trimStatus: number) {
        if ('trim2Price' in trade) {
            if (trimStatus < 2) {
                return TradeStatus.OPEN;
            }
        } else if ('trim1Price' in trade) {
            if (trimStatus < 1) {
                return TradeStatus.OPEN;
            }
        }
        return TradeStatus.RUNNERS;
    }

    return <TradeCard trade={currentTrade} />;
};

function handleCalculatePrices(trade: Trade, limits: number[]) {
    const prices = [trade.fillPrice];
    while (prices[prices.length - 1] <= limits[0]) {
        prices.push(round(prices[prices.length - 1] + 0.01));
    }
    while (prices[prices.length - 1] >= limits[1]) {
        prices.push(round(prices[prices.length - 1] - 0.01));
    }
    if (limits.length > 2) {
        while (prices[prices.length - 1] <= limits[2]) {
            prices.push(round(prices[prices.length - 1] + 0.01));
        }
        while (prices[prices.length - 1] >= limits[3]) {
            prices.push(round(prices[prices.length - 1] - 0.01));
        }
    }
    if (limits.length > 4) {
        while (prices[prices.length - 1] <= limits[4]) {
            prices.push(round(prices[prices.length - 1] + 0.01));
        }
        while (prices[prices.length - 1] >= limits[5]) {
            prices.push(round(prices[prices.length - 1] - 0.01));
        }
    }

    return prices;
}

function handleCalculateLimits(trade: Trade, phase: Phase): number[] {
    if ('trim2Price' in trade) {
        switch (phase) {
            case Phase.STOP:
                return [
                    calculateAveragePrice(trade.fillPrice, trade.trim1Price),
                    floatNumber(trade.stopPrice),
                ];
            case Phase.T1:
                return [
                    calculateAveragePrice(trade.trim1Price, trade.trim2Price),
                    calculateAveragePrice(trade.fillPrice, trade.trim1Price),
                ];
            case Phase.RUNNERS:
                return [
                    floatNumber(trade.trim2Price * 1.1),
                    floatNumber((trade.trim2Price * 1.1) / 1.11),
                    floatNumber(trade.trim2Price * 1.7),
                    floatNumber((trade.trim2Price * 1.7) / 1.3),
                ];
        }
    } else if ('trim1Price' in trade) {
        switch (phase) {
            case Phase.STOP:
                return [
                    calculateAveragePrice(trade.fillPrice, trade.trim1Price),
                    floatNumber(trade.stopPrice),
                ];
            case Phase.RUNNERS:
                return [
                    floatNumber(trade.trim1Price * 1.1),
                    floatNumber((trade.trim1Price * 1.1) / 1.11),
                    floatNumber(trade.trim1Price * 1.7),
                    floatNumber((trade.trim1Price * 1.7) / 1.3),
                ];
        }
    } else {
        switch (phase) {
            case Phase.STOP:
                return [floatNumber(trade.fillPrice * 1.3), trade.stopPrice];
            case Phase.RUNNERS:
                return [
                    floatNumber(trade.fillPrice * 1.4),
                    floatNumber(trade.fillPrice * 1.3),
                    floatNumber(trade.fillPrice * 1.8),
                    floatNumber(trade.fillPrice * 1.67),
                    floatNumber(trade.fillPrice * 2.25),
                    floatNumber(trade.fillPrice),
                ];
        }
    }
    return [];
}

function calculateAveragePrice(price1: number, price2: number) {
    return floatNumber((price1 + price2) / 2);
}

export default DemoPosition;
