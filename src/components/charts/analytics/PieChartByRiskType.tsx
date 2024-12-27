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
import { getTradeBreakdown } from '@/state/tradeSlice';

export function PieChartByRiskType() {
    const tradeBreakdown = useAppSelector(getTradeBreakdown);
    const chartType = useAppSelector((state) => state.charts.chartType);

    const { tradesByRiskType, trades } = tradeBreakdown;
    const { Base, Hero, Lotto, Vision } = tradesByRiskType;

    const chartConfig = {
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

    return (
        <>
            <ChartHeader
                mainTitle="Trade Breakdown by Trade Type"
                mainSubtitle="All Trades"
                secondaryTitle=""
                secondarySubtitle=""
            />
            <CardContent>
                {trades.length && (
                    <ChartContainer
                        config={chartConfig}
                        className="h-[225px] w-[350px] m-auto relative top-[-1rem]"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        nameKey="Trades"
                                        hideLabel
                                    />
                                }
                            />
                            <Pie
                                data={[
                                    {
                                        type: 'Base',
                                        Trades: Base.length,
                                        fill: 'hsl(var(--base-chart)',
                                    },
                                    {
                                        type: 'Vision',
                                        Trades: Vision.length,
                                        fill: 'hsl(var(--vision-chart)',
                                    },
                                    {
                                        type: 'Lotto',
                                        Trades: Lotto.length,
                                        fill: 'hsl(var(--lotto-chart)',
                                    },
                                    {
                                        type: 'Hero',
                                        Trades: Hero.length,
                                        fill: 'hsl(var(--hero-chart)',
                                    },
                                ].filter(
                                    (e) =>
                                        chartType === 'All' ||
                                        chartType === e.type
                                )}
                                dataKey="Trades"
                                labelLine={false}
                                label={({ payload, ...props }) => {
                                    return (
                                        <text
                                            cx={props.cx}
                                            cy={props.cy}
                                            x={props.x}
                                            y={props.y}
                                            textAnchor={props.textAnchor}
                                            dominantBaseline={
                                                props.dominantBaseline
                                            }
                                            fill="hsla(var(--foreground))"
                                        >
                                            {`${payload.type}: ${payload.Trades}`}
                                        </text>
                                    );
                                }}
                                nameKey="type"
                            />
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </>
    );
}
