import { TradeStatus } from '@/constants';
import Trade from '@/types/Trade';
import convertTickerWithExpiration from '@/utils/convertTickerWithExpiration';
import float from '@/utils/float';
import React, { MutableRefObject } from 'react';
import PositionPl from './PositionPl';
import StatusBadge from './StatusBadge';
import PriceBar from './PriceBar';

type TradeCard = {
    trade: Trade;
    setConfirmSellId?: (num: number) => void;
    setShowButtonsId?: (num: number) => void;
    showButtonsId?: number;
    confirmSellId?: number;
    zIndex?: number;
    isVisionChart?: boolean;
    openDemo?: boolean;
};

const TradeCard: React.FC<TradeCard> = ({
    trade,
    confirmSellId,
    setConfirmSellId,
    setShowButtonsId,
    showButtonsId,
    zIndex,
    isVisionChart,
    openDemo,
}) => {
    const id = Number(trade.id);
    const showButtons = openDemo || showButtonsId === trade.id;
    const showSellConfirm = confirmSellId === id;
    const symbolLabel: string = convertTickerWithExpiration(trade.optionSymbol);
    const [demoTrade, setDemoTrade] = React.useState<Trade>({
        ...trade,
        lastPrice: trade.fillPrice,
    });

    if (trade.status === TradeStatus.REJECTED) {
        return <div key={trade.id}></div>;
    }

    return (
        <div
            className="position-container md:mx-3"
            key={id}
            style={{
                position: 'relative',
                zIndex,
            }}
        >
            <div className="position mb-0">
                <div className="text-column column">
                    <div
                        onClick={(e) => {
                            const target = e?.target as HTMLSpanElement;
                            if (target?.role !== 'slider') {
                                if (showButtons) {
                                    setShowButtonsId(0);
                                } else {
                                    setShowButtonsId(id);
                                }
                            }
                        }}
                        className="text-top text-apex-light-yellow"
                    >
                        {symbolLabel}
                    </div>
                    <div className="text-bottom text-xs">
                        <span className="text-bottom-label text-xs">Cons</span>
                        <span className="text-bottom-value mx-1">
                            {trade.quantity}
                        </span>
                        <span className="text-bottom-label text-xs">Avg</span>
                        <span className="text-bottom-value mx-1">
                            {float(trade.fillPrice)}
                        </span>
                        <span className="text-bottom-label text-xs">Stop</span>
                        <span className="text-bottom-value ml-1">
                            {float(trade.stopPrice)}
                        </span>
                    </div>
                </div>
                <PositionPl trade={trade} />
            </div>
            <div className="risk-type mb-3 mt-2">
                <span className="text-foreground">{`${trade.riskType.toUpperCase()} TRADE`}</span>
                <StatusBadge status={trade.status} />
            </div>
            <PriceBar
                trade={openDemo ? demoTrade : trade}
                showButtons={showButtons}
                showSellConfirm={showSellConfirm}
                setConfirmSellId={setConfirmSellId}
                isVisionChart={isVisionChart}
                openDemo
                setDemoTrade={setDemoTrade}
            />
        </div>
    );
};

export default TradeCard;
