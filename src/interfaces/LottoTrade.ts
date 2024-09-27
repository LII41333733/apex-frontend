import { TradeStatus, RiskType } from "@/constants";
import Trade from "./Trade";

export default interface LottoTrade extends Trade {
  riskType: RiskType.LOTTO;
  trim1Price: number;
  trim1Quantity: number;
  trim2Price: number;
  trim2Quantity: number;
  runnersQuantity: number;
  runnersFloorPrice: number;
  runnersDelta: number;
  stopPrice: number;
  trimStatus: number;
  status: TradeStatus;
}
