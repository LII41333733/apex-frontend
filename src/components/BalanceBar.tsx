import { useAppSelector } from "@/state/hooks";
import { dollar } from "@/utils/dollar";

const BalanceBar: React.FC = () => {
  const balance = useAppSelector((state) => state.balance);

  return (
    <section className="balance-bar">
      {balance.totalEquity ? (
        <div>
          <p className="text-xxs font-normal text-primary">Total Equity</p>
          <h4 className="text-xs font-semibold">
            {balance.totalEquity ? dollar(balance.totalEquity) : "--"}
          </h4>
        </div>
      ) : (
        <></>
      )}
      {balance.cashAvailable ? (
        <div className="">
          <p className="text-xxs font-normal text-primary">Cash Available</p>
          <h4 className="text-xs font-semibold">
            {balance.cashAvailable ? dollar(balance.cashAvailable) : "--"}
          </h4>
        </div>
      ) : (
        <></>
      )}
      {balance.marketValue ? (
        <div className="">
          <p className="text-xxs font-normal text-primary">Market Value</p>
          <h4 className="text-xs font-semibold">
            {balance.marketValue ? dollar(balance.marketValue) : "--"}
          </h4>
        </div>
      ) : (
        <></>
      )}
      {balance.openPl ? (
        <div className="">
          <p className="text-xxs font-normal text-primary">Open P/L</p>
          <h4 className="text-xs font-semibold">
            {balance.openPl ? dollar(balance.openPl) : "--"}
          </h4>
        </div>
      ) : (
        <></>
      )}
      {balance.closePl ? (
        <div className="">
          <p className="text-xxs font-normal text-primary">Day P/L</p>
          <h4 className="text-xs font-semibold">
            {balance.closePl ? dollar(balance.closePl) : "--"}
          </h4>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default BalanceBar;
