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

const chartConfig = {
    Total: { label: 'Total' },
    'Under 0%': { label: 'Under 0%', color: primary() },
    '0 - 20%': { label: '0 - 20%', color: primary() },
    '20 - 40%': { label: '20 - 40%', color: primary() },
    '40 - 60%': { label: '40 - 60%', color: primary() },
    '60 - 80%': { label: '60 - 80%', color: primary() },
    '80 - 100%': { label: '80 - 100%', color: primary() },
    '100 - 200%': { label: '100 - 200%', color: primary() },
    '200%+': { label: '200%+', color: primary() },
} satisfies ChartConfig;

const ProfitBarChart = () => {
    const allTrades = useAppSelector((state) => state.trades.trades);
    const isDemoMode = useAppSelector((state) => state.main.isDemoMode);
    const chartType = useAppSelector((state) => state.charts.chartType);

    const chartData = [
        { range: 'Under 0%', Total: 0, fill: primary() },
        { range: '0 - 20%', Total: 0, fill: primary() },
        { range: '20 - 40%', Total: 0, fill: primary() },
        { range: '40 - 60%', Total: 0, fill: primary() },
        { range: '60 - 80%', Total: 0, fill: primary() },
        { range: '80 - 100%', Total: 0, fill: primary() },
        { range: '100 - 200%', Total: 0, fill: primary() },
        { range: '200%+', Total: 0, fill: primary() },
    ];

    if (isDemoMode) {
        chartData[1].Total = 11;
        chartData[5].Total = 50;
    }
    allTrades
        .filter((e) => chartType === 'All' || chartType === e.riskType)
        .forEach((trade: Trade) => {
            const delta = getPercentDeltaFromTrade(trade);
            if (delta < 0) {
                chartData[0].Total++;
            } else if (delta >= 0 && delta <= 20) {
                chartData[1].Total++;
            } else if (delta > 20 && delta <= 40) {
                chartData[2].Total++;
            } else if (delta > 40 && delta <= 60) {
                chartData[3].Total++;
            } else if (delta > 60 && delta <= 80) {
                chartData[4].Total++;
            } else if (delta > 80 && delta <= 100) {
                chartData[5].Total++;
            } else if (delta > 100 && delta <= 200) {
                chartData[6].Total++;
            } else if (delta > 200) {
                chartData[7].Total++;
            }
        });

    return (
        <>
            <ChartHeader
                mainTitle="Trade Value Summary"
                mainSubtitle="All Trades"
                secondaryTitle=""
                secondarySubtitle=""
            />
            <CardContent>
                {allTrades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto h-[190px] w-[350px]"
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            layout="vertical"
                            margin={{
                                left: -10,
                                top: 0,
                                right: 10,
                            }}
                        >
                            <YAxis
                                dataKey="range"
                                type="category"
                                tickLine={false}
                                tickMargin={14}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    chartConfig[
                                        value as keyof typeof chartConfig
                                    ]?.label
                                }
                                width={90}
                            />
                            <XAxis dataKey="Total" type="number" hide />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="Total"
                                layout="vertical"
                                radius={5}
                                barSize={7}
                            />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter></CardFooter>
        </>
    );
};

export default ProfitBarChart;
