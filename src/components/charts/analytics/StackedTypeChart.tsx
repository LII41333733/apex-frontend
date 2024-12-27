import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';

import { CardContent } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useAppSelector } from '@/state/hooks';
import ChartHeader from '../ChartHeader';
import Trade from '@/interfaces/Trade';
import convertDateToShort from '@/utils/convertDateToShort';
import { dollar } from '@/utils/dollar';
import { getTradeBreakdown } from '@/state/tradeSlice';
import { RiskType } from '@/constants';

const { Base, Vision, Lotto, Hero } = RiskType;

type Config = {
    date: string;
    Base: number;
    Vision: number;
    Lotto: number;
    Hero: number;
};

export function StackedTypeChart() {
    const tradeBreakdown = useAppSelector(getTradeBreakdown);
    const { trades, tradesByWeek } = tradeBreakdown;
    const chartType = useAppSelector((state) => state.charts.chartType);

    const [chartData, chartConfig]: any = React.useMemo(() => {
        if (tradeBreakdown.trades.length) {
            const keys = Object.keys(tradesByWeek).slice(-9);
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

    return tradeBreakdown.trades.length ? (
        <>
            <ChartHeader
                mainTitle=""
                mainSubtitle=""
                secondaryTitle=""
                secondarySubtitle=""
            />
            <CardContent>
                {trades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[200px] w-full relative top-[2rem]"
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            stackOffset="sign"
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
                                tickMargin={14}
                                axisLine={false}
                                tickFormatter={convertDateToShort}
                            />
                            <>
                                {(chartType === 'All' ||
                                    chartType === Base) && (
                                    <Bar
                                        minPointSize={5}
                                        dataKey="Base"
                                        fill="hsl(var(--base-chart))"
                                    >
                                        {chartData.map((entry, index) => {
                                            return (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        entry['Base'] < 0
                                                            ? 'hsl(var(--base-chart))'
                                                            : 'hsl(var(--base-chart))'
                                                    }
                                                />
                                            );
                                        })}
                                    </Bar>
                                )}
                                {(chartType === 'All' ||
                                    chartType === Vision) && (
                                    <Bar
                                        minPointSize={5}
                                        dataKey="Vision"
                                        fill="hsl(var(--vision-chart))"
                                    >
                                        {chartData.map((entry, index) => {
                                            return (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        entry['Vision'] < 0
                                                            ? 'hsl(var(--vision-chart))'
                                                            : 'hsl(var(--vision-chart))'
                                                    }
                                                />
                                            );
                                        })}
                                    </Bar>
                                )}
                                {(chartType === 'All' ||
                                    chartType === Lotto) && (
                                    <Bar
                                        minPointSize={5}
                                        dataKey="Lotto"
                                        fill="hsl(var(--lotto-chart))"
                                    >
                                        {chartData.map((entry, index) => {
                                            return (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        entry['Lotto'] < 0
                                                            ? 'hsl(var(--lotto-chart))'
                                                            : 'hsl(var(--lotto-chart))'
                                                    }
                                                />
                                            );
                                        })}
                                    </Bar>
                                )}
                                {(chartType === 'All' ||
                                    chartType === Hero) && (
                                    <Bar
                                        minPointSize={5}
                                        dataKey="Hero"
                                        fill="hsl(var(--hero-chart))"
                                    >
                                        {chartData.map((entry, index) => {
                                            return (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        entry['Hero'] < 0
                                                            ? 'hsl(var(--hero-chart))'
                                                            : 'hsl(var(--hero-chart))'
                                                    }
                                                />
                                            );
                                        })}
                                    </Bar>
                                )}
                            </>
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        hideLabel
                                        className="w-[180px]"
                                        formatter={(
                                            value,
                                            name,
                                            item,
                                            index
                                        ) => (
                                            <>
                                                <div
                                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                    style={
                                                        {
                                                            '--color-bg': `var(--color-${name})`,
                                                        } as React.CSSProperties
                                                    }
                                                />
                                                {chartConfig[
                                                    name as keyof typeof chartConfig
                                                ]?.label || name}
                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                    {dollar(value)}
                                                </div>
                                                {/* Add this after the last item */}
                                                {index === 3 && (
                                                    <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                                        Total
                                                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                            {dollar(
                                                                item.payload
                                                                    .Base +
                                                                    item.payload
                                                                        .Vision +
                                                                    item.payload
                                                                        .Lotto +
                                                                    item.payload
                                                                        .Hero
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    />
                                }
                                cursor={false}
                                defaultIndex={0}
                            />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </>
    ) : (
        <></>
    );
}
