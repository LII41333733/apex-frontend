import { useAppSelector } from "@/state/hooks";
import { dollar } from "@/utils/dollar";
import DisplaySelector from "./DisplaySelector";

const BalanceBarDesktop: React.FC = () => {
  const balance = useAppSelector((state) => state.balance);

  const { totalEquity, cashAvailable, marketValue, openPl, closePl } = balance;

  return (
    <div className="balance-bar-wrapper flex items-center w-[100%]">
      <img
        className="pt-logo h-[60px]"
        src="src\assets\spin-gif.gif"
        alt="pt_logo"
      />
      <DisplaySelector />
      <div className="balance-bar justify-end ml-auto flex flex-row">
        <div className="group w-[5.6rem] flex flex-col mr-6">
          <p className=" text-[0.85rem] mb-0.25 leading-[1rem] text-left">
            Total Equity
          </p>
          <h4 className="text-base tracking-wide leading-[1rem] text-left font-semibold text-apex-light-yellow">
            {dollar(totalEquity, true)}
          </h4>
        </div>
        <div className="group w-[5.6rem] flex flex-col mr-6">
          <p className=" text-[0.85rem] mb-0.25 leading-[1rem] text-left">
            Cash Available
          </p>
          <h4 className="text-base tracking-wide leading-[1rem] text-left font-semibold text-apex-light-yellow">
            {dollar(cashAvailable, true)}
          </h4>
        </div>
        <div className="group w-[5.6rem] flex flex-col mr-6">
          <p className=" text-[0.85rem] mb-0.25 leading-[1rem] text-left">
            Market Value
          </p>
          <h4 className="text-base tracking-wide leading-[1rem] text-left font-semibold text-apex-light-yellow">
            {dollar(marketValue, true)}
          </h4>
        </div>
        <div className="group w-[5.6rem] flex flex-col mr-6">
          <p className=" text-[0.85rem] mb-0.25 leading-[1rem] text-left">
            Open P/L
          </p>
          <h4 className="text-base tracking-wide leading-[1rem] text-left font-semibold text-apex-light-yellow">
            {dollar(openPl, true)}
          </h4>
        </div>
        <div className="group w-[5.6rem] flex flex-col mr-6">
          <p className=" text-[0.85rem] mb-0.25 leading-[1rem] text-left">
            Day P/L
          </p>
          <h4 className="text-base tracking-wide leading-[1rem] text-left font-semibold text-apex-light-yellow">
            {dollar(closePl, true)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BalanceBarDesktop;
