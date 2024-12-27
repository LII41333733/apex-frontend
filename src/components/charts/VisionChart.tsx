import React from 'react';
import { Pie, PieChart } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { dollar } from '@/utils/dollar';
import TradeCard from '../TradeCard';
import { useAppSelector } from '@/state/hooks';
import getVisionChartColors from '@/utils/getVisionChartColors';
import { ONE_MILLION, RiskType } from '@/constants';
import { background, muted } from '@/utils/colors';
import VisionChartStats from '../stats/VisionChartStats';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import Trade from '@/types/Trade';
import { getPercentDeltaFromTrade } from '@/utils/getPercentDeltaFromTrade';
import float from '@/utils/float';
import { getTradeBreakdown } from '@/state/tradeSlice';
const { Base, Vision, Lotto, Hero } = RiskType;

const VisionChart: React.FC = React.memo(() => {
    const tradeBreakdown = useAppSelector(getTradeBreakdown);
    const { trades, tradesByRiskType } = tradeBreakdown;
    const positivePlTrades = useAppSelector(
        (state) => state.trades.positivePlTrades
    );

    if (!positivePlTrades.length) {
        return <></>;
    }

    const positiveTrades = positivePlTrades.slice(
        0,
        positivePlTrades.length - 2
    );

    const visionChartColors = getVisionChartColors(positiveTrades.length);
    const total =
        positiveTrades[positiveTrades.length - 1].postTradeBalance ?? 0;
    const diff = ONE_MILLION - total;
    const positiveTradesData = positiveTrades.map((e, i) => {
        return {
            ...e,
            fill: visionChartColors[i],
        };
    });

    positiveTradesData.push({
        pl: diff,
        optionSymbol: 'Target',
        fill: muted(),
        stroke: background(),
        strokeWidth: 20,
    });

    const chartConfig = positiveTrades.reduce(
        (p: any, { optionSymbol, fill, pl }: any) => {
            return {
                ...p,
                [optionSymbol]: {
                    label: optionSymbol,
                    color: fill,
                    optionSymbol,
                },
            };
        },
        {}
    );

    const [activeSlice, setActiveSlice] = React.useState(null);

    const highestPercentData = trades.reduce(
        (p, c) => {
            const delta = getPercentDeltaFromTrade(c);
            if (delta > p.value) {
                return {
                    symbol: c.symbol,
                    value: delta,
                };
            }
            return p;
        },
        {
            symbol: '',
            value: 0,
        }
    );

    const highestPlData = trades.reduce(
        (p, c) => {
            if (c.pl > p.pl) {
                return {
                    symbol: c.symbol,
                    pl: c.pl,
                };
            }
            return p;
        },
        {
            symbol: '',
            pl: 0,
        }
    );
    const mostProfitableRiskTypeCalc = Object.entries(tradesByRiskType).reduce(
        (p: any, c: [any, any]) => {
            const [type, arr] = c;
            switch (type) {
                case Base:
                    p[Base] = arr.reduce((p, c) => p + c.pl, 0);
                    break;
                case Vision:
                    p[Vision] = arr.reduce((p, c) => p + c.pl, 0);
                    break;
                case Lotto:
                    p[Lotto] = arr.reduce((p, c) => p + c.pl, 0);
                    break;
                case Hero:
                    p[Hero] = arr.reduce((p, c) => p + c.pl, 0);
                    break;
            }
            return p;
        },
        {
            Base: 0,
            Vision: 0,
            Lotto: 0,
            Hero: 0,
        }
    );

    const mostProfitableRiskTypeData = Object.entries(
        mostProfitableRiskTypeCalc
    ).reduce(
        (p, c) => {
            const [type, amount] = c;
            if (amount > p.pl) {
                return {
                    type,
                    pl: amount,
                };
            }
            return p;
        },
        { type: '', pl: 0 }
    );

    let win = 0;
    let loss = 0;

    trades.forEach((e) => {
        if (e.pl > 0) win = win + 1;
        if (e.pl < 0) loss = loss + 1;
    });

    console.log(mostProfitableRiskTypeData);

    return (
        <div className="vision-container">
            <ChartContainer
                config={chartConfig}
                className="mx-auto chart-container h-[750px] w-full"
            >
                {activeSlice && (
                    <div className="vision-chart-card">
                        <TradeCard trade={activeSlice} isVisionChart />
                    </div>
                )}
                {!activeSlice && (
                    <CardHeader className="top-stat p-0 flex justify-center items-center col-span-1 px-0">
                        <CardTitle className="text-xl">Target Goal</CardTitle>
                        <CardDescription className="text-3xl text-apex-light-yellow tracking-wide">
                            {dollar(ONE_MILLION)}
                        </CardDescription>
                    </CardHeader>
                )}
                {!activeSlice && (
                    <div className="grid grid-cols-3 vision-chart-stats">
                        <div className="flex justify-center col-span-1 a">
                            <CardHeader className="p-0 flex justify-center items-center col-span-1 px-0">
                                <CardTitle className="text-base">
                                    Total Trades
                                </CardTitle>
                                <CardDescription className="text-xl text-apex-light-yellow">
                                    {trades.length}
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className="flex justify-center col-span-1 b">
                            <CardHeader className="p-0 flex justify-center items-center col-span-1 px-0">
                                <CardTitle className="text-base">
                                    Most Traded Symbol
                                </CardTitle>
                                <CardDescription className="text-xl text-apex-light-yellow">
                                    {
                                        Object.values(
                                            trades.reduce(
                                                (
                                                    obj: any,
                                                    trade: any,
                                                    i,
                                                    a
                                                ) => {
                                                    const data = obj[
                                                        trade.symbol
                                                    ] || {
                                                        label: trade.symbol,
                                                        count: 0,
                                                    };

                                                    return {
                                                        ...obj,
                                                        [trade.symbol]: {
                                                            ...data,
                                                            count:
                                                                data.count + 1,
                                                        },
                                                    };
                                                },
                                                {}
                                            )
                                        )
                                            .sort((a, b) => a.count - b.count)
                                            .slice(-1)[0].label
                                    }
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className="flex justify-center col-span-1 c">
                            <CardHeader className="p-0 flex justify-center items-center col-span-1 px-0">
                                <CardTitle className="text-base">
                                    Highest % Trade
                                </CardTitle>
                                <CardDescription className="text-xl text-apex-light-yellow">
                                    {`${float(highestPercentData.value)}% (${
                                        highestPercentData.symbol
                                    })`}
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className="flex justify-center col-span-1 d">
                            <CardHeader className="p-0 flex justify-center items-center col-span-1 px-0">
                                <CardTitle className="text-base">
                                    Highest P/L Trade
                                </CardTitle>
                                <CardDescription className="text-xl text-apex-light-yellow">
                                    {`+${dollar(highestPlData.pl)} (${
                                        highestPlData.symbol
                                    })`}
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className="flex justify-center col-span-1 e">
                            <CardHeader className="p-0 flex justify-center items-center col-span-1 px-0">
                                <CardTitle className="text-base">
                                    R/G Ratio
                                </CardTitle>
                                <CardDescription className="text-xl text-apex-light-yellow">
                                    {handleRate()}
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className="flex justify-center col-span-1 f">
                            <CardHeader className="p-0 flex justify-center items-center col-span-1 px-0">
                                <CardTitle className="text-base">
                                    Most Profitable Type
                                </CardTitle>
                                <CardDescription className="text-xl text-apex-light-yellow">
                                    {`${
                                        mostProfitableRiskTypeData.type
                                    } (${dollar(
                                        mostProfitableRiskTypeData.pl
                                    )})`}
                                </CardDescription>
                            </CardHeader>
                        </div>
                    </div>
                )}
                {!activeSlice && (
                    <CardHeader className="bottom-stat p-0 flex justify-center items-center col-span-1 px-0">
                        <CardTitle className="text-xl">Remaining</CardTitle>
                        <CardDescription className="tracking-wide text-3xl text-apex-light-yellow">
                            {dollar(diff)}
                        </CardDescription>
                    </CardHeader>
                )}
                <PieChart
                    className="m-o p-0"
                    margin={{ top: -70, right: 0, left: 0, bottom: -70 }}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        minAngle={1}
                        data={positiveTradesData}
                        dataKey="pl"
                        nameKey="optionSymbol"
                        innerRadius={290}
                        onMouseOver={(e) => {
                            e.name === 'Target'
                                ? setActiveSlice(null)
                                : setActiveSlice(e);
                        }}
                        onMouseOut={() => setActiveSlice(null)}
                    >
                        <tspan className="fill-foreground text-3xl font-bold">
                            <VisionChartStats />
                        </tspan>
                    </Pie>
                    {/* <Pie
                        className='heaven absolute'
                        minAngle={1}
                        data={chartData.slice(0, 3)}
                        dataKey='pl'
                        nameKey='optionSymbol'
                        innerRadius={350}
                        onMouseOver={(e) => {

                            e.name === 'Target'
                                ? setActiveSlice(null)
                                : setActiveSlice(e);
                        }}
                        onMouseOut={() => setActiveSlice(null)}
                    /> */}
                </PieChart>
            </ChartContainer>
        </div>
    );

    function handleRate() {
        let win = 0;
        let loss = 0;

        trades.forEach((e) => {
            if (e.pl > 0) win = win + 1;
            if (e.pl < 0) loss = loss + 1;
        });

        return `${Math.round(win / loss)}:1`;
    }
});

export default VisionChart;
