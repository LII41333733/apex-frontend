import { Progress } from '@/components/ui/progress';
import float from '@/utils/float';
import { Slider } from '@/components/ui/slider';

import {
    useCancelTradeMutation,
    useModifyTradeMutation,
    useSellTradeMutation,
} from '@/state/api/apex';
import React from 'react';
import { TradeLeg, TradeStatus } from '@/constants';
import { Badge } from './ui/badge';
import Trade from '@/types/Trade';
import CircleCheck from './priceBar/circleCheck';
import CircleCheckFilled from './priceBar/CircleCheckFilled';
import { useToast } from './ui/use-toast';
import sendToast from '@/utils/sendToast';

function calculatePercentagePositions(values: {
    stop: number;
    fill: number;
    last: number;
    runnerLimit: number;
    max: number;
    trim1: number;
    trim2: number;
}) {
    const { stop, fill, last, trim1, trim2, runnerLimit, max } = values;

    const rangeStartValue = Math.min(...Object.values(values));
    const rangeEndValue = Math.max(...Object.values(values));

    const buffer = (rangeEndValue - rangeStartValue) * 0.08;
    const rangeStart = rangeStartValue - buffer;
    const rangeEnd = rangeEndValue + buffer;
    const totalRange = rangeEnd - rangeStart;

    function calculatePercentage(value: number) {
        return ((value - rangeStart) / totalRange) * 100;
    }

    return {
        rangeStart: calculatePercentage(rangeStart),
        rangeEnd: calculatePercentage(rangeEnd),
        stop: calculatePercentage(stop),
        fill: calculatePercentage(fill),
        last: calculatePercentage(last),
        trim1: calculatePercentage(trim1),
        trim2: calculatePercentage(trim2 ?? 0),
        runnerLimit: calculatePercentage(runnerLimit),
        max: calculatePercentage(max),
    };
}

const PriceBar: React.FC<{
    trade: Trade;
    showButtons: boolean;
    showSellConfirm: boolean;
    setConfirmSellId: (id: number) => void;
    isVisionChart?: boolean;
}> = ({
    trade,
    showButtons,
    showSellConfirm,
    setConfirmSellId,
    isVisionChart,
}) => {
    const { toast } = useToast();
    const [modifyTrade] = useModifyTradeMutation();
    const [cancelTrade] = useCancelTradeMutation();
    const [sellTrade] = useSellTradeMutation();

    const hasTrim1 = 'trim1Price' in trade;
    const hasTrim2 = 'trim2Price' in trade;

    const values = {
        stop: trade.stopPrice,
        fill: trade.fillPrice,
        last: trade.lastPrice,
        runnerLimit: trade.fillPrice * 2,
        max: isVisionChart ? trade.fillPrice * 2 : trade.maxPrice,
        trim1: hasTrim1 ? trade.trim1Price : trade.fillPrice,
        trim2: hasTrim2 ? trade.trim2Price : trade.fillPrice,
    };

    const status: TradeStatus = trade.status;
    const isPending = status === TradeStatus.PENDING;
    const rangeStartValue = Math.min(...Object.values(values));
    const rangeEndValue = Math.max(...Object.values(values));
    const buffer = (rangeEndValue - rangeStartValue) * 0.119;
    const rangeStart = rangeStartValue - buffer;
    const rangeEnd = rangeEndValue + buffer;
    const percentagePositions = calculatePercentagePositions(values);
    const [sliderValue, setSliderValue] = React.useState<number>(
        Math.ceil(((rangeStart + rangeEnd) / 2) * 100) / 100
    );
    const lastMaxDelta = Math.abs(
        percentagePositions.last - percentagePositions.max
    );
    const lastStopDelta = Math.abs(
        percentagePositions.last - percentagePositions.stop
    );
    const modifier = 6;
    const displayMax = lastMaxDelta > modifier;
    const displayStop = lastStopDelta > modifier;

    return (
        <>
            <div className="price-bar-wrapper">
                <Progress
                    value={percentagePositions.last}
                    className="price-bar w-[100%]"
                />
                <section>
                    <div
                        className="price-bar-stop"
                        style={{ left: `${percentagePositions.stop}%` }}
                    ></div>
                    {displayStop && (
                        <>
                            <div
                                className="text-xxs price-bar-label-top absolute top-[-8%] above"
                                style={{ left: `${percentagePositions.stop}%` }}
                            >
                                {`Stop`}
                            </div>
                            <div
                                className="text-apex-light-yellow text-xxs price-bar-label-bottom above absolute top-[11%]"
                                style={{ left: `${percentagePositions.stop}%` }}
                            >
                                {`${float(values.stop)}`}
                            </div>
                        </>
                    )}
                </section>
                <section>
                    <div
                        className="price-bar-last"
                        style={{ left: `${percentagePositions.last}%` }}
                    ></div>
                    <div
                        className="text-xxs price-bar-label-top absolute top-[-8%] above"
                        style={{ left: `${percentagePositions.last}%` }}
                    >
                        {`Last`}
                    </div>
                    <div
                        className="text-apex-light-yellow text-xxs price-bar-label-bottom above absolute top-[11%]"
                        style={{ left: `${percentagePositions.last}%` }}
                    >
                        {`${float(values.last)}`}
                    </div>
                </section>
                <section>
                    <div
                        className="price-bar-fill"
                        style={{ left: `${percentagePositions.fill}%` }}
                    ></div>
                    <div
                        className="text-xxs price-bar-label-top absolute top-[70%]"
                        style={{ left: `${percentagePositions.fill}%` }}
                    >
                        {`Fill`}
                    </div>
                    <div
                        className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                        style={{ left: `${percentagePositions.fill}%` }}
                    >
                        {`${float(values.fill)}`}
                    </div>
                </section>
                {!isVisionChart && (
                    <section>
                        <div
                            className="price-bar-max"
                            style={{ left: `${percentagePositions.max}%` }}
                        ></div>
                        {displayMax && (
                            <>
                                <div
                                    className="text-xxs price-bar-label-top absolute top-[-8%] above"
                                    style={{
                                        left: `${percentagePositions.max}%`,
                                    }}
                                >
                                    {`Max`}
                                </div>
                                <div
                                    className="text-apex-light-yellow text-xxs price-bar-label-bottom above absolute top-[11%]"
                                    style={{
                                        left: `${percentagePositions.max}%`,
                                    }}
                                >
                                    {`${float(values.max)}`}
                                </div>
                            </>
                        )}
                    </section>
                )}
                {'trim1Price' in trade && (
                    <section>
                        <div
                            className="price-bar-trim1"
                            style={{ left: `${percentagePositions.trim1}%` }}
                        ></div>
                        <div
                            className="text-xxs price-bar-label-top absolute top-[70%]"
                            style={{ left: `${percentagePositions.trim1}%` }}
                        >
                            {`Trim 1`}
                        </div>
                        <div
                            className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                            style={{ left: `${percentagePositions.trim1}%` }}
                        >
                            {`${float(values.trim1)}`}
                        </div>
                        <div
                            className="price-bar-icon"
                            style={{
                                left: `${percentagePositions.trim1 - 1.1}%`,
                            }}
                        >
                            {trade.trimStatus < 1 ? (
                                <CircleCheck />
                            ) : (
                                <CircleCheckFilled />
                            )}
                        </div>
                    </section>
                )}
                {'trim2Price' in trade && (
                    <section>
                        <div
                            className="price-bar-trim2"
                            style={{ left: `${percentagePositions.trim2}%` }}
                        ></div>
                        <div
                            className="text-xxs price-bar-label-top absolute top-[70%]"
                            style={{ left: `${percentagePositions.trim2}%` }}
                        >
                            {`Trim 2`}
                        </div>
                        <div
                            className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                            style={{ left: `${percentagePositions.trim2}%` }}
                        >
                            {`${float(values.trim2)}`}
                        </div>
                        <div
                            className="price-bar-icon"
                            style={{
                                left: `${percentagePositions.trim2 - 1.1}%`,
                            }}
                        >
                            {trade.trimStatus < 2 ? (
                                <CircleCheck />
                            ) : (
                                <CircleCheckFilled />
                            )}
                        </div>
                    </section>
                )}
                {!isVisionChart && (
                    <section>
                        <div
                            className="price-bar-runner-limit"
                            style={{
                                left: `${percentagePositions.runnerLimit}%`,
                            }}
                        ></div>
                        <div
                            className="text-xxs price-bar-label-top absolute top-[70%]"
                            style={{
                                left: `${percentagePositions.runnerLimit}%`,
                            }}
                        >
                            {`100%`}
                        </div>
                        <div
                            className="text-apex-light-yellow text-xxs price-bar-label-bottom absolute top-[88%]"
                            style={{
                                left: `${percentagePositions.runnerLimit}%`,
                            }}
                        >
                            {`${float(values.runnerLimit)}`}
                        </div>
                    </section>
                )}
            </div>
            {showButtons && (
                <>
                    <div className="order-actions-container top-3">
                        <p className="text-center mt-1 mb-2 text-sm relative z-20">
                            {sliderValue.toFixed(2)}
                        </p>
                        <Slider
                            className="price-slider w-[360px] m-auto mb-6 relative -left-0"
                            min={rangeStart}
                            max={rangeEnd}
                            step={0.01}
                            value={[sliderValue]}
                            onValueChange={(e) => setSliderValue(e[0])}
                        />
                        <div className="order-actions-buttons">
                            {showSellConfirm ? (
                                <>
                                    <p className="text-xs mr-3">
                                        Sell position?
                                    </p>
                                    <Badge
                                        onClick={async () => {
                                            await sellTrade({
                                                id: trade.id,
                                                riskType: trade.riskType
                                                    .toString()
                                                    .toUpperCase(),
                                            });
                                        }}
                                        className="bg-background rounded badge apex-button text-xs text-foreground w-[90px] symbol-badge mx-1 sell"
                                        variant="outline"
                                    >
                                        Yes
                                    </Badge>
                                    <Badge
                                        onClick={() => setConfirmSellId(0)}
                                        className="bg-background rounded badge apex-button text-xs text-foreground w-[90px] symbol-badge mx-1 sell"
                                        variant="outline"
                                    >
                                        No
                                    </Badge>
                                </>
                            ) : (
                                <>
                                    <Badge
                                        onClick={async () => {
                                            await modifyTrade({
                                                id: trade.id,
                                                tradeLeg: TradeLeg.STOP,
                                                price: sliderValue,
                                                riskType: trade.riskType,
                                            });
                                        }}
                                        className="bg-background rounded badge apex-button text-xs text-foreground w-[90px] symbol-badge mx-1"
                                        variant="outline"
                                    >
                                        Modify Stop
                                    </Badge>
                                    <Badge
                                        onClick={async () => {
                                            const res = await modifyTrade({
                                                id: trade.id,
                                                tradeLeg: TradeLeg.TRIM1,
                                                price: sliderValue,
                                                riskType: trade.riskType,
                                            });

                                            sendToast();
                                        }}
                                        className="bg-background rounded badge apex-button text-xs text-foreground w-[90px] symbol-badge mx-1"
                                        variant="outline"
                                    >
                                        Modify Trim 1
                                    </Badge>
                                    {hasTrim2 && (
                                        <Badge
                                            onClick={async () => {
                                                await modifyTrade({
                                                    id: trade.id,
                                                    tradeLeg: TradeLeg.TRIM2,
                                                    price: sliderValue,
                                                    riskType: trade.riskType,
                                                });
                                            }}
                                            className="bg-background rounded badge apex-button text-xs text-foreground w-[90px] symbol-badge mx-1"
                                            variant="outline"
                                        >
                                            Modify Trim 2
                                        </Badge>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="order-actions-buttons">
                            <Badge
                                onClick={async () => setConfirmSellId(trade.id)}
                                className="bg-background rounded badge apex-button text-xs text-foreground w-[90px] symbol-badge mx-1"
                                variant="outline"
                            >
                                Market Sell
                            </Badge>
                            {isPending && (
                                <Badge
                                    onClick={async () => {
                                        await cancelTrade({
                                            id: trade.fillOrderId,
                                        });
                                    }}
                                    className="bg-background rounded badge apex-button text-xs text-foreground w-[90px] symbol-badge mx-1"
                                    variant="outline"
                                >
                                    Cancel Trade
                                </Badge>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PriceBar;
