import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from 'recharts';

import { CardContent } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useAppSelector } from '@/state/hooks';
import ChartHeader from '../ChartHeader';
import Trade from '@/interfaces/Trade';
import getRiskTypeColor from '@/utils/charts/getRiskTypeColor';
import convertDateToShort from '@/utils/convertDateToShort';
import { dollar } from '@/utils/dollar';
import React from 'react';

const chartConfig = {
    pl: {
        label: 'P/L',
    },
} satisfies ChartConfig;

const Label: React.FC = (props) => {
    const { x, y, width, height, value } = props;
    const yValue = value < 0 ? 18 : -10;

    return (
        <g>
            <text
                className="text-xxs"
                x={x + width / 2}
                y={y + yValue}
                fill="#fff"
                textAnchor="middle"
                dominantBaseline=""
            >
                {dollar(value)}
            </text>
        </g>
    );
};

export function NegativeBarChartAll() {
    const allTrades = useAppSelector((state) => state.trades.trades);
    const chartType = useAppSelector((state) => state.charts.chartType);
    const last20Trades = allTrades
        .filter((e) => chartType === 'All' || chartType === e.riskType)
        .slice(-14);

    console.log(last20Trades);

    return (
        <>
            <ChartHeader
                mainTitle="Profit/Loss on Recent Trades"
                mainSubtitle="Last 14 Trades"
                secondaryTitle=""
                secondarySubtitle=""
            />
            <CardContent>
                {allTrades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[200px] w-full"
                    >
                        <BarChart accessibilityLayer data={last20Trades}>
                            <CartesianGrid
                                strokeDasharray="0.3"
                                vertical={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        hideLabel
                                        hideIndicator
                                    />
                                }
                            />
                            <XAxis
                                dataKey="closeDate"
                                tickLine={false}
                                axisLine={false}
                                minTickGap={100}
                                tickMargin={20}
                                tickFormatter={convertDateToShort}
                            />
                            <Bar dataKey="pl" minPointSize={8}>
                                <LabelList dataKey="pl" content={Label} />
                                {last20Trades.map((trade: Trade) => (
                                    <Cell
                                        key={trade.id}
                                        fill={getRiskTypeColor(trade.riskType)}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </>
    );
}
