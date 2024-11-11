import React from 'react';
import { useAppSelector } from '@/state/hooks';
import PriceBar from '../PriceBar';
import convertTickerWithExpiration from '@/utils/convertTickerWithExpiration';
import PositionPl from '../PositionPl';
import StatusBadge from '../StatusBadge';
import { TradeStatus } from '@/constants';
import float from '@/utils/float';
import { getAllTrades } from '@/state/tradeSlice';
import OrderFilter from '../OrderFilter';
import Trade from '@/types/Trade';
import TradeCard from '../TradeCard';

const Positions: React.FC = () => {
    const allTrades: Trade[] = useAppSelector((state) =>
        getAllTrades(state.trades)
    );
    const ordersView = useAppSelector((state) => state.orders.ordersView);
    const [showButtonsId, setShowButtonsId] = React.useState<number>(0);
    const [confirmSellId, setConfirmSellId] = React.useState<number>(0);
    const displayTrades = allTrades.filter((e) => {
        if (ordersView === TradeStatus.ALL) {
            return true;
        } else {
            return e.status === ordersView;
        }
    });

    return (
        <div
            id='positions'
            className='dashboard flex positions mb-8 md:w-full flex-col'
        >
            <OrderFilter />
            {!allTrades.length && (
                <p className='text-sm font-normal mb-3 text-center'>
                    No orders available
                </p>
            )}
            <div className='md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto'>
                {displayTrades.reverse().map((trade, i) => {
                    return (
                        <TradeCard
                            confirmSellId={confirmSellId}
                            setConfirmSellId={setConfirmSellId}
                            setShowButtonsId={setShowButtonsId}
                            showButtonsId={showButtonsId}
                            trade={trade}
                            zIndex={allTrades.length - i}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Positions;
