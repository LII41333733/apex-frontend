import Trade from '@/interfaces/Trade';

export function getMaxPercentFromTrims(trade: Trade) {
    const trim1Price = 'trim1Price' in trade ? trade.trim1Price : 0;
    const trim2Price = 'trim2Price' in trade ? trade.trim2Price : 0;
    const stopPriceFinal = 'stopPriceFinal' in trade ? trade.stopPriceFinal : 0;
    const trim1Price = 'trim1Price' in trade ? trade.trim1Price : 0;
}
