import React from 'react';
import EquityChart from '../EquityChart';
import LatestTrades from '../LatestTrades';
import Stats from '../Stats';
import { NetValueChart } from '../charts/NetValueChart';

const Portfolio: React.FC = () => {
    return (
        <div className='dashboard w-full m-auto grid gap-6 grid-cols-6'>
            <div className='grid gap-2 col-span-4'>
                <Stats />
                <NetValueChart />
            </div>
            <div className='apex-card card col-span-2'>
                <LatestTrades />
            </div>
        </div>
    );
};

export default Portfolio;
