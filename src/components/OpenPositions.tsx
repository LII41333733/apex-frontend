import { useAppSelector } from "@/state/hooks";
import PriceBar from "./PriceBar";
import convertTickerWithExpiration from "@/utils/convertTickerWithExpiration";
import PositionPl from "./PositionPl";
import StatusBadge from "./StatusBadge";
import { TradeStatus } from "@/constants";
import float from "@/utils/float";
import { getAllTrades } from "@/state/tradeSlice";
import React from "react";

const OpenPositions: React.FC = () => {
  const allTrades = useAppSelector((state) => getAllTrades(state.trades));
  const [showButtonsId, setShowButtonsId] = React.useState<string>("");
  const [confirmSellId, setConfirmSellId] = React.useState<string>("");

  return (
    <>
      {!allTrades.length && (
        <p className="text-sm font-normal mb-3 text-center">
          No orders available
        </p>
      )}
      <div className="position-body md:flex p-4">
        {allTrades.reverse().map(([id, trade], i) => {
          const showButtons = showButtonsId === id;
          const showSellConfirm = confirmSellId === id;
          const symbolLabel: string = convertTickerWithExpiration(
            trade.optionSymbol
          );

          if (trade.status === TradeStatus.REJECTED) {
            return <div key={trade.id}></div>;
          }

          // showButtons, showSellConfirm, symbolLabel, trade, setShowButtonsId

          return (
            <div
              className="position-container card m-auto mb-2"
              key={id}
              style={{
                position: "relative",
                zIndex: allTrades.length - i, // Dynamic z-index: highest for the first card
              }}
            >
              <div className="position mb-0">
                <div className="text-column column">
                  <div
                    onClick={(e) => {
                      const target = e?.target as HTMLSpanElement;
                      if (target?.role !== "slider") {
                        if (showButtons) {
                          setShowButtonsId("");
                        } else {
                          setShowButtonsId(id);
                        }
                      }
                    }}
                    className="text-top text-apex-light-yellow"
                  >
                    {symbolLabel}
                  </div>
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
                <StatusBadge status={trade.status} />
              </div>
              <PriceBar
                trade={trade}
                showButtons={showButtons}
                showSellConfirm={showSellConfirm}
                setConfirmSellId={setConfirmSellId}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OpenPositions;
