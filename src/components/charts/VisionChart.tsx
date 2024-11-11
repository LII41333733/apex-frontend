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

const VisionChart: React.FC = React.memo(() => {
    const positivePlTrades = useAppSelector(
        (state) => state.trades.positivePlTrades
    );
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
                className='mx-auto chart-container h-[900px] w-full'
            >
                {activeSlice && (
                    <div className='absolute'>
                        <TradeCard trade={activeSlice} isVisionChart />
                    </div>
                )}
                <PieChart
                    className='m-o p-0'
                    margin={{ top: -90, right: 0, left: -0, bottom: 0 }}
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
                        innerRadius={350}
                        onMouseOver={(e) => {
                            e.name === 'Target'
                                ? setActiveSlice(null)
                                : setActiveSlice(e);
                        }}
                        onMouseOut={() => setActiveSlice(null)}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (
                                    viewBox &&
                                    'cx' in viewBox &&
                                    'cy' in viewBox
                                ) {
                                    if (!activeSlice) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor='middle'
                                                dominantBaseline='middle'
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + mod1}
                                                    className='fill-foreground text-3xl font-bold'
                                                >
                                                    {dollar(total)}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + mod2}
                                                    className='fill-muted-foreground text-lg'
                                                >
                                                    Total
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + mod3}
                                                    className='fill-foreground text-3xl font-bold'
                                                >
                                                    {dollar(diff)}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + mod4}
                                                    className='fill-muted-foreground text-lg'
                                                >
                                                    To Go
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }
                            }}
                        />
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
