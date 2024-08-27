import { useAppSelector } from "@/state/hooks";
import { formatToUSD } from "@/utils/dollarFormatter";

const BalanceBar: React.FC = () => {
  const balance = useAppSelector((state) => state.balance);

  return (
    <section className="section-1">
      <div>
        <p className="text-sm text-primary">Cash Available</p>
        <h4 className="text-lg font-semibold">
          {balance.cashAvailable ? formatToUSD(balance.cashAvailable) : "--"}
        </h4>
      </div>
      <div className="ml-3">
        <p className="text-sm text-primary">Unsettled Funds</p>
        <h4 className="text-lg font-semibold">
          {balance.unsettledFunds ? formatToUSD(balance.unsettledFunds) : "--"}
        </h4>
      </div>
      <div></div>
    </section>
  );
};

export default BalanceBar;
