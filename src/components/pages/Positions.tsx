import React from 'react';
import { useAppSelector } from '@/state/hooks';
import { TradeStatus } from '@/constants';
import { getTradeBreakdown } from '@/state/tradeSlice';
import OrderFilter from '../OrderFilter';
import TradeCard from '../TradeCard';
import Trade from '@/types/Trade';

const Positions: React.FC = () => {
    const tradeBreakdown = useAppSelector(getTradeBreakdown);
    const { trades } = tradeBreakdown;
    const ordersView = useAppSelector((state) => state.orders.ordersView);
    const [showButtonsId, setShowButtonsId] = React.useState<number>(0);
    const [confirmSellId, setConfirmSellId] = React.useState<number>(0);
    const displayTrades = !trades.length
        ? []
        : trades.filter((e: Trade) => {
              if (ordersView === TradeStatus.ALL) {
                  return true;
              } else {
                  return e.status === ordersView;
              }
          });

    /**
     * Base | Vision: Stop, T1, T2, Runners
     * Hero: Stop, Runners
     * Lotto: Stop, T1, Runners
     */

    return (
        <div
            id="positions"
            className="dashboard flex positions mb-8 md:w-full flex-col"
        >
            <OrderFilter />
            {!trades.length && (
                <p className="text-sm font-normal mb-3 text-center">
                    No orders available
                </p>
            )}
            <div className="md:flex md:py-4 md:flex-row md:flex-wrap md:justify-center w-full m-auto">
                {displayTrades.reverse().map((trade, i) => {
                    return (
                        <TradeCard
                            confirmSellId={confirmSellId}
                            setConfirmSellId={setConfirmSellId}
                            setShowButtonsId={setShowButtonsId}
                            showButtonsId={showButtonsId}
                            trade={trade}
                            zIndex={trades.length - i}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Positions;
