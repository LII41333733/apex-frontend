import { OrderDataStatuses } from "@/constants";

export default interface Trade {
  orderId: number;
  balance?: number;
  option: string;
  symbol: string;
  status: string | OrderDataStatuses;
  lossId?: number;
  lossStreak: 0;
  stopPrice: number;
  limitPrice: number;
  fillPrice: number;
  openDate: string;
  closeDate: string;
  tradeResult?: "W" | "L";
  maxPrice?: number;
  quantity: number;
  recoveryId?: number;
  pl?: number;
  wins: number;
  losses: number;
  tradeAmount: number;
  finalized: false;
}
