import React from 'react';
import {
    Radar,
    RadarChart,
    PolarAngleAxis,
    PolarGrid,
    BarChart,
    YAxis,
    XAxis,
    Bar,
    RadialBar,
    RadialBarChart,
    PolarRadiusAxis,
    Label,
} from 'recharts';

import { CardContent, CardFooter } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useAppSelector } from '@/state/hooks';
import ChartHeader from '../ChartHeader';
import Trade from '@/types/Trade';
import { getPercentDeltaFromTrade } from '@/utils/getPercentDeltaFromTrade';
import { primary } from '@/utils/colors';
import float from '@/utils/float';

const chartConfig = {
    Profit: { label: 'Profit', color: 'hsl(var(--trade-green)' },
    Loss: { label: 'Loss', color: 'hsl(var(--trade-red)' },
} satisfies ChartConfig;

const WinLossRadialChart = () => {
    const allTrades = useAppSelector((state) => state.trades.trades);
    const chartType = useAppSelector((state) => state.charts.chartType);

    let win = 0;
    let loss = 0;

    allTrades.forEach((e) => {
        if (chartType === 'All' || chartType === e.riskType) {
            if (e.pl > 0) win = win + 1;
            if (e.pl < 0) loss = loss + 1;
        }
    });

    const total = win + loss;

    const rate = ((total - loss) / total) * 100;
    const chartData = [{ Profit: win, Loss: loss }];

    return (
        <>
            <ChartHeader
                mainTitle="Profit/Loss Percentage"
                mainSubtitle="All Trades"
                secondaryTitle=""
                secondarySubtitle=""
            />
            <CardContent>
                {allTrades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto h-[250px] w-[300px]"
                    >
                        <RadialBarChart
                            data={chartData}
                            endAngle={180}
                            innerRadius={110}
                            outerRadius={170}
                        >
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <PolarRadiusAxis
                                tick={false}
                                tickLine={false}
                                axisLine={false}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (
                                            viewBox &&
                                            'cx' in viewBox &&
                                            'cy' in viewBox
                                        ) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) -
                                                            16
                                                        }
                                                        className="fill-foreground text-2xl font-bold"
                                                    >
                                                        {`${float(rate, 1)}%`}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) +
                                                            4
                                                        }
                                                        className="fill-muted-foreground text-base"
                                                    >
                                                        {`of ${total.toLocaleString()} Trades`}
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </PolarRadiusAxis>
                            <RadialBar
                                dataKey="Loss"
                                fill="hsl(var(--trade-red)"
                                stackId="a"
                                cornerRadius={5}
                                className="stroke-transparent stroke-2"
                            />
                            <RadialBar
                                dataKey="Profit"
                                stackId="a"
                                cornerRadius={5}
                                fill="hsl(var(--trade-green)"
                                className="stroke-transparent stroke-2"
                            />
                        </RadialBarChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter></CardFooter>
        </>
    );
};

export default WinLossRadialChart;
