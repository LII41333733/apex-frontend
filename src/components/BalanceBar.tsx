import { useAppSelector } from "@/state/hooks";
import { formatToUSD } from "@/utils/dollarFormatter";

const BalanceBar: React.FC = () => {
  const balance = useAppSelector((state) => state.balance);

  return (
    <section className="balance-bar">
      <div>
        <p className="text-xxs font-normal text-primary">Total Equity</p>
        <h4 className="text-xs font-semibold">
          {balance.totalEquity ? formatToUSD(balance.totalEquity) : "--"}
        </h4>
      </div>
      <div className="">
        <p className="text-xxs font-normal text-primary">Cash Available</p>
        <h4 className="text-xs font-semibold">
          {balance.cashAvailable ? formatToUSD(balance.cashAvailable) : "--"}
        </h4>
      </div>
      <div className="">
        <p className="text-xxs font-normal text-primary">Day P/L</p>
        <h4 className="text-xs font-semibold">
          {balance.closePl ? formatToUSD(balance.closePl) : "--"}
        </h4>
      </div>
      <div className="">
        <p className="text-xxs font-normal text-primary">Open P/L</p>
        <h4 className="text-xs font-semibold">
          {balance.openPl ? formatToUSD(balance.openPl) : "--"}
        </h4>
      </div>
      <div className="">
        <p className="text-xxs font-normal text-primary">Market Value</p>
        <h4 className="text-xs font-semibold">
          {balance.marketValue ? formatToUSD(balance.marketValue) : "--"}
        </h4>
      </div>
    </section>
  );
};

export default BalanceBar;
