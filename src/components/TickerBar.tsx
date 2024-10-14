import { ValuesLibData } from "@/constants";
import { useAppSelector } from "@/state/hooks";
import { PriceData } from "@/types/PriceData";
import getValuesLibData from "@/utils/getValuesLibData";

const TickerBar: React.FC = () => {
  const { SPY, QQQ, IWM, VIX } = useAppSelector((state) => state.main);

  return (
    <div className="ticker-bar mt-2 justify-center leading-[1rem]">
      <Ticker {...SPY} />
      <Ticker {...QQQ} />
      <Ticker {...IWM} />
      <Ticker {...VIX} />
    </div>
  );
};

export default TickerBar;

const Ticker: React.FC<PriceData> = ({ symbol, price, changeDollars }) => {
  const lib: ValuesLibData = getValuesLibData(changeDollars);

  return (
    <div className={`${lib.textColor} mx-1`}>
      <span className="lib.icon relative top-[0.3px] text-center w-6 inline-block">
        {lib.icon}
      </span>
      {`${symbol} ${price || "0.00"} ${lib.operator}${
        Math.abs(Number(changeDollars)).toFixed(2) || "0.00"
      }`}
    </div>
  );
};
