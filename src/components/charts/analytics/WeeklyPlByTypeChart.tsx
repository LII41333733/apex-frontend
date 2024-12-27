'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { CardContent } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useAppSelector } from '@/state/hooks';
import ChartHeader from './../ChartHeader';
import { getTradeBreakdown } from '@/state/tradeSlice';
import React from 'react';
import convertDateToShort from '@/utils/convertDateToShort';
import { RiskType } from '@/constants';
import Trade from '@/types/Trade';
import { dollar } from '@/utils/dollar';

const { Base, Vision, Lotto, Hero } = RiskType;

type Config = {
    date: string;
    Base: number;
    Vision: number;
    Lotto: number;
    Hero: number;
};

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

export function WeeklyPlByTypeChart() {
    const tradeBreakdown = useAppSelector(getTradeBreakdown);
    const { trades, tradesByWeek } = tradeBreakdown;
    const chartType = useAppSelector((state) => state.charts.chartType);

    const [chartData, chartConfig]: any = React.useMemo(() => {
        if (tradeBreakdown.trades.length) {
            const keys = Object.keys(tradesByWeek).slice(-10);
            const cd = keys.map((date) =>
                tradesByWeek[date].reduce(
                    (p: Config, c: Trade) => {
                        switch (c.riskType) {
                            case Base:
                                p[Base] = p[Base] + c.pl;
                                break;
                            case Vision:
                                p[Vision] = p[Vision] + c.pl;
                                break;
                            case Lotto:
                                p[Lotto] = p[Lotto] + c.pl;
                                break;
                            case Hero:
                                p[Hero] = p[Hero] + c.pl;
                                break;
                        }
                        return p;
                    },
                    {
                        date,
                        Base: 0,
                        Vision: 0,
                        Lotto: 0,
                        Hero: 0,
                    }
                )
            );
            const cf = {
                Base: {
                    label: 'Base',
                    color: 'hsl(var(--base-chart))',
                },
                Vision: {
                    label: 'Vision',
                    color: 'hsl(var(--vision-chart))',
                },
                Hero: {
                    label: 'Hero',
                    color: 'hsl(var(--hero-chart))',
                },
                Lotto: {
                    label: 'Lotto',
                    color: 'hsl(var(--lotto-chart))',
                },
            };
            return [cd, cf];
        }
        return [];
    }, [tradeBreakdown.trades]);

    return (
        <>
            <ChartHeader
                mainTitle="Weekly Profit/Loss"
                mainSubtitle="By Trade Type"
                secondaryTitle=""
                secondarySubtitle=""
            />
            <CardContent>
                {trades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[200px] w-full"
                    >
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="0.3"
                                vertical={false}
                            />
                            <YAxis tickFormatter={(x) => dollar(x, true)} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={14}
                                tickFormatter={convertDateToShort}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="dot" />
                                }
                            />
                            {(chartType === 'All' ||
                                chartType === RiskType.Base) && (
                                <Area
                                    dataKey="Base"
                                    type="natural"
                                    fill="hsl(var(--base-chart))"
                                    fillOpacity={0.4}
                                    stroke="hsl(var(--base-chart))"
                                    stackId="a"
                                />
                            )}
                            {(chartType === 'All' ||
                                chartType === RiskType.Lotto) && (
                                <Area
                                    dataKey="Lotto"
                                    type="natural"
                                    fill="hsl(var(--lotto-chart))"
                                    fillOpacity={0.4}
                                    stroke="hsl(var(--lotto-chart))"
                                    stackId="a"
                                />
                            )}
                            {(chartType === 'All' ||
                                chartType === RiskType.Vision) && (
                                <Area
                                    dataKey="Vision"
                                    type="natural"
                                    fill="hsl(var(--vision-chart))"
                                    fillOpacity={0.4}
                                    stroke="hsl(var(--vision-chart))"
                                    stackId="a"
                                />
                            )}
                            {(chartType === 'All' ||
                                chartType === RiskType.Hero) && (
                                <Area
                                    dataKey="Hero"
                                    type="natural"
                                    fill="hsl(var(--hero-chart))"
                                    fillOpacity={0.4}
                                    stroke="hsl(var(--hero-chart))"
                                    stackId="a"
                                />
                            )}
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </>
    );
}
