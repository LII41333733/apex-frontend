import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RiskType } from '@/constants';
import React from 'react';
import { updateChartType } from '@/state/chartsSlice';
import getProperCasing from '@/utils/getProperCasing';

const AnalyticsDisplaySelector: React.FC = () => {
    const dispatch = useAppDispatch();
    const chartType = useAppSelector((state) => state.charts.chartType);

    return (
        <Tabs defaultValue={chartType} className="display-tab mb-6">
            <TabsList className="w-[100%] md:w-[575px] flex justify-center card display-selector-list items-center text-center">
                <TabsTrigger
                    id="chart-select"
                    onClick={() => {
                        dispatch(updateChartType('All'));
                    }}
                    value={'All'}
                >
                    <div className="w-20">{'All'}</div>
                </TabsTrigger>
                <TabsTrigger
                    id="base-charts"
                    onClick={() => {
                        dispatch(updateChartType(RiskType.Base));
                    }}
                    value={RiskType.Base}
                >
                    <div className="w-20 flex items-center justify-center">
                        {getProperCasing(RiskType.Base)}
                        <div className="bg-[hsl(var(--base-chart))] h-[0.6rem] w-[0.6rem] ml-2"></div>
                    </div>
                </TabsTrigger>
                <TabsTrigger
                    id="lotto-charts"
                    onClick={() => {
                        dispatch(updateChartType(RiskType.Lotto));
                    }}
                    value={RiskType.Lotto}
                >
                    <div className="w-20 flex items-center justify-center">
                        {getProperCasing(RiskType.Lotto)}
                        <div className="bg-[hsl(var(--lotto-chart))] h-[0.6rem] w-[0.6rem] ml-2"></div>
                    </div>
                </TabsTrigger>
                <TabsTrigger
                    id="vision-charts"
                    onClick={() => {
                        dispatch(updateChartType(RiskType.Vision));
                    }}
                    value={RiskType.Vision}
                >
                    <div className="w-20 flex items-center justify-center">
                        {getProperCasing(RiskType.Vision)}
                        <div className="bg-[hsl(var(--vision-chart))] h-[0.6rem] w-[0.6rem] ml-2"></div>
                    </div>
                </TabsTrigger>
                <TabsTrigger
                    id="hero-charts"
                    onClick={() => {
                        dispatch(updateChartType(RiskType.Hero));
                    }}
                    value={RiskType.Hero}
                >
                    <div className="w-20 flex items-center justify-center">
                        {getProperCasing(RiskType.Hero)}
                        <div className="bg-[hsl(var(--hero-chart))] h-[0.6rem] w-[0.6rem] ml-2"></div>
                    </div>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default AnalyticsDisplaySelector;
