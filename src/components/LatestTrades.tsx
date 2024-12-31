import React from 'react';
import { CardContent, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/state/hooks';
import { getPercentDelta } from '@/utils/getPercentDelta';
import convertTickerWithExpiration from '@/utils/convertTickerWithExpiration';
import Trade from '@/interfaces/Trade';
import float from '@/utils/float';
import getValuesLibData from '@/utils/getValuesLibData';
import { dollar } from '@/utils/dollar';
import MiniPriceBar from './MiniPriceBar';

const LatestTrades: React.FC = () => {
    const last20Trades = useAppSelector((state) => state.trades.last20Trades);
    const last10Trades = last20Trades.slice(-10).reverse();

    return (
        <CardContent className="mt-1 pr-4">
            <div className="flex items-center mt-3 mb-2">
                <div className="gap-0 w-[13rem]">
                    <CardTitle className="text-md">Latest Trades</CardTitle>
                </div>
            </div>
            <div className="grid grid-cols-9 gap-y-2.5 items-center">
                {last10Trades.map((trade: Trade) => {
                    const maxPrice = Math.max(
                        trade.stopPriceFinal,
                        'trim1PriceFinal' in trade
                            ? Number(trade.trim1PriceFinal)
                            : 0,
                        'trim2PriceFinal' in trade
                            ? Number(trade.trim2PriceFinal)
                            : 0
                    );
                    const percent = float(
                        getPercentDelta(trade.fillPrice, maxPrice)
                    );

                    const percentData = getValuesLibData(percent);
                    const plData = getValuesLibData(trade.pl);

                    return (
                        <React.Fragment key={trade.id}>
                            <div className="col-span-3 grid gap-y-0.5">
                                <p className="text-top text-apex-light-yellow font-medium w-[13rem] text-base">
                                    {convertTickerWithExpiration(
                                        trade.optionSymbol
                                    )}
                                </p>
                                <p className="italic text-xs text-foreground tracking-wide">
                                    {`${trade.riskType.toUpperCase()} TRADE`}
                                </p>
                            </div>
                            <div className="col-span-4 ml-1">
                                <MiniPriceBar
                                    trade={trade}
                                    maxPrice={maxPrice}
                                />
                            </div>
                            <div className="col-span-2 pl-12 grid gap-y-0.5">
                                <div
                                    className={`${percentData.textColor} font-medium text-sm`}
                                >
                                    {Number(percent) > 0
                                        ? percent
                                        : Math.abs(Number(percent))}
                                    %
                                </div>
                                <div
                                    className={`${plData.textColor} font-medium text-sm`}
                                >
                                    {dollar(Math.abs(trade.pl))}
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </CardContent>
    );
};

export default LatestTrades;
