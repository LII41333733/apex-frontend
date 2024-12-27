import React from 'react';
import AnalyticsDisplaySelector from '../AnalyticsDisplaySelector';
import LinePlChart from '../charts/analytics/LinePlChart';
import ChartWrapper from '../charts/ChartWrapper';
import { NegativeBarChartAll } from '../charts/analytics/NegativeBarChartAll';
import { WeeklyPlByTypeChart } from '../charts/analytics/WeeklyPlByTypeChart';
import ProfitBarChart from '../charts/analytics/ProfitBarChart';
import { OptionSymbolBreakdownChart } from '../charts/analytics/OptionSymbolBreakdownChart';
import { StackedTypeChart } from '../charts/analytics/StackedTypeChart';
import WinLossRadialChart from '../charts/analytics/WinLossRadialChart';
import { PieChartByRiskType } from '../charts/analytics/PieChartByRiskType';

const Analytics: React.FC = () => {
    return (
        <>
            <AnalyticsDisplaySelector />
            <div className="grid grid-cols-12 gap-x-6 gap-y-2">
                <ChartWrapper className="col-span-12 flex" isExtended>
                    <div className="w-full">
                        <WeeklyPlByTypeChart />
                    </div>
                    <div className="w-full">
                        <StackedTypeChart />
                    </div>
                </ChartWrapper>
                <ChartWrapper className="col-span-6">
                    <NegativeBarChartAll />
                </ChartWrapper>
                <ChartWrapper className="col-span-6">
                    <LinePlChart />
                </ChartWrapper>
                <ChartWrapper className="col-span-3">
                    <OptionSymbolBreakdownChart />
                </ChartWrapper>
                <ChartWrapper className="col-span-3">
                    <WinLossRadialChart />
                </ChartWrapper>
                <ChartWrapper className="col-span-3">
                    <ProfitBarChart />
                </ChartWrapper>
                <ChartWrapper className="col-span-3">
                    <PieChartByRiskType />
                </ChartWrapper>
            </div>
        </>
    );
};

export default Analytics;
