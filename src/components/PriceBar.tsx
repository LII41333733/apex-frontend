import { useAppSelector } from "@/state/hooks";
import { Progress } from "@/components/ui/progress";
import float from "@/utils/float";
import BaseTrade from "@/interfaces/BaseTrade";
import LottoTrade from "@/interfaces/LottoTrade";
import { Slider } from "@/components/ui/slider";

import { Trade } from "@/types/Trade";
import {
  useCancelTradeMutation,
  useModifyTradeMutation,
  useSellTradeMutation,
} from "@/state/api/apex";
import { Button } from "./ui/button";
import React from "react";
import { RiskType, TradeLeg, TradeStatus } from "@/constants";
import { Badge } from "./ui/badge";
import { primary } from "@/utils/colors";

const CircleCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-circle-check circle-check"
    width="22"
    height="22"
    viewBox="0 0 24 24.9"
    strokeWidth="1.5"
    stroke={primary()}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M10 0h12v19H0z" fill="#0c0a09" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 12l2 2l4 -4" />
  </svg>
);

const CircleCheckFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-circle-check-filled circle-check"
    width="22"
    height="22"
    viewBox="0 0 24 24.9"
    strokeWidth="1.5"
    stroke={primary()}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" fill="#0c0a09" />
    <path
      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
      stroke-width="0"
      fill={primary()}
    />
  </svg>
);

function calculatePercentagePositions(values: {
  stop: number;
  fill: number;
  last: number;
  trim1: number;
  trim2?: number;
  runnerLimit: number;
  max: number;
}) {
  const { stop, fill, last, trim1, trim2, runnerLimit, max } = values;

  const rangeStartValue = Math.min(...Object.values(values));
  const rangeEndValue = Math.max(...Object.values(values));

  const buffer = (rangeEndValue - rangeStartValue) * 0.12;
  const rangeStart = rangeStartValue - buffer;
  const rangeEnd = rangeEndValue + buffer;
  const totalRange = rangeEnd - rangeStart;

  function calculatePercentage(value: number) {
    return ((value - rangeStart) / totalRange) * 100;
  }

  return {
    rangeStart: calculatePercentage(rangeStart),
    rangeEnd: calculatePercentage(rangeEnd),
    stop: calculatePercentage(stop),
    fill: calculatePercentage(fill),
    last: calculatePercentage(last),
    trim1: calculatePercentage(trim1),
    trim2: calculatePercentage(trim2 ?? 0),
    runnerLimit: calculatePercentage(runnerLimit),
    max: calculatePercentage(max),
  };
}

const PriceBar: React.FC<{
  trade: Trade;
  showButtons: boolean;
  showSellConfirm: boolean;
  setConfirmSellId: (id: string) => void;
}> = ({ trade, showButtons, showSellConfirm, setConfirmSellId }) => {
  const [modifyTrade] = useModifyTradeMutation();
  const [cancelTrade] = useCancelTradeMutation();
  const [sellTrade] = useSellTradeMutation();

  const valuesWithoutTrim2 = {
    stop: trade.stopPrice,
    fill: trade.fillPrice,
    last: trade.lastPrice,
    trim1: trade.trim1Price,
    runnerLimit: trade.fillPrice * 2,
    max: trade.maxPrice,
  };

  const valuesWithTrim2 = {
    ...valuesWithoutTrim2,
    trim2: trade.trim2Price,
  };

  const hasTrim2 = trade.trim2Price;
  const values = hasTrim2 ? valuesWithTrim2 : valuesWithoutTrim2;
  console.log(values);

  const status: TradeStatus = trade.status;
  const isPending = status === TradeStatus.PENDING;
  const isOpen = status === TradeStatus.OPEN || status === TradeStatus.RUNNERS;
  const maxDistance = values.fill > 1 ? 0.4 : 0.04;
  const rangeStartValue = Math.min(...Object.values(values));
  const rangeEndValue = Math.max(...Object.values(values));
  const buffer = (rangeEndValue - rangeStartValue) * 0.119;
  const rangeStart = rangeStartValue - buffer;
  const rangeEnd = rangeEndValue + buffer;
  const percentagePositions = calculatePercentagePositions(values);
  const lastRange = [values.last - maxDistance, values.last + maxDistance];
  const [sliderValue, setSliderValue] = React.useState<number>(
    Math.ceil(((rangeStart + rangeEnd) / 2) * 100) / 100
  );
  const lastMaxDelta = Math.abs(
    percentagePositions.last - percentagePositions.max
  );
  const lastStopDelta = Math.abs(
    percentagePositions.last - percentagePositions.stop
  );
  const modifier = 6;
  const displayMax = lastMaxDelta > modifier;
  const displayStop = lastStopDelta > modifier;

  return (
    <>
      <div className="price-bar-wrapper">
        <Progress
          value={percentagePositions.last}
          className="price-bar w-[100%]"
        />
        <section>
          <div
            className="price-bar-stop"
            style={{ left: `${percentagePositions.stop}%` }}
          ></div>
          {displayStop && (
            <>
              <div
                className="text-xxs price-bar-label-top absolute top-[-8%] above"
                style={{ left: `${percentagePositions.stop}%` }}
              >
                {`Stop`}
              </div>
              <div
                className="text-apex-light-yellow text-xs price-bar-label-bottom above absolute top-[11%]"
                style={{ left: `${percentagePositions.stop}%` }}
              >
                {`${float(values.stop)}`}
              </div>
            </>
          )}
        </section>
        <section>
          <div
            className="price-bar-last"
            style={{ left: `${percentagePositions.last}%` }}
          ></div>
          <div
            className="text-xxs price-bar-label-top absolute top-[-8%] above"
            style={{ left: `${percentagePositions.last}%` }}
          >
            {`Last`}
          </div>
          <div
            className="text-apex-light-yellow text-xs price-bar-label-bottom above absolute top-[11%]"
            style={{ left: `${percentagePositions.last}%` }}
          >
            {`${float(values.last)}`}
          </div>
        </section>
        <section>
          <div
            className="price-bar-fill"
            style={{ left: `${percentagePositions.fill}%` }}
          ></div>
          <div
            className="text-xxs price-bar-label-top absolute top-[70%]"
            style={{ left: `${percentagePositions.fill}%` }}
          >
            {`Fill`}
          </div>
          <div
            className="text-apex-light-yellow text-xs price-bar-label-bottom absolute top-[88%]"
            style={{ left: `${percentagePositions.fill}%` }}
          >
            {`${float(values.fill)}`}
          </div>
        </section>
        <section>
          <div
            className="price-bar-max"
            style={{ left: `${percentagePositions.max}%` }}
          ></div>
          {displayMax && (
            <>
              <div
                className="text-xxs price-bar-label-top absolute top-[-8%] above"
                style={{ left: `${percentagePositions.max}%` }}
              >
                {`Max`}
              </div>
              <div
                className="text-apex-light-yellow text-xs price-bar-label-bottom above absolute top-[11%]"
                style={{ left: `${percentagePositions.max}%` }}
              >
                {`${float(values.max)}`}
              </div>
            </>
          )}
        </section>
        <section>
          <div
            className="price-bar-trim1"
            style={{ left: `${percentagePositions.trim1}%` }}
          ></div>
          <div
            className="text-xxs price-bar-label-top absolute top-[70%]"
            style={{ left: `${percentagePositions.trim1}%` }}
          >
            {`Trim 1`}
          </div>
          <div
            className="text-apex-light-yellow text-xs price-bar-label-bottom absolute top-[88%]"
            style={{ left: `${percentagePositions.trim1}%` }}
          >
            {`${float(values.trim1)}`}
          </div>
          <div
            className="price-bar-icon"
            style={{ left: `${percentagePositions.trim1 - 1.1}%` }}
          >
            {trade.trimStatus < 1 ? <CircleCheck /> : <CircleCheckFilled />}
          </div>
        </section>
        {hasTrim2 && (
          <section>
            <div
              className="price-bar-trim2"
              style={{ left: `${percentagePositions.trim2}%` }}
            ></div>
            <div
              className="text-xxs price-bar-label-top absolute top-[70%]"
              style={{ left: `${percentagePositions.trim2}%` }}
            >
              {`Trim 2`}
            </div>
            <div
              className="text-apex-light-yellow text-xs price-bar-label-bottom absolute top-[88%]"
              style={{ left: `${percentagePositions.trim2}%` }}
            >
              {`${float(valuesWithTrim2.trim2)}`}
            </div>
            <div
              className="price-bar-icon"
              style={{ left: `${percentagePositions.trim2 - 1.1}%` }}
            >
              {trade.trimStatus < 2 ? <CircleCheck /> : <CircleCheckFilled />}
            </div>
          </section>
        )}
        <section>
          <div
            className="price-bar-runner-limit"
            style={{ left: `${percentagePositions.runnerLimit}%` }}
          ></div>
          <div
            className="text-xxs price-bar-label-top absolute top-[70%]"
            style={{ left: `${percentagePositions.runnerLimit}%` }}
          >
            {`100%`}
          </div>
          <div
            className="text-apex-light-yellow text-xs price-bar-label-bottom absolute top-[88%]"
            style={{ left: `${percentagePositions.runnerLimit}%` }}
          >
            {`${float(values.runnerLimit)}`}
          </div>
        </section>
      </div>
      {showButtons && (
        <>
          <div className="order-actions-container top-3">
            <div className="border-mask"></div>
            <p className="text-center mb-3 text-sm relative z-20">
              {sliderValue.toFixed(2)}
            </p>
            <Slider
              className="price-slider mb-6 w-[341.69px]"
              min={rangeStart}
              max={rangeEnd}
              step={0.01}
              value={[sliderValue]}
              onValueChange={(e) => setSliderValue(e[0])}
            />
            <div className="order-actions-buttons">
              {showSellConfirm ? (
                <>
                  <p className="text-xs mr-3">Sell position?</p>
                  <Badge
                    onClick={async () => {
                      await sellTrade({
                        id: trade.id,
                        riskType: trade.riskType.toString().toUpperCase(),
                      });
                    }}
                    className="rounded badge apex-button text-xs text-foreground symbol-badge mini sell"
                    variant="outline"
                  >
                    Yes
                  </Badge>
                  <Badge
                    onClick={() => setConfirmSellId("")}
                    className="rounded badge apex-button text-xs text-foreground symbol-badge mini sell"
                    variant="outline"
                  >
                    No
                  </Badge>
                </>
              ) : (
                <>
                  <Badge
                    onClick={async () => {
                      await modifyTrade({
                        id: trade.id,
                        tradeLeg: TradeLeg.STOP,
                        price: sliderValue,
                        riskType: trade.riskType,
                      });
                    }}
                    className="rounded badge apex-button text-xs text-foreground symbol-badge mini"
                    variant="outline"
                  >
                    Stop
                  </Badge>
                  <Badge
                    onClick={async () => {
                      await modifyTrade({
                        id: trade.id,
                        tradeLeg: TradeLeg.TRIM1,
                        price: sliderValue,
                        riskType: trade.riskType,
                      });
                    }}
                    className="rounded badge apex-button text-xs text-foreground symbol-badge mini"
                    variant="outline"
                  >
                    Trim 1
                  </Badge>
                  {hasTrim2 && (
                    <Badge
                      onClick={async () => {
                        await modifyTrade({
                          id: trade.id,
                          tradeLeg: TradeLeg.TRIM2,
                          price: sliderValue,
                          riskType: trade.riskType,
                        });
                      }}
                      className="rounded badge apex-button text-xs text-foreground symbol-badge mini"
                      variant="outline"
                    >
                      Trim 2
                    </Badge>
                  )}
                  <Badge
                    onClick={async () => setConfirmSellId(String(trade.id))}
                    className="rounded badge apex-button text-xs text-foreground symbol-badge mini"
                    variant="outline"
                  >
                    Market Sell
                  </Badge>
                </>
              )}
            </div>
            {isPending && (
              <div className="order-actions-buttons">
                <Badge
                  onClick={async () => {
                    await cancelTrade({ id: trade.fillOrderId });
                  }}
                  className="rounded badge apex-button text-xs text-foreground symbol-badge mini"
                  variant="outline"
                >
                  Cancel Trade
                </Badge>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PriceBar;
