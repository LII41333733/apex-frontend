import { ValuesLibData } from "@/constants";
import { useAppSelector } from "@/state/hooks";
import { PriceData } from "@/types/PriceData";
import getValuesLibData from "@/utils/getValuesLibData";

const TickerBar: React.FC = () => {
  const { SPY, QQQ, IWM } = useAppSelector((state) => state.main);

  return (
    <section className="ticker-bar">
      <Ticker {...SPY} />
      <Ticker {...QQQ} />
      <Ticker {...IWM} />
    </section>
  );
};

export default TickerBar;

const Ticker: React.FC<PriceData> = ({ symbol, price, changeDollars }) => {
  const lib: ValuesLibData = getValuesLibData(changeDollars);

  return (
    <span className={lib.textColor}>{`${lib.icon} ${symbol} ${
      price || "0.00"
    } ${lib.operator}${
      Math.abs(Number(changeDollars)).toFixed(2) || "0.00"
    }`}</span>
  );
};
