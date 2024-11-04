import { TradeStatus, ValuesLibData } from '@/constants';
import Trade from '@/types/Trade';
import getValuesLibData from '@/utils/getValuesLibData';

const PositionPl: React.FC<{
    trade: Trade;
}> = ({
    trade: { quantity, fillPrice, lastPrice, pl, tradeAmount, status },
}) => {
    const displayDefault =
        status === TradeStatus.PENDING ||
        status === TradeStatus.CANCELED ||
        status === TradeStatus.REJECTED;

    const buyPrice = fillPrice * 100;
    const currentPrice = lastPrice * 100;
    const dollarDiff = displayDefault
        ? 0
        : pl === 0
          ? (currentPrice - buyPrice) * quantity
          : pl;
    const percDiff = displayDefault
        ? 0
        : pl === 0
          ? ((currentPrice - buyPrice) / buyPrice) * 100
          : (pl / tradeAmount) * 100;
    const lib: ValuesLibData = getValuesLibData(dollarDiff);

    return (
        <>
            <div className={`pl-column column ${lib.textColor}`}>{`${
                lib.operator
            }$${Math.abs(dollarDiff).toFixed(2)}`}</div>
            <div className={`perc-column column ${lib.textColor}`}>{`${
                lib.operator
            }${Math.abs(percDiff).toFixed(2)}%`}</div>
        </>
    );
};

export default PositionPl;
