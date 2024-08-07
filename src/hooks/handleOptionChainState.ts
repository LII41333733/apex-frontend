import { LiveOption } from "@/interfaces/LiveOption";
import startOptionChainStream from "@/service/startOptionChainStream";
import React from "react";

export default () => {
  const [quotesMap, setQuotesMap] = React.useState(() => new Map());
  const [quotePrices, setQuotesPrices] = React.useState(() => new Map());
  const [selectedSymbol, setSelectedSymbol] = React.useState<string>("");

  // Function to update the Map
  const updateQuote = (symbol: string, newQuote: LiveOption | null) => {
    setQuotesMap((prevQuotesMap) => {
      const updatedMap = new Map(prevQuotesMap);
      updatedMap.set(symbol, newQuote);
      return updatedMap;
    });
  };

  const updateQuotePrices = (
    symbol: string,
    newPrice: number | null,
    isFromOnMessage: boolean
  ) => {
    setQuotesPrices((prevQuotesPrices) => {
      const updatedPrices = new Map(prevQuotesPrices);

      if (isFromOnMessage) {
        const currentValue = updatedPrices.get(symbol);
        if (currentValue === null) {
          updatedPrices.set(symbol, newPrice);
        }
      } else {
        updatedPrices.set(symbol, newPrice);
      }

      return updatedPrices;
    });
  };

  const setTemplate = (data: string[]) => {
    setQuotesMap(new Map());
    setQuotesPrices(new Map());

    data.forEach((symbol) => {
      updateQuote(symbol, null);
      updateQuotePrices(symbol, null, false);
    });

    startOptionChainStream();
  };

  return {
    setTemplate,
    quotesMap,
    quotePrices,
    updateQuote,
    updateQuotePrices,
    selectedSymbol,
    setSelectedSymbol,
  };
};
