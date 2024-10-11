import { useAppSelector } from "@/state/hooks";
import { dollar } from "@/utils/dollar";

const BalanceBar: React.FC = () => {
  const balance = useAppSelector((state) => state.balance);

  const { totalEquity, cashAvailable, marketValue, openPl, closePl } = balance;

  return (
    <div className="balance-bar-wrapper flex items-center w-[100%] gap-3">
      <img className="pt-logo" src="src\assets\spin-gif.gif" alt="pt_logo" />
      <div className="balance-bar mr-8 w-[50%] ml-auto">
        <div className="group justify-between flex flex-row">
          <p className="text-xs apex-text-yellow">Total Equity</p>
          <h4 className="text-xs tracking-wide font-semibold">
            {dollar(totalEquity, true)}
          </h4>
        </div>
        <div className="group justify-between flex flex-row">
          <p className="text-xs apex-text-yellow">Cash Available</p>
          <h4 className="text-xs tracking-wide font-semibold">
            {dollar(cashAvailable, true)}
          </h4>
        </div>

        <div className="group justify-between flex flex-row">
          <p className="text-xs apex-text-yellow">Market Value</p>
          <h4 className="text-xs tracking-wide font-semibold">
            {dollar(marketValue, true)}
          </h4>
        </div>
        <div className="group justify-between flex flex-row">
          <p className="text-xs apex-text-yellow">Open P/L</p>
          <h4 className="text-xs tracking-wide font-semibold">
            {dollar(openPl, true)}
          </h4>
        </div>
        <div className="group justify-between flex flex-row">
          <p className="text-xs apex-text-yellow">Day P/L</p>
          <h4 className="text-xs tracking-wide font-semibold">
            {dollar(closePl, true)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BalanceBar;
