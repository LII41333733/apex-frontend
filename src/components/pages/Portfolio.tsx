import React from 'react';
import EquityChart from '../EquityChart';
import LatestTrades from '../LatestTrades';
import Stats from '../Stats';

const Portfolio: React.FC = () => {
    return (
        <>
            <div className='grid gap-2 col-span-6'>
                <Stats />
                <EquityChart />
            </div>
            <LatestTrades />
        </>
    );
};

export default Portfolio;
