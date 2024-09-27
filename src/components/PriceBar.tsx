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
} from "@/state/api/apex";
import { Button } from "./ui/button";
import React from "react";
import { RiskType, TradeLeg, TradeStatus } from "@/constants";
import { Badge } from "./ui/badge";

const CircleCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-circle-check circle-check"
    width="22"
    height="22"
    viewBox="0 0 24 24.9"
    strokeWidth="1.5"
    stroke="#facc15"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="#0c0a09" />
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
    stroke="#facc15"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="#0c0a09" />
    <path
      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
      stroke-width="0"
      fill="#facc15"
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

const PriceBar: React.FC<{ trade: Trade }> = ({ trade }) => {
  const [modifyTrade] = useModifyTradeMutation();
  const [cancelTrade] = useCancelTradeMutation();

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
  const displayMax = values.max < lastRange[0] || values.max > lastRange[1];
  const displayStop = values.stop < lastRange[0] || values.stop > lastRange[1];
  const [sliderValue, setSliderValue] = React.useState<number>(0);

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
                className="price-bar-label-top last"
                style={{ left: `${percentagePositions.stop}%` }}
              >
                {`Stop`}
              </div>
              <div
                className="price-bar-label-bottom last"
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
            className="price-bar-label-top last"
            style={{ left: `${percentagePositions.last}%` }}
          >
            {`Last`}
          </div>
          <div
            className="price-bar-label-bottom last"
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
            className="price-bar-label-top"
            style={{ left: `${percentagePositions.fill}%` }}
          >
            {`Fill`}
          </div>
          <div
            className="price-bar-label-bottom"
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
                className="price-bar-label-top last"
                style={{ left: `${percentagePositions.max}%` }}
              >
                {`Max`}
              </div>
              <div
                className="price-bar-label-bottom last"
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
            className="price-bar-label-top"
            style={{ left: `${percentagePositions.trim1}%` }}
          >
            {`Trim 1`}
          </div>
          <div
            className="price-bar-label-bottom"
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
              className="price-bar-label-top"
              style={{ left: `${percentagePositions.trim2}%` }}
            >
              {`Trim 2`}
            </div>
            <div
              className="price-bar-label-bottom"
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
            className="price-bar-label-top"
            style={{ left: `${percentagePositions.runnerLimit}%` }}
          >
            {`100%`}
          </div>
          <div
            className="price-bar-label-bottom"
            style={{ left: `${percentagePositions.runnerLimit}%` }}
          >
            {`${float(values.runnerLimit)}`}
          </div>
        </section>
      </div>
      <div className="order-actions-container mt-3">
        {isOpen && (
          <>
            <Slider
              className="price-slider"
              defaultValue={[0]}
              min={rangeStart}
              max={rangeEnd}
              step={0.01}
              onValueChange={(e) => setSliderValue(e[0])}
            />
            <p>{sliderValue}</p>
            <div className="order-actions-buttons">
              <Badge
                onClick={async () => {
                  await modifyTrade({
                    id: trade.id,
                    tradeLeg: TradeLeg.STOP,
                    price: sliderValue,
                    riskType: trade.riskType,
                  });
                }}
                className="rounded badge position-badge symbol-badge mini"
                variant="outline"
              >
                Modify Stop
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
                className="rounded badge position-badge symbol-badge mini"
                variant="outline"
              >
                Modify Trim 1
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
                  className="rounded badge position-badge symbol-badge mini"
                  variant="outline"
                >
                  Modify Trim 1
                </Badge>
              )}
            </div>
          </>
        )}
        {isPending && (
          <div className="order-actions-buttons">
            <Badge
              onClick={async () => {
                await cancelTrade({ id: trade.fillOrderId });
              }}
              className="rounded badge position-badge symbol-badge mini"
              variant="outline"
            >
              Cancel Trade
            </Badge>
          </div>
        )}
      </div>
    </>
  );
};

export default PriceBar;
