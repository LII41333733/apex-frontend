import Trade from '@/types/Trade';
import { getPercentDelta } from './getPercentDelta';

export function getPercentDeltaFromTrade(trade: Trade) {
    return getPercentDelta(
        trade.fillPrice,
        Math.max(
            trade.stopPriceFinal,
            'trim1PriceFinal' in trade ? trade.trim1PriceFinal : 0,
            'trim2PriceFinal' in trade ? trade.trim2PriceFinal : 0
        )
    );
}
