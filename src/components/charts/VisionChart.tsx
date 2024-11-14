import React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

import { dollar } from '@/utils/dollar';
import TradeCard from '../TradeCard';
import { useAppSelector } from '@/state/hooks';
import getVisionChartColors from '@/utils/getVisionChartColors';
import { ONE_MILLION } from '@/constants';
import { background, muted } from '@/utils/colors';
import VisionChartStats from '../stats/VisionChartStats';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';

const VisionChart: React.FC = React.memo(() => {
    const allTrades = useAppSelector((state) => state.trades.trades);
    const positivePlTrades = useAppSelector(
        (state) => state.trades.positivePlTrades
    );

    if (!positivePlTrades.length) {
        return <></>;
    }

    const visionChartColors = getVisionChartColors(positivePlTrades.length);
    const total =
        positivePlTrades[positivePlTrades.length - 1].postTradeBalance ?? 0;
    const diff = ONE_MILLION - total;
    const positiveTradesData = positivePlTrades.map((e, i) => {
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
        strokeWidth: 10,
    });
    const chartConfig = positivePlTrades.reduce(
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

    const space = 35;
    const mod1 = -50;
    const mod2 = mod1 + space;
    const mod3 = 40;
    const mod4 = mod3 + space;

    const [activeSlice, setActiveSlice] = React.useState(null);

    return (
        <div className='vision-container'>
            <ChartContainer
                config={chartConfig}
                className='mx-auto chart-container h-[750px] w-full'
            >
                {activeSlice && (
                    <div className='absolute'>
                        <TradeCard trade={activeSlice} isVisionChart />
                    </div>
                )}
                {!activeSlice && (
                    <CardHeader className='top-stat p-0 flex justify-center items-center col-span-1 px-0'>
                        <CardTitle className='text-xl'>Target Goal</CardTitle>
                        <CardDescription className='text-3xl text-apex-light-yellow tracking-wide'>
                            {dollar(1000000)}
                        </CardDescription>
                    </CardHeader>
                )}
                {!activeSlice && (
                    <div className='grid grid-cols-3 vision-chart-stats'>
                        <div className='flex justify-center col-span-1 a'>
                            <CardHeader className='p-0 flex justify-center items-center col-span-1 px-0'>
                                <CardTitle className='text-base'>
                                    Total Trades
                                </CardTitle>
                                <CardDescription className='text-xl text-apex-light-yellow'>
                                    {allTrades.length}
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className='flex justify-center col-span-1 b'>
                            <CardHeader className='p-0 flex justify-center items-center col-span-1 px-0'>
                                <CardTitle className='text-base'>
                                    Most Traded Symbol
                                </CardTitle>
                                <CardDescription className='text-xl text-apex-light-yellow'>
                                    SPY
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className='flex justify-center col-span-1 c'>
                            <CardHeader className='p-0 flex justify-center items-center col-span-1 px-0'>
                                <CardTitle className='text-base'>
                                    Highest % Trade
                                </CardTitle>
                                <CardDescription className='text-xl text-apex-light-yellow'>
                                    10,100% (CVNA)
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className='flex justify-center col-span-1 d'>
                            <CardHeader className='p-0 flex justify-center items-center col-span-1 px-0'>
                                <CardTitle className='text-base'>
                                    Highest P/L Trade
                                </CardTitle>
                                <CardDescription className='text-xl text-apex-light-yellow'>
                                    +$54,800 (TSLA)
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className='flex justify-center col-span-1 e'>
                            <CardHeader className='p-0 flex justify-center items-center col-span-1 px-0'>
                                <CardTitle className='text-base'>
                                    R/G Ratio
                                </CardTitle>
                                <CardDescription className='text-xl text-apex-light-yellow'>
                                    5:1
                                </CardDescription>
                            </CardHeader>
                        </div>
                        <div className='flex justify-center col-span-1 f'>
                            <CardHeader className='p-0 flex justify-center items-center col-span-1 px-0'>
                                <CardTitle className='text-base'>
                                    Most Profitable Type
                                </CardTitle>
                                <CardDescription className='text-xl text-apex-light-yellow'>
                                    VISION
                                </CardDescription>
                            </CardHeader>
                        </div>
                    </div>
                )}
                {!activeSlice && (
                    <CardHeader className='bottom-stat p-0 flex justify-center items-center col-span-1 px-0'>
                        <CardTitle className='text-xl'>Remaining</CardTitle>
                        <CardDescription className='tracking-wide text-3xl text-apex-light-yellow'>
                            {dollar(250000)}
                        </CardDescription>
                    </CardHeader>
                )}
                <PieChart
                    className='m-o p-0'
                    margin={{ top: -70, right: 0, left: 0, bottom: -70 }}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        minAngle={1}
                        data={positiveTradesData}
                        dataKey='pl'
                        nameKey='optionSymbol'
                        innerRadius={290}
                        // strokeWidth={5}
                        onMouseOver={(e) => {
                            e.name === 'Target'
                                ? setActiveSlice(null)
                                : setActiveSlice(e);
                        }}
                        onMouseOut={() => setActiveSlice(null)}
                    >
                        <tspan className='fill-foreground text-3xl font-bold'>
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
                            console.log(e);

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
});

export default VisionChart;
