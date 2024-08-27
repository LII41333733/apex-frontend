import { LiveOptionOptional } from "@/types/LiveOptionOptional";
import { LiveOptionPriceOptional } from "@/types/LiveOptionPriceOptional";
import { TradeRequest } from "@/types/TradeRequest";

export interface OptionsChainProps {
  activeSymbol: string;
  quotesMap: LiveOptionOptional;
  quotePrices: LiveOptionPriceOptional;
  updateQuotePrices: (
    symbol: string,
    newPrice: number,
    isFromOnMessage: boolean
  ) => void;
  handlePlaceTrade: TradeRequest;
}
