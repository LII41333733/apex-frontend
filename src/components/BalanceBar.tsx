import { BalanceBarProps } from "@/interfaces/BalanceBarProps";
import { formatToUSD } from "@/utils/dollarFormatter";

export const BalanceBar: React.FC<BalanceBarProps> = ({
  cashAvailable,
  unsettledFunds,
  isOpen,
}) => {
  return (
    <section className="section-1">
      <div>
        <p className="text-sm text-primary tracking-tight">Cash Available</p>
        <h4 className="text-lg font-semibold tracking-tight">
          {isOpen ? formatToUSD(cashAvailable) : "--"}
        </h4>
      </div>
      <div className="ml-3">
        <p className="text-sm text-primary tracking-tight">Unsettled Funds</p>
        <h4 className="text-lg font-semibold tracking-tight">
          {isOpen ? formatToUSD(unsettledFunds) : "--"}
        </h4>
      </div>
      <div></div>
    </section>
  );
};
