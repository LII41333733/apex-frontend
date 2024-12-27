import React from 'react';
import { LineChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts';

import { CardContent, CardFooter } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useAppSelector } from '@/state/hooks';
import sortDataByRiskType from '@/utils/charts/sortDataByRiskType';
import mapChartDataByProperty from '@/utils/charts/mapChartDataByProperty';
import ChartHeader from './../ChartHeader';
import convertDateToShort from '@/utils/convertDateToShort';
import { dollar } from '@/utils/dollar';
import { RiskType } from '@/constants';

const chartConfig = {
    Base: {
        label: 'Base',
        color: 'hsl(var(--base-chart))',
    },
    Lotto: {
        label: 'Lotto',
        color: 'hsl(var(--lotto-chart))',
    },
    Vision: {
        label: 'Vision',
        color: 'hsl(var(--vision-chart))',
    },
    Hero: {
        label: 'Hero',
        color: 'hsl(var(--hero-chart))',
    },
} satisfies ChartConfig;

const LinePlChart = () => {
    const allTrades = useAppSelector((state) => state.trades.trades);
    const chartType = useAppSelector((state) => state.charts.chartType);
    const tradeData = React.useMemo(() => {
        return mapChartDataByProperty(sortDataByRiskType(allTrades, 20), 'pl');
    }, [allTrades]);

    return (
        <>
            <ChartHeader
                mainTitle="Profit/Loss By Trade Type"
                mainSubtitle="Last 20 Trades"
                secondaryTitle=""
                secondarySubtitle=""
            />
            <CardContent>
                {allTrades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[200px] w-full"
                    >
                        <LineChart
                            accessibilityLayer
                            data={tradeData}
                            margin={{
                                left: 16,
                                right: 16,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="0.3"
                                vertical={false}
                            />
                            <YAxis tickFormatter={(x) => dollar(x, true)} />
                            <XAxis
                                dataKey="closeDate"
                                tickLine={false}
                                axisLine={false}
                                minTickGap={30}
                                tickMargin={14}
                                tickFormatter={convertDateToShort}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            {(chartType === 'All' ||
                                chartType === RiskType.Base) && (
                                <Line
                                    dataKey="Base"
                                    type="monotone"
                                    fill="hsl(var(--base-chart))"
                                    stroke="hsl(var(--base-chart))"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            )}
                            {(chartType === 'All' ||
                                chartType === RiskType.Lotto) && (
                                <Line
                                    dataKey="Lotto"
                                    type="monotone"
                                    fill="hsl(var(--lotto-chart))"
                                    stroke="hsl(var(--lotto-chart))"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            )}
                            {(chartType === 'All' ||
                                chartType === RiskType.Vision) && (
                                <Line
                                    dataKey="Vision"
                                    type="monotone"
                                    fill="hsl(var(--vision-chart))"
                                    stroke="hsl(var(--vision-chart))"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            )}
                            {(chartType === 'All' ||
                                chartType === RiskType.Hero) && (
                                <Line
                                    dataKey="Hero"
                                    type="monotone"
                                    fill="hsl(var(--hero-chart))"
                                    stroke="hsl(var(--hero-chart))"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            )}
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter></CardFooter>
        </>
    );
};

export default LinePlChart;
