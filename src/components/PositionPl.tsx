import { ValuesLibData } from "@/constants";
import getValuesLibData from "@/utils/getValuesLibData";

const PositionPl: React.FC<{
  quantity: number;
  price: number;
  last: number;
}> = ({ quantity, price, last }) => {
  const buyPrice = price * 100;
  const currentPrice = last * 100;
  const dollarDiff = (currentPrice - buyPrice) * quantity;
  const percDiff = ((currentPrice - buyPrice) / buyPrice) * 100;
  const lib: ValuesLibData = getValuesLibData(dollarDiff);
  return (
    <>
      <div className={`pl-column column ${lib.textColor}`}>{`${
        lib.operator
      }$${Math.abs(dollarDiff).toFixed(2)}`}</div>
      <div className={`perc-column column ${lib.textColor}`}>{`${
        lib.operator
      }${Math.abs(percDiff).toFixed(2)}%`}</div>
    </>
  );
};

export default PositionPl;
