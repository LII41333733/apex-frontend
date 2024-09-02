import { ValuesLib, ValueStatus } from "@/constants";
import getValueStatus from "./getValueStatus";

export default function (num: number) {
  const valueStatus: ValueStatus = getValueStatus(num);
  return ValuesLib[valueStatus];
}
