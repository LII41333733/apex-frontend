'use client';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
import { Badge } from '../ui/badge';
import data from '../../data/demoTrades.json';
import Trade from '@/types/Trade';
import ChartHeader from './ChartHeader';

export const description = 'A simple area chart';

const chartData: unknown[] = (data as Trade[]).map((e) => ({
    date: e.openDate,
    postTradeBalance: e.postTradeBalance,
}));

// const chartData = netValueChartDemo;

const chartConfig = {
    desktop: {
        label: 'Balance',
        color: 'hsl(var(--trade-green))',
    },
} satisfies ChartConfig;

export function NetValueChart() {
    return (
        <div className='apex-card card'>
            <CardHeader className='equity-chart w-full p-0'>
                <ChartHeader
                    mainTitle='Area Chart - Stacked'
                    mainSubtitle='P/L Over Time'
                    secondaryTitle='Trending up by 5.2% this month'
                    secondarySubtitle='January - June 2024'
                    trendIsUp
                />
                <div className='flex justify-between items-center mr-4 pb-4'>
                    <Badge
                        onClick={async () => {}}
                        className='equity-chart-btn mr-2 bg-background rounded badge text-sm apex-button text-foreground symbol-badge mini'
                        variant='outline'
                    >
                        Yearly
                    </Badge>
                    <Badge
                        onClick={async () => {}}
                        className='equity-chart-btn mr-2 bg-background rounded badge text-sm apex-button text-foreground symbol-badge mini'
                        variant='outline'
                    >
                        Monthly
                    </Badge>
                    <Badge
                        onClick={async () => {}}
                        className='equity-chart-btn mr-2 bg-background rounded badge text-sm apex-button text-foreground symbol-badge mini'
                        variant='outline'
                    >
                        Weekly
                    </Badge>
                    <Badge
                        onClick={async () => {}}
                        className='equity-chart-btn mr-2 bg-background rounded badge text-sm apex-button text-foreground symbol-badge mini'
                        variant='outline'
                    >
                        Daily
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='date'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='line' />}
                        />
                        <Area
                            dataKey='postTradeBalance'
                            type='natural'
                            fill='var(--color-desktop)'
                            fillOpacity={0.4}
                            stroke='var(--color-desktop)'
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </div>
    );
}
