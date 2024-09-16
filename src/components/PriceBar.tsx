import { useAppSelector } from "@/state/hooks";
import { Progress } from "@/components/ui/progress";
import float from "@/utils/float";
import BaseTrade from "@/interfaces/BaseTrade";

const CircleCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-circle-check circle-check"
    width="22"
    height="22"
    viewBox="0 0 24 24"
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
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#facc15"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
  trim2: number;
  runnerLimit: number;
}) {
  const { stop, fill, last, trim1, trim2, runnerLimit } = values;

  // Define the full range (obj.stop - 0.20, obj.runnerLimit + 0.20)
  const rangeStart = stop - 0.02;
  const rangeEnd = runnerLimit + 0.02;
  const totalRange = rangeEnd - rangeStart;

  // Helper function to calculate the percentage position within the range
  function calculatePercentage(value: number) {
    return ((value - rangeStart) / totalRange) * 100;
  }

  // Calculate percentage positions for each value
  return {
    rangeStart: calculatePercentage(rangeStart),
    rangeEnd: calculatePercentage(rangeEnd),
    stop: calculatePercentage(stop),
    fill: calculatePercentage(fill),
    last: calculatePercentage(last),
    trim1: calculatePercentage(trim1),
    trim2: calculatePercentage(trim2),
    runnerLimit: calculatePercentage(runnerLimit),
  };
}

const PriceBar: React.FC<{ trade: BaseTrade }> = ({ trade }) => {
  // Example usage
  const values = {
    stop: trade.stopPrice,
    fill: trade.fillPrice,
    last: trade.lastPrice,
    trim1: trade.trim1Price,
    trim2: trade.trim2Price,
    runnerLimit: trade.fillPrice * 2,
  };

  const percentagePositions = calculatePercentagePositions(values);
  console.log(percentagePositions);

  return (
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
        <div
          className="price-bar-label-top"
          style={{ left: `${percentagePositions.stop}%` }}
        >
          {`Stop`}
        </div>
        <div
          className="price-bar-label-bottom"
          style={{ left: `${percentagePositions.stop}%` }}
        >
          {`${float(values.stop)}`}
        </div>
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
          <CircleCheck />
        </div>
      </section>
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
          {`${float(values.trim2)}`}
        </div>
        <div
          className="price-bar-icon"
          style={{ left: `${percentagePositions.trim2 - 1.1}%` }}
        >
          <CircleCheck />
          {/* <CircleCheckFilled /> */}
        </div>
      </section>
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
  );
};

export default PriceBar;
