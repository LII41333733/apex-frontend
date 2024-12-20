import { useAppSelector } from '@/state/hooks';
import React from 'react';
import AnalyticsDisplaySelector from '../AnalyticsDisplaySelector';
import { AccountValueLast10Trades } from '../charts/analytics/AccountValueLast10Trades';
import LinePlChart from '../charts/analytics/LinePlChart';
import ChartWrapper from '../charts/ChartWrapper';
import { NegativeBarChartAll } from '../charts/analytics/NegativeBarChartAll';
import { WeeklyPlByTypeChart } from '../charts/analytics/WeeklyPlByTypeChart';

const Analytics: React.FC = () => {
    const chartType = useAppSelector((state) => state.charts.chartType);

    return (
        <>
            <AnalyticsDisplaySelector />
            <div className="grid grid-cols-6 gap-x-6 gap-y-2">
                <ChartWrapper className="col-span-3">
                    <WeeklyPlByTypeChart />
                </ChartWrapper>
                <ChartWrapper className="col-span-3">
                    <NegativeBarChartAll />
                </ChartWrapper>
                <ChartWrapper className="col-span-2">
                    <AccountValueLast10Trades />
                </ChartWrapper>
                <ChartWrapper className="col-span-2">
                    <LinePlChart />
                </ChartWrapper>
                <ChartWrapper className="col-span-2">
                    <AccountValueLast10Trades />
                </ChartWrapper>
                {/* {chartType === 'All' && <AccountValueLast10Trades />}
                {chartType === RiskType.BASE && <div>Base Trades</div>}
                {chartType === RiskType.LOTTO && <div>Lotto Trades</div>}
                {chartType === RiskType.VISION && <div>Vision Trades</div>}
                {chartType === RiskType.HERO && <div>Hero Trades</div>} */}
            </div>
        </>
    );
};

export default Analytics;
