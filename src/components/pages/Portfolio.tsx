import React from 'react';
import LatestTrades from '../LatestTrades';
import Stats from '../Stats';
import { TotalEquityChart } from '../charts/portfolio/TotalEquityChart';

const Portfolio: React.FC = () => {
    return (
        <div className="dashboard w-full m-auto grid gap-6 grid-cols-6">
            <div className="grid gap-2 col-span-4">
                <Stats />
                <TotalEquityChart />
            </div>
            <div className="apex-card card col-span-2">
                <LatestTrades />
            </div>
        </div>
    );
};

export default Portfolio;
