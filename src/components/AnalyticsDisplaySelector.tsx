import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Displays, RiskType } from '@/constants';
import { updateDisplay } from '@/state/mainSlice';
import React from 'react';
import { updateChartType } from '@/state/chartsSlice';
import getProperCasing from '@/utils/getProperCasing';

const AnalyticsDisplaySelector: React.FC = () => {
    const dispatch = useAppDispatch();
    const chartType = useAppSelector((state) => state.charts.chartType);

    return (
        <Tabs defaultValue={chartType} className='display-tab mb-6'>
            <TabsList className='w-[100%] md:w-[400px] flex justify-center card display-selector-list'>
                <TabsTrigger
                    id='chart-select'
                    onClick={() => {
                        dispatch(updateChartType('All'));
                    }}
                    value={'All'}
                >
                    All
                </TabsTrigger>
                <TabsTrigger
                    id='base-charts'
                    onClick={() => {
                        dispatch(updateChartType(RiskType.BASE));
                    }}
                    value={RiskType.BASE}
                >
                    {getProperCasing(RiskType.BASE)}
                </TabsTrigger>
                <TabsTrigger
                    id='lotto-charts'
                    onClick={() => {
                        dispatch(updateChartType(RiskType.LOTTO));
                    }}
                    value={RiskType.LOTTO}
                >
                    {getProperCasing(RiskType.LOTTO)}
                </TabsTrigger>
                <TabsTrigger
                    id='vision-charts'
                    onClick={() => {
                        dispatch(updateChartType(RiskType.LOTTO));
                    }}
                    value={RiskType.VISION}
                >
                    {getProperCasing(RiskType.VISION)}
                </TabsTrigger>
                <TabsTrigger
                    id='hero-charts'
                    onClick={() => {
                        dispatch(updateChartType(RiskType.HERO));
                    }}
                    value={RiskType.HERO}
                >
                    {getProperCasing(RiskType.HERO)}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default AnalyticsDisplaySelector;
