'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { CardContent } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useAppSelector } from '@/state/hooks';
import ChartHeader from './../ChartHeader';

function getLast10OfEachType(arr) {
    if (!arr.length) return [];
    // Group objects by riskType
    const grouped = arr.reduce((acc, obj) => {
        if (!acc[obj.riskType]) acc[obj.riskType] = [];
        acc[obj.riskType].push(obj);
        return acc;
    }, {});

    // Limit each group to the last 10 entries
    const result = {};
    for (const [key, value] of Object.entries(grouped)) {
        result[key] = value.slice(-20);
    }

    const data = [];

    for (let i = 0; i < 20; i++) {
        data.push({
            Base: result.BASE[i].postTradeBalance,
            Lotto: result.LOTTO[i].postTradeBalance,
            Vision: result.VISION[i].postTradeBalance,
            Hero: result.HERO[i].postTradeBalance,
            Trade: i + 1,
        });
    }

    return data;
}

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

export function AccountValueLast10Trades() {
    const allTrades = useAppSelector((state) => state.trades.trades);

    return (
        <>
            <ChartHeader
                mainTitle="Area Chart - Stacked"
                mainSubtitle="P/L Over Time"
                secondaryTitle="Trending up by 5.2% this month"
                secondarySubtitle="January - June 2024"
                trendIsUp
            />
            <CardContent>
                {allTrades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[200px] w-full"
                    >
                        <AreaChart
                            accessibilityLayer
                            data={getLast10OfEachType(allTrades)}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="Trade"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                // tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="dot" />
                                }
                            />
                            <Area
                                dataKey="Base"
                                type="natural"
                                fill="hsl(var(--base-chart))"
                                fillOpacity={0.4}
                                stroke="hsl(var(--base-chart))"
                                stackId="a"
                            />
                            <Area
                                dataKey="Lotto"
                                type="natural"
                                fill="hsl(var(--lotto-chart))"
                                fillOpacity={0.4}
                                stroke="hsl(var(--lotto-chart))"
                                stackId="a"
                            />
                            <Area
                                dataKey="Vision"
                                type="natural"
                                fill="hsl(var(--vision-chart))"
                                fillOpacity={0.4}
                                stroke="hsl(var(--vision-chart))"
                                stackId="a"
                            />
                            <Area
                                dataKey="Hero"
                                type="natural"
                                fill="hsl(var(--hero-chart))"
                                fillOpacity={0.4}
                                stroke="hsl(var(--hero-chart))"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </>
    );
}
