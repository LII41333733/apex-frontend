import Quote from '@/interfaces/Quote';
import React from 'react';

export default () => {
    const [quotesMap, setQuotesMap] = React.useState(() => new Map());
    const [quotePrices, setQuotesPrices] = React.useState(() => new Map());

    const updateQuote = (symbol: string, newQuote: Quote) => {
        setQuotesMap((prevQuotesMap) => {
            const updatedMap = new Map(prevQuotesMap);
            updatedMap.set(symbol, {
                ...prevQuotesMap.get(symbol),
                ...newQuote,
                strike:
                    newQuote.strike ??
                    prevQuotesMap.get(symbol)?.strike ??
                    null,
            });
            return updatedMap;
        });
    };

    const updateQuotePrices = (symbol: string, newPrice: number) => {
        setQuotesPrices((prevQuotesPrices) => {
            const updatedPrices = new Map(prevQuotesPrices);
            updatedPrices.set(symbol, newPrice);
            return updatedPrices;
        });
    };

    const setInitialOptionsChain = (dataList: Quote[]) => {
        setQuotesMap(new Map());
        setQuotesPrices(new Map());

        dataList.forEach((data) => {
            updateQuote(data.symbol, data);
            updateQuotePrices(data.symbol, data.ask);
        });
    };

    return {
        setInitialOptionsChain,
        quotesMap,
        quotePrices,
        updateQuote,
        updateQuotePrices,
    };
};
