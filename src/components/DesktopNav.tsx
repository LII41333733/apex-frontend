import React from 'react';
import BalanceBar from './BalanceBarDesktop';
import TickerBar from './TickerBar';

const DesktopNav: React.FC = () => {
    return (
        <div className='desktop-nav hidden md:flex mb-12 select-none'>
            <div className='nav-data pl-10 pr-0 pt-2'>
                <BalanceBar />
                {/* <TickerBar /> */}
            </div>
            <hr />
        </div>
    );
};

export default DesktopNav;
