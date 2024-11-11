import React from 'react';
import { CardContent, CardTitle } from '@/components/ui/card';

const LatestTrades: React.FC = () => {
    return (
        <CardContent className='grid gap-6 mt-1'>
            <div className='flex items-center gap-4 mt-4'>
                <div className='grid gap-0 w-[13rem]'>
                    <CardTitle className='text-md'>Latest Trades</CardTitle>
                </div>
            </div>
            <div className='flex items-center gap-4 mt-2'>
                <div className='grid gap-0'>
                    <p className='text-top text-apex-light-yellow font-medium leading-none w-[13rem]'>
                        SPY 575P 10/4
                    </p>
                    <p className='italic text-sm text-foreground tracking-wide'>
                        BASE TRADE
                    </p>
                </div>
                <div className='text-trade-green ml-auto font-medium text-base w-[4rem]'>
                    100%
                </div>
                <div className='ml-auto text-trade-red font-medium text-base w-[5rem]'>
                    +$1,999.00
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='grid gap-1'>
                    <p className='text-top text-apex-light-yellow font-medium leading-none w-[13rem]'>
                        QQQ 444P 10/4
                    </p>
                    <p className='italic text-sm text-foreground tracking-wide'>
                        BASE TRADE
                    </p>
                </div>
                <div className='text-trade-green ml-auto font-medium text-base w-[4rem]'>
                    100%
                </div>
                <div className='ml-auto text-trade-red font-medium text-base w-[5rem]'>
                    +$39.00
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='grid gap-1'>
                    <p className='text-top text-apex-light-yellow font-medium leading-none w-[13rem]'>
                        TSLA 275C 10/4
                    </p>
                    <p className='italic text-sm text-foreground tracking-wide'>
                        BASE TRADE
                    </p>
                </div>
                <div className='text-trade-green ml-auto font-medium text-base w-[4rem]'>
                    100%
                </div>
                <div className='ml-auto text-trade-red font-medium text-base w-[5rem]'>
                    +$39.00
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='grid gap-1'>
                    <p className='text-top text-apex-light-yellow font-medium leading-none w-[13rem]'>
                        SPY 575P 10/4
                    </p>
                    <p className='italic text-sm text-foreground tracking-wide'>
                        BASE TRADE
                    </p>
                </div>
                <div className='text-trade-green ml-auto font-medium text-base w-[4rem]'>
                    100%
                </div>
                <div className='ml-auto text-trade-red font-medium text-base w-[5rem]'>
                    +$39.00
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='grid gap-1'>
                    <p className='text-top text-apex-light-yellow font-medium leading-none w-[13rem]'>
                        GOOGL 500C 10/4
                    </p>
                    <p className='italic text-sm text-foreground tracking-wide'>
                        BASE TRADE
                    </p>
                </div>
                <div className='text-trade-green ml-auto font-medium text-base w-[4rem]'>
                    100%
                </div>
                <div className='ml-auto text-trade-red font-medium text-base w-[5rem]'>
                    +$299.00
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='grid gap-1'>
                    <p className='text-top text-apex-light-yellow font-medium leading-none w-[13rem]'>
                        GOOGL 500C 10/4
                    </p>
                    <p className='italic text-sm text-foreground tracking-wide'>
                        BASE TRADE
                    </p>
                </div>
                <div className='text-trade-green ml-auto font-medium text-base w-[4rem]'>
                    100%
                </div>
                <div className='ml-auto text-trade-red font-medium text-base w-[5rem]'>
                    +$299.00
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='grid gap-1'>
                    <p className='text-top text-apex-light-yellow font-medium leading-none w-[13rem]'>
                        GOOGL 500C 10/4
                    </p>
                    <p className='italic text-sm text-foreground tracking-wide'>
                        BASE TRADE
                    </p>
                </div>
                <div className='text-trade-green ml-auto font-medium text-base w-[4rem]'>
                    100%
                </div>
                <div className='ml-auto text-trade-red font-medium text-base w-[5rem]'>
                    +$299.00
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='grid gap-1'>
                    <p className='text-top text-apex-light-yellow font-medium leading-none w-[13rem]'>
                        AAPL 305P 10/4
                    </p>
                    <p className='italic text-sm text-foreground tracking-wide'>
                        BASE TRADE
                    </p>
                </div>
                <div className='text-trade-green ml-auto font-medium text-base w-[4rem]'>
                    100%
                </div>
                <div className='ml-auto text-trade-red font-medium text-base w-[5rem]'>
                    +$99.00
                </div>
            </div>
        </CardContent>
    );
};

export default LatestTrades;
