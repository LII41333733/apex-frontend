import { useAppSelector } from "@/state/hooks";
import PriceBar from "./PriceBar";
import convertTickerWithExpiration from "@/utils/convertTickerWithExpiration";
import PositionPl from "./PositionPl";
import StatusBadge from "./StatusBadge";
import { TradeStatus } from "@/constants";
import float from "@/utils/float";
import { getAllTrades } from "@/state/tradeSlice";

const OpenPositions: React.FC = () => {
  const allTrades = useAppSelector((state) => getAllTrades(state.trades));

  return (
    <>
      <p className="text-sm font-normal mb-3">{`Open Positions (${allTrades.length})`}</p>
      {allTrades.reverse().map(([id, trade]) => {
        console.log(trade);
        const symbolLabel: string = convertTickerWithExpiration(
          trade.optionSymbol
        );

        if (trade.status === TradeStatus.REJECTED) {
          return <div key={trade.id}></div>;
        }

        return (
          <div className="position-container" key={id}>
            <div className="position mb-0">
              <div className="text-column column">
                <div className="text-top">{symbolLabel}</div>
                <div className="text-bottom text-xs">
                  <span className="text-bottom-label font-normal">Cons</span>
                  <span className="text-bottom-value mx-1">
                    {trade.quantity}
                  </span>
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
              <PositionPl trade={trade} />
            </div>
            <div className="risk-type mb-2 px-2">
              <span>{`${trade.riskType} TRADE`}</span>
              <span className="position-status">
                <StatusBadge status={trade.status} />
              </span>
            </div>
            <PriceBar trade={trade} />
          </div>
        );
      })}
    </>
  );
};

export default OpenPositions;
