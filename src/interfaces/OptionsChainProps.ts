import { LiveOptionOptional } from "@/types/LiveOptionOptional";
import { LiveOptionPriceOptional } from "@/types/LiveOptionPriceOptional";

export interface OptionsChainProps {
  activeSymbol: string;
  quotesMap: LiveOptionOptional;
  quotePrices: LiveOptionPriceOptional;
  updateQuotePrices: (
    symbol: string,
    newPrice: number,
    isFromOnMessage: boolean
  ) => void;
}
