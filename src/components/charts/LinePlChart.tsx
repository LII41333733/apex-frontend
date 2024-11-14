import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, CartesianGrid, Line, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useAppSelector } from '@/state/hooks';
import sortDataByRiskType from '@/utils/charts/sortDataByRiskType';
import mapChartDataByProperty from '@/utils/charts/mapChartDataByProperty';
import ChartHeader from './ChartHeader';

const chartConfig = {
    BASE: {
        label: 'Base',
        color: 'hsl(var(--base-chart))',
    },
    LOTTO: {
        label: 'Lotto',
        color: 'hsl(var(--lotto-chart))',
    },
    VISION: {
        label: 'Vision',
        color: 'hsl(var(--vision-chart))',
    },
    HERO: {
        label: 'Hero',
        color: 'hsl(var(--hero-chart))',
    },
} satisfies ChartConfig;

const LinePlChart = () => {
    const allTrades = useAppSelector((state) => state.trades.trades);

    const tradeData = React.useMemo(
        () => mapChartDataByProperty(sortDataByRiskType(allTrades, 20), 'pl'),
        [allTrades]
    );

    return (
        <>
            <ChartHeader
                mainTitle='Area Chart - Stacked'
                mainSubtitle='P/L Over Time'
                secondaryTitle='Trending up by 5.2% this month'
                secondarySubtitle='January - June 2024'
                trendIsUp
            />
            <CardContent>
                {allTrades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className='h-[200px] w-full'
                    >
                        <LineChart
                            accessibilityLayer
                            data={tradeData}
                            margin={{
                                left: 16,
                                right: 16,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey='closeDate'
                                tickLine={false}
                                axisLine={false}
                                minTickGap={30}
                                tickMargin={8}
                                tickFormatter={(value) =>
                                    value
                                        .slice(5, 10)
                                        .split('-')
                                        .map((e) =>
                                            e[0] === '0'
                                                ? e.slice(1, e.length)
                                                : e
                                        )
                                        .join('/')
                                }
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            <Line
                                dataKey='BASE'
                                type='monotone'
                                fill='hsl(var(--base-chart))'
                                stroke='hsl(var(--base-chart))'
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey='LOTTO'
                                type='monotone'
                                fill='hsl(var(--lotto-chart))'
                                stroke='hsl(var(--lotto-chart))'
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey='VISION'
                                type='monotone'
                                fill='hsl(var(--vision-chart))'
                                stroke='hsl(var(--vision-chart))'
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey='HERO'
                                type='monotone'
                                fill='hsl(var(--hero-chart))'
                                stroke='hsl(var(--hero-chart))'
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter></CardFooter>
        </>
    );
};

export default LinePlChart;
