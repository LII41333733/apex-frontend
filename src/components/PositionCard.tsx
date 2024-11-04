import float from '@/utils/float';
import React from 'react';
import PositionPl from './PositionPl';
import PriceBar from './PriceBar';
import convertTickerWithExpiration from '@/utils/convertTickerWithExpiration';

const PositionCard: React.FC = ({ trade }) => {
    console.log(trade);

    return (
        <div
            className='position-container m-auto mb-2 vision-position'
            style={{
                position: 'relative',
            }}
        >
            <div className='position mb-0'>
                <div className='text-column column'>
                    <div className='text-top apex-text-yellow'>
                        {convertTickerWithExpiration(trade.optionSymbol)}
                    </div>
                    <div className='text-bottom text-xs'>
                        <span className='text-bottom-label font-normal'>
                            Cons
                        </span>
                        <span className='text-bottom-value mx-1'>
                            {trade.quantity}
                        </span>
                        <span className='text-bottom-label font-normal'>
                            Avg
                        </span>
                        <span className='text-bottom-value mx-1'>
                            {float(trade.fillPrice)}
                        </span>
                        <span className='text-bottom-label font-normal'>
                            Last
                        </span>
                        <span className='text-bottom-value ml-1'>
                            {float(trade.lastPrice)}
                        </span>
                    </div>
                </div>
                <PositionPl trade={trade} />
            </div>
            <PriceBar trade={trade} />
        </div>
    );
};

export default PositionCard;
