import React from 'react';
import { Progress } from '@/components/ui/progress';
import float from '@/utils/float';
import Trade from '@/types/Trade';
import CircleCheck from './priceBar/circleCheck';
import CircleCheckFilled from './priceBar/CircleCheckFilled';
import { RiskType, ValueStatus } from '@/constants';
import BaseTrade from '@/interfaces/BaseTrade';
import VisionTrade from '@/interfaces/VisionTrade';
import LottoTrade from '@/interfaces/LottoTrade';
import HeroTrade from '@/interfaces/HeroTrade';

const calculatePercentagePositions = (values: {
    min: number;
    stop: number;
    fill: number;
    trim1?: number;
    trim2?: number;
    runner: number;
    last: number;
}) => {
    const rangeStartValue = Math.min(...Object.values(values));
    const percentageValuesOrdered = Math.max(...Object.values(values));
    const totalRange = percentageValuesOrdered - rangeStartValue;

    return Object.entries(values).reduce(
        (p: any, [k, v]: [k: string, v: number]) => ({
            ...p,
            [k]: ((v - rangeStartValue) / totalRange) * 100,
        }),
        {}
    );
};

const calculateBaseTradePercentages = (trade: BaseTrade) => {
    const values = {
        min: 0,
        stop: 6,
        fill: 25,
        trim1: 42,
        trim2: 62,
        runner: 90,
        last:
            trade.trimStatus < 1
                ? 6
                : trade.trimStatus === 1
                ? 44
                : trade.stopPriceFinal > trade.trim2PriceFinal
                ? 90
                : 64,
    };

    return calculatePercentagePositions(values);
};
const calculateVisionTradePercentages = (trade: VisionTrade) => {
    const values = {
        min: 0,
        stop: 6,
        fill: 25,
        trim1: 43,
        trim2: 66,
        runner: 100,
        last:
            trade.trimStatus < 1
                ? 6
                : trade.trimStatus === 1
                ? 45
                : trade.stopPriceFinal > trade.trim2PriceFinal
                ? 93
                : 69,
    };

    return calculatePercentagePositions(values);
};
const calculateLottoTradePercentages = (trade: LottoTrade) => {
    const values = {
        min: 0,
        stop: 6,
        fill: 33,
        trim1: 55,
        runner: 90,
        last:
            trade.trimStatus < 1
                ? 6
                : trade.trimStatus === 1
                ? 57
                : trade.stopPriceFinal > trade.trim1PriceFinal
                ? 90
                : 57,
    };

    return calculatePercentagePositions(values);
};
const calculateHeroTradePercentages = (trade: Trade) => {
    const values = {
        min: 0,
        stop: 6,
        fill: 35,
        runner: 90,
        last: trade.trimStatus < 1 ? 6 : 90,
    };

    return calculatePercentagePositions(values);
};

const calculatePercentagePositionsByTrade = (trade: Trade) => {
    switch (trade.riskType as RiskType) {
        case RiskType.Base:
            return calculateBaseTradePercentages(trade as BaseTrade);
        case RiskType.Vision:
            return calculateVisionTradePercentages(trade as VisionTrade);
        case RiskType.Lotto:
            return calculateLottoTradePercentages(trade as LottoTrade);
        case RiskType.Hero:
            return calculateHeroTradePercentages(trade as HeroTrade);
    }
};

const MiniPriceBar: React.FC<{
    trade: Trade;
    maxPrice: number;
}> = ({ trade, maxPrice }) => {
    const hasTrim1 = 'trim1Price' in trade;
    const hasTrim2 = 'trim2Price' in trade;
    // const values = {
    //     stop: trade.stopPrice,
    //     fill: trade.fillPrice,
    //     last: trade.lastPrice,
    //     runnerLimit: trade.fillPrice * 2,
    //     trim1: hasTrim1 ? trade.trim1Price : trade.fillPrice,
    //     trim2: hasTrim2 ? trade.trim2Price : trade.fillPrice,
    //     max: maxPrice,
    // };
    const percentagePositions = calculatePercentagePositionsByTrade(trade);
    const percentageValuesOrdered: number[] = Object.values(
        percentagePositions
    ).sort((a, b) => (b as number) - (a as number));

    const isRunnerHit = percentagePositions.last >= percentageValuesOrdered[0];

    return (
        <>
            <div className="price-bar-wrapper relative -top-3">
                <Progress
                    value={percentagePositions.last}
                    className="price-bar w-[100%]"
                />
                <section>
                    <div
                        className="price-bar-stop"
                        style={{ left: `${percentagePositions.stop}%` }}
                    ></div>
                    <div
                        className="text-xxs price-bar-label-top absolute top-[70%]"
                        style={{ left: `${percentagePositions.stop}%` }}
                    >
                        {`Stop`}
                    </div>
                    <div
                        className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                        style={{ left: `${percentagePositions.stop}%` }}
                    >
                        {`${float(trade.stopPrice)}`}
                    </div>
                </section>
                <section>
                    <div
                        className="price-bar-fill"
                        style={{ left: `${percentagePositions.fill}%` }}
                    ></div>
                    <div
                        className="text-xxs price-bar-label-top absolute top-[70%]"
                        style={{ left: `${percentagePositions.fill}%` }}
                    >
                        {`Fill`}
                    </div>
                    <div
                        className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                        style={{ left: `${percentagePositions.fill}%` }}
                    >
                        {`${float(trade.fillPrice)}`}
                    </div>
                </section>
                {hasTrim1 && (
                    <section>
                        <div
                            className="price-bar-trim1"
                            style={{ left: `${percentagePositions.trim1}%` }}
                        ></div>
                        <div
                            className="text-xxs price-bar-label-top absolute top-[70%]"
                            style={{ left: `${percentagePositions.trim1}%` }}
                        >
                            {`Trim 1`}
                        </div>
                        <div
                            className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                            style={{ left: `${percentagePositions.trim1}%` }}
                        >
                            {`${float(trade.trim1Price)}`}
                        </div>
                        <div
                            className="price-bar-icon"
                            style={{ left: `${percentagePositions.trim1}%` }}
                        >
                            {trade.trimStatus < 1 ? (
                                <CircleCheck />
                            ) : (
                                <CircleCheckFilled />
                            )}
                        </div>
                    </section>
                )}
                {hasTrim2 && (
                    <section>
                        <div
                            className="price-bar-trim2"
                            style={{ left: `${percentagePositions.trim2}%` }}
                        ></div>
                        <div
                            className="text-xxs price-bar-label-top absolute top-[70%]"
                            style={{ left: `${percentagePositions.trim2}%` }}
                        >
                            {`Trim 2`}
                        </div>
                        <div
                            className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                            style={{ left: `${percentagePositions.trim2}%` }}
                        >
                            {`${float(trade.trim2Price)}`}
                        </div>
                        <div
                            className="price-bar-icon"
                            style={{
                                left: `${percentagePositions.trim2}%`,
                            }}
                        >
                            {trade.trimStatus < 2 ? (
                                <CircleCheck />
                            ) : (
                                <CircleCheckFilled />
                            )}
                        </div>
                    </section>
                )}
                <section>
                    <div
                        className="price-bar-runner"
                        style={{ left: `${percentagePositions.runner - 10}%` }}
                    ></div>
                    <div
                        className="text-xxs price-bar-label-top absolute top-[70%]"
                        style={{ left: `${percentagePositions.runner - 10}%` }}
                    >
                        {`Runners`}
                    </div>
                    <div
                        className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                        style={{ left: `${percentagePositions.runner - 10}%` }}
                    >
                        {`${float(
                            isRunnerHit ? maxPrice : trade.fillPrice * 2
                        )}`}
                    </div>
                    <div
                        className="price-bar-icon"
                        style={{
                            left: `${percentagePositions.runner - 10}%`,
                        }}
                    >
                        {isRunnerHit ? <CircleCheckFilled /> : <CircleCheck />}
                    </div>
                </section>
            </div>
        </>
    );
};

export default MiniPriceBar;
