import { ValuesLibData } from "@/constants";
import { useAppSelector } from "@/state/hooks";
import { PriceData } from "@/types/PriceData";
import getValuesLibData from "@/utils/getValuesLibData";

const TickerBar: React.FC = () => {
  const { SPY, QQQ, IWM } = useAppSelector((state) => state.main);

  return (
    <div id="ticker-bar" className="mt-2">
      <hr />
      <section>
        <Ticker {...SPY} />
        <Ticker {...QQQ} />
        <Ticker {...IWM} />
      </section>
      <hr />
    </div>
  );
};

export default TickerBar;

const Ticker: React.FC<PriceData> = ({ symbol, price, changeDollars }) => {
  const lib: ValuesLibData = getValuesLibData(changeDollars);

  return (
    <span className={lib.textColor}>{`${lib.icon} ${symbol} ${
      price || "0.00"
    } ${lib.operator}${changeDollars || "0.00"}`}</span>
  );
};
