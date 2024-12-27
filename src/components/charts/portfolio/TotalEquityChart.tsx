'use client';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
import { Badge } from '../../ui/badge';
import ChartHeader from '../ChartHeader';
import React from 'react';
import { useAppSelector } from '@/state/hooks';
import convertDateToShort from '@/utils/convertDateToShort';
import { dollar } from '@/utils/dollar';
import { getTradeBreakdown } from '@/state/tradeSlice';

enum PortfolioChartView {
    YEARLY,
    MONTHLY,
    WEEKLY,
    DAILY,
}

const chartConfig = {
    postTradeBalance: {
        label: 'Balance',
    },
} satisfies ChartConfig;

export function TotalEquityChart() {
    const tradeBreakdown = useAppSelector(getTradeBreakdown);
    const [chartView, setChartView] = React.useState<PortfolioChartView>(
        PortfolioChartView.DAILY
    );

    const { chartData, minTickGap } = ProcessTrades(tradeBreakdown, chartView);

    return (
        <div className="apex-card card">
            <CardHeader className="equity-chart w-full p-0">
                <ChartHeader
                    mainTitle="Total Equity"
                    mainSubtitle="Net Account Balance"
                    secondaryTitle=""
                    secondarySubtitle=""
                />
                <div className="flex justify-between items-center mr-4 pb-4">
                    <Badge
                        onClick={async () => {
                            setChartView(PortfolioChartView.YEARLY);
                        }}
                        className={`equity-chart-btn mr-2 bg-background rounded badge text-sm apex-button text-foreground symbol-badge mini ${
                            chartView === PortfolioChartView.YEARLY
                                ? 'selected'
                                : ''
                        }`}
                        variant="outline"
                    >
                        Yearly
                    </Badge>
                    <Badge
                        onClick={async () => {
                            setChartView(PortfolioChartView.MONTHLY);
                        }}
                        className={`equity-chart-btn mr-2 bg-background rounded badge text-sm apex-button text-foreground symbol-badge mini ${
                            chartView === PortfolioChartView.MONTHLY
                                ? 'selected'
                                : ''
                        }`}
                        variant="outline"
                    >
                        Monthly
                    </Badge>
                    <Badge
                        onClick={async () => {
                            setChartView(PortfolioChartView.WEEKLY);
                        }}
                        className={`equity-chart-btn mr-2 bg-background rounded badge text-sm apex-button text-foreground symbol-badge mini ${
                            chartView === PortfolioChartView.WEEKLY
                                ? 'selected'
                                : ''
                        }`}
                        variant="outline"
                    >
                        Weekly
                    </Badge>
                    <Badge
                        onClick={async () => {
                            setChartView(PortfolioChartView.DAILY);
                        }}
                        className={`equity-chart-btn mr-2 bg-background rounded badge text-sm apex-button text-foreground symbol-badge mini ${
                            chartView === PortfolioChartView.DAILY
                                ? 'selected'
                                : ''
                        }`}
                        variant="outline"
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
                            right: 6,
                        }}
                    >
                        <CartesianGrid strokeDasharray="0.3" vertical={false} />
                        <XAxis
                            dataKey="closeDate"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={14}
                            tickFormatter={convertDateToShort}
                            minTickGap={minTickGap}
                        />
                        <YAxis
                            minTickGap={2}
                            tickFormatter={(e) => dollar(e)}
                            tickCount={8}
                            type="number"
                            domain={['dataMin', 'auto']}
                            scale="linear"
                            tickLine={false}
                            axisLine={true}
                            padding={{ top: 30, bottom: 0 }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="postTradeBalance"
                            type="natural"
                            fill="hsl(var(--chart-area))"
                            fillOpacity={1}
                            stroke="hsl(var(--apex-yellow))"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </div>
    );
}

const ProcessTrades = (tradeBreakdown: any, chartView: PortfolioChartView) => {
    const { trades, tradesByWeek, tradesByMonth, tradesByYear } =
        tradeBreakdown;

    const defaultChartData = {
        chartData: trades,
        minTickGap: 50,
    };

    const [chartData, setChartData] = React.useState<{
        chartData: any;
        minTickGap: number;
    } | null>(null);

    React.useEffect(() => {
        if (trades.length && !chartData) {
            switch (chartView) {
                case PortfolioChartView.YEARLY:
                    setChartData({
                        chartData: Object.values(tradesByYear).map((e: any) =>
                            e.at(-1)
                        ),
                        minTickGap: 0,
                    });
                    break;
                case PortfolioChartView.MONTHLY:
                    setChartData({
                        chartData: Object.values(tradesByMonth)
                            .map((e: any) => e.at(-1))
                            .slice(-12),
                        minTickGap: 0,
                    });
                    break;
                case PortfolioChartView.WEEKLY:
                    setChartData({
                        chartData: Object.values(tradesByWeek)
                            .map((e: any) => e.at(-1))
                            .slice(-20),
                        minTickGap: 0,
                    });
                    break;
                case PortfolioChartView.DAILY:
                    setChartData({
                        chartData: trades.slice(-14),
                        minTickGap: 0,
                    });
                    break;
            }
        }
    }, [trades, chartData]);

    React.useEffect(() => {
        setChartData(null);
    }, [chartView]);

    if (!trades.length || !chartData) {
        return defaultChartData;
    }

    return chartData;
};
