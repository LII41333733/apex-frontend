import React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A donut chart with text';
import data from '../../data/demoTrades.json';
import Trade from '@/types/Trade';
import TradeCard from '../TradeCard';

export const ONE_MILLION = 1_000_000;
const filteredData: Trade[] = (data as Trade[])
    .filter((e) => e.pl > 0)
    .slice(0, 40);
const numColors = filteredData.length;

const colors = Array.from({ length: numColors }, (_, i) => {
    const hue = (i / (numColors - 1)) * 360;
    return `hsl(${0}, 100%, 50%)`;
});

const chartData = filteredData.map((e, i) => ({
    ...e,
    fill: colors[i],
}));

const chartConfig = chartData.reduce((p: any, { pl, optionSymbol }: any, i) => {
    return {
        ...p,
        [optionSymbol]: {
            label: optionSymbol,
        },
    };
}, {});

const total = chartData[chartData.length - 1].postTradeBalance;
const diff = ONE_MILLION - total;

chartData.push({
    pl: diff,
    optionSymbol: 'Target',
} as Trade);

chartConfig['Target'] = {
    label: diff,
    color: 'gray',
};

const LossChart: React.FC = () => {
    const hovref = React.useRef(null);

    React.useEffect(() => {
        if (hovref.current) {
        }
    }, [hovref]);

    const space = 35;
    const mod1 = -50;
    const mod2 = mod1 + space;
    const mod3 = 40;
    const mod4 = mod3 + space;

    const [activeSlice, setActiveSlice] = React.useState(null);

    return (
        <div className="loss-container">
            <ChartContainer
                config={chartConfig}
                className="mx-auto chart-container h-[900px] w-full"
            >
                {activeSlice && (
                    <div className="absolute">
                        <TradeCard trade={activeSlice} isLossChart />
                    </div>
                )}
                <PieChart
                    className="m-o p-0"
                    margin={{ top: -90, right: 0, left: -0, bottom: 0 }}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        minAngle={1}
                        data={chartData}
                        dataKey="pl"
                        nameKey="optionSymbol"
                        innerRadius={330}
                        onMouseOver={(e) => {
                            e.name === 'Target'
                                ? setActiveSlice(null)
                                : setActiveSlice(e);
                        }}
                        onMouseOut={() => setActiveSlice(null)}
                    />
                </PieChart>
            </ChartContainer>
        </div>
    );
};

export default LossChart;
