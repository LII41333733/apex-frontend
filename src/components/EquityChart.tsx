import { TrendingDown, TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
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
import { Badge } from './ui/badge';
export const description = 'A multiple line chart';
const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
];
const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--base-chart))',
    },
    mobile: {
        label: 'Mobile',
        color: 'hsl(var(--lotto-chart))',
    },
} satisfies ChartConfig;

const EquityChart: React.FC = () => {
    return (
        <div className='apex-card card'>
            <CardHeader className='equity-chart w-full pt-4'>
                <div className='flex-1'>
                    <CardTitle className='text-md'>Net Account Value</CardTitle>
                    <CardDescription className='text-sm'>
                        Total P/L
                    </CardDescription>
                </div>
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
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className='rounded-xl bg-background pt-6 pb-4 px-6 w-full'
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='month'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey='desktop'
                            type='monotone'
                            stroke='var(--color-desktop)'
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey='mobile'
                            type='monotone'
                            stroke='var(--color-mobile)'
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className='flex w-full items-start gap-2 text-sm'>
                    <div className='grid gap-2'>
                        <div className='flex items-center gap-2 font-medium leading-none text-sm'>
                            Trending up by 5.2% this month{' '}
                            <TrendingUp className='h-4 w-4' />
                            <TrendingDown className='h-4 w-4' />
                        </div>
                        <div className='flex items-center gap-2 leading-none text-muted-foreground text-sm'>
                            Showing total visitors for the last 6 months
                        </div>
                    </div>
                </div>
            </CardFooter>
        </div>
    );
};

export default EquityChart;
