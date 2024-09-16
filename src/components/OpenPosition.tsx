import { ValuesLibData } from "@/constants";
import { Order } from "@/interfaces/Order";
import convertTickerWithExpiration from "@/utils/convertTickerWithExpiration";
import getValuesLibData from "@/utils/getValuesLibData";
import PositionPl from "./PositionPl";

const OpenPosition: React.FC<{ order: Order }> = ({ order }) => {
  const { leg, last } = order;
  const { optionSymbol, quantity, avgFillPrice: price } = leg[0];
  const symbolLabel: string = convertTickerWithExpiration(optionSymbol);

  return (
    <div className="position mb-2">
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
