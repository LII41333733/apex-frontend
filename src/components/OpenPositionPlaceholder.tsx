import { useAppSelector } from "@/state/hooks";
import PriceBar from "./PriceBar";
import Trade from "@/interfaces/Trade";
import convertTickerWithExpiration from "@/utils/convertTickerWithExpiration";
import PositionPl from "./PositionPl";
import StatusBadge from "./StatusBadge";
import BaseTrade from "@/interfaces/BaseTrade";
import { BaseTradeStatus } from "@/constants";
import float from "@/utils/float";

const OpenPositionPlaceholder: React.FC = () => {
  const {
    tradeSummary: { baseTrades },
  } = useAppSelector((state) => state.trades);

  const allTrades: [string, BaseTrade][] = Object.entries(baseTrades.allTrades);

  return allTrades.map(([stringId, trade]) => {
    const symbolLabel: string = convertTickerWithExpiration(trade.optionSymbol);

    if (trade.status === BaseTradeStatus.REJECTED) {
      return <div key={trade.id}></div>;
    }

    return (
      <div className="position-container" key={trade.id}>
        <div className="position mb-0">
          <div className="text-column column">
            <div className="text-top">{symbolLabel}</div>
            <div className="text-bottom text-xs">
              <span className="text-bottom-label font-normal">Cons</span>
              <span className="text-bottom-value mx-1">{trade.quantity}</span>
              <span className="text-bottom-label font-normal">Avg</span>
              <span className="text-bottom-value mx-1">
                {float(trade.fillPrice)}
              </span>
              <span className="text-bottom-label font-normal">Last</span>
              <span className="text-bottom-value ml-1">
                {float(trade.lastPrice)}
              </span>
            </div>
          </div>
          <PositionPl
            quantity={trade.quantity}
            price={trade.fillPrice}
            last={trade.lastPrice}
          />
        </div>
        <div className="risk-type mb-2 px-2">
          <span>BASE TRADE</span>
          <span className="position-status">
            <StatusBadge status={trade.status} />
          </span>
        </div>
        <PriceBar trade={trade} />
        <div className="order-actions mt-3 pr-4"></div>
      </div>
    );
  });
};

export default OpenPositionPlaceholder;
