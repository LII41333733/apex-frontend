import { useAppSelector } from '@/state/hooks';
import React from 'react';
import AnalyticsDisplaySelector from '../AnalyticsDisplaySelector';
import { RiskType } from '@/constants';
import { AccountValueLast10Trades } from '../charts/AccountValueLast10Trades';
import LinePlChart from '../charts/LinePlChart';
import ChartWrapper from '../charts/ChartWrapper';

const Analytics: React.FC = () => {
    const chartType = useAppSelector((state) => state.charts.chartType);

    return (
        <>
            <AnalyticsDisplaySelector />
            <div className='grid grid-cols-6 gap-x-4'>
                <ChartWrapper className='col-span-3'>
                    <LinePlChart />
                </ChartWrapper>
                <ChartWrapper className='col-span-3'>
                    <AccountValueLast10Trades />
                </ChartWrapper>
                <ChartWrapper className='col-span-2'>
                    <AccountValueLast10Trades />
                </ChartWrapper>
                <ChartWrapper className='col-span-2'>
                    <AccountValueLast10Trades />
                </ChartWrapper>
                <ChartWrapper className='col-span-2'>
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
