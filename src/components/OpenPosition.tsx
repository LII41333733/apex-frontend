import { ValuesLibData } from "@/constants";
import { Order } from "@/interfaces/Order";
import convertTickerWithExpiration from "@/utils/convertTickerWithExpiration";
import getValuesLibData from "@/utils/getValuesLibData";

const PositionPl: React.FC<{
  quantity: number;
  price: number;
  last: number;
}> = ({ quantity, price, last }) => {
  const buyPrice = quantity * (price * 100);
  const currentPrice = quantity * (last * 100);
  const dollarDiff = currentPrice - buyPrice;
  const percDiff = (currentPrice * 100) / buyPrice;
  const lib: ValuesLibData = getValuesLibData(dollarDiff);
  return (
    <>
      <div className={`pl-column column ${lib.textColor}`}>{`${
        lib.operator
      }$${Math.abs(dollarDiff)}`}</div>
      <div className={`perc-column column ${lib.textColor}`}>{`${
        lib.operator
      }${Math.abs(percDiff - 100).toFixed(2)}%`}</div>
    </>
  );
};

const OpenPosition: React.FC<{ order: Order }> = ({ order }) => {
  const { leg, last } = order;
  const { optionSymbol, quantity, price } = leg[0];
  const symbolLabel: string = convertTickerWithExpiration(optionSymbol);

  return (
    <div className="position mb-5">
      <div className="text-column column">
        <div className="text-top">{symbolLabel}</div>
        <div className="text-bottom text-xs">
          <span className="text-bottom-label font-normal">Cons</span>
          <span className="text-bottom-value mx-1">{quantity ?? 0}</span>
          <span className="text-bottom-label font-normal">Avg</span>
          <span className="text-bottom-value mx-1">
            {(price ?? 0).toFixed(2)}
          </span>
          <span className="text-bottom-label font-normal">Last</span>
          <span className="text-bottom-value ml-1">
            {(last ?? 0).toFixed(2)}
          </span>
        </div>
      </div>
      <PositionPl
        price={price ?? 0}
        last={last ?? 0}
        quantity={quantity ?? 0}
      />
    </div>
  );
};

export default OpenPosition;
