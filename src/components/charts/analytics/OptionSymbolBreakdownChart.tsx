import {
    Area,
    AreaChart,
    CartesianGrid,
    Label,
    Pie,
    PieChart,
    XAxis,
} from 'recharts';

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
import React from 'react';

type Config = {
    [key: string]: {
        label: string;
        color: string;
        count: number;
    };
};

export function OptionSymbolBreakdownChart() {
    const allTrades = useAppSelector((state) => state.trades.trades);
    const chartType = useAppSelector((state) => state.charts.chartType);
    const chartConfig = allTrades.reduce((obj: Config, trade: Trade, i, a) => {
        if (chartType !== 'All' && chartType !== trade.riskType) {
            return obj;
        }

        const data = obj[trade.symbol] || {
            label: trade.symbol,
            count: 0,
        };

        return {
            ...obj,
            [trade.symbol]: {
                ...data,
                count: data.count + 1,
            },
        };
    }, {});

    const chartData = Object.values(chartConfig)
        .sort((a, b) => a.count - b.count)
        .map((e, i) => ({
            ...e,
            fill: chartColors[i],
            symbol: e.label,
        }));

    const totalTrades = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0);
    }, [chartData]);

    return (
        <>
            <ChartHeader
                mainTitle="Total Trades"
                mainSubtitle="By Option Symbol"
                secondaryTitle=""
                secondarySubtitle=""
            />
            <CardContent>
                {allTrades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[250px] w-full relative top-[-1.7rem]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="count"
                                nameKey="symbol"
                                innerRadius={70}
                                strokeWidth={5}
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
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalTrades.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) +
                                                            24
                                                        }
                                                        className="fill-muted-foreground text-base"
                                                    >
                                                        Trades
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </>
    );
}

const chartColors: string[] = [
    '#FF5733',
    '#FF6A3A',
    '#FF7E42',
    '#FF9249',
    '#FFA651', // Red to Orange
    '#FFBA58',
    '#FFCE60',
    '#FFE268',
    '#FFF570',
    '#FFFF78', // Orange to Yellow
    '#E6FF78',
    '#CCFF78',
    '#B3FF78',
    '#99FF78',
    '#80FF78', // Yellow to Green
    '#66FF8C',
    '#4CFFA0',
    '#33FFB3',
    '#1AFFC7',
    '#00FFDB', // Green to Cyan
    '#00E6F7',
    '#00CCFF',
    '#00B3FF',
    '#0099FF',
    '#007FFF', // Cyan to Blue
    '#3366FF',
    '#4C4CFF',
    '#6633FF',
    '#8020FF',
    '#9912FF', // Blue to Purple
    '#B300FF',
    '#CC00FF',
    '#E600FF',
    '#FF00F2',
    '#FF00D8', // Purple to Magenta
    '#FF00BF',
    '#FF0099',
    '#FF007F',
    '#FF0055',
    '#FF0033', // Magenta to Red
];
