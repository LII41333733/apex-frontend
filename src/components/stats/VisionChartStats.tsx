import React from 'react';

const VisionChartStats: React.FC = () => {
    return (
        <div className='vision-chart-stats grid gap-2 grid-cols-3'>
            <div className='vision-chart-stats-col grid gap-2 grid-rows-3'>
                <div className='vision-chart-stats-row h-3 w-3'>H</div>
            </div>
            <div className='vision-chart-stats-col grid gap-2 grid-rows-3'></div>
            <div className='vision-chart-stats-col grid gap-2 grid-rows-3'></div>
        </div>
    );
};

export default VisionChartStats;
