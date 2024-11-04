import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Displays } from '@/constants';
import { updateDisplay } from '@/state/mainSlice';
import React from 'react';

const DisplaySelector: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        orderSummary: { openOrders, pendingOrders },
    } = useAppSelector((state) => state.orders);
    const { display } = useAppSelector((state) => state.main);
    const hasOpenOrders = openOrders.length;
    const hasPendingOrders = pendingOrders.length;
    const hasBothOpenAndPendingOrders = hasOpenOrders && hasPendingOrders;

    return (
        <Tabs
            defaultValue={display}
            className='display-tab mb-5 md:mb-0 md:ml-10'
        >
            <TabsList className='w-[100%] md:w-[600px] flex justify-center card display-selector-list'>
                <div>
                    <TabsTrigger
                        id='portfolio-display'
                        onClick={() => {
                            dispatch(updateDisplay(Displays.PORTFOLIO));
                        }}
                        value={Displays.PORTFOLIO}
                    >
                        <>
                            {Displays.PORTFOLIO}
                            <PositionIcon
                                hasOpenOrders={hasOpenOrders}
                                hasPendingOrders={hasPendingOrders}
                                hasBothOpenAndPendingOrders={
                                    hasBothOpenAndPendingOrders
                                }
                            />
                        </>
                    </TabsTrigger>
                    <TabsTrigger
                        id='chain-display'
                        onClick={() => {
                            dispatch(updateDisplay(Displays.CHAIN));
                        }}
                        value={Displays.CHAIN}
                    >
                        {Displays.CHAIN}
                    </TabsTrigger>
                    <TabsTrigger
                        id='positions-display'
                        onClick={() => {
                            dispatch(updateDisplay(Displays.POSITIONS));
                        }}
                        value={Displays.POSITIONS}
                    >
                        <>
                            {Displays.POSITIONS}
                            <PositionIcon
                                hasOpenOrders={hasOpenOrders}
                                hasPendingOrders={hasPendingOrders}
                                hasBothOpenAndPendingOrders={
                                    hasBothOpenAndPendingOrders
                                }
                            />
                        </>
                    </TabsTrigger>
                </div>
                <div>
                    <TabsTrigger
                        id='trades-display'
                        onClick={() => {
                            dispatch(updateDisplay(Displays.TRADES));
                        }}
                        value={Displays.TRADES}
                    >
                        {Displays.TRADES}
                    </TabsTrigger>
                    <TabsTrigger
                        id='analytics-display'
                        onClick={() => {
                            dispatch(updateDisplay(Displays.ANALYTICS));
                        }}
                        value={Displays.ANALYTICS}
                    >
                        {Displays.ANALYTICS}
                    </TabsTrigger>
                    <TabsTrigger
                        id='vision-display'
                        onClick={() => {
                            dispatch(updateDisplay(Displays.VISION));
                        }}
                        value={Displays.VISION}
                    >
                        {Displays.VISION}
                    </TabsTrigger>
                </div>
            </TabsList>
        </Tabs>
    );
};

const PositionIcon: React.FC<{
    hasOpenOrders: number;
    hasPendingOrders: number;
    hasBothOpenAndPendingOrders: number;
}> = ({ hasOpenOrders, hasPendingOrders, hasBothOpenAndPendingOrders }) => {
    if (hasBothOpenAndPendingOrders) {
        return (
            <>
                <span className='icon text-status-open ml-2 text-lg inline-block'>
                    ◖
                </span>
                <span className='icon second-half text-status-pending text-lg inline-block'>
                    ◗
                </span>
            </>
        );
    }

    if (hasOpenOrders) {
        return (
            <span className='icon text-status-open ml-2 text-lg inline-block'>
                ●
            </span>
        );
    }

    if (hasPendingOrders) {
        return (
            <span className='icon text-status-pending ml-2 text-lg inline-block'>
                ●
            </span>
        );
    }

    return <></>;
};

export default DisplaySelector;
