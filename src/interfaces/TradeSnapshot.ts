import { RiskType } from "@/constants";
import { Trade } from "@/types/Trade";

export interface TradeSnapshot<T extends Trade> {
  symbol: string;
  riskType: RiskType;
}
