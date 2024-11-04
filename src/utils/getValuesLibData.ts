import { ValuesLib, ValueStatus } from '@/constants';
import getValueStatus from './getValueStatus';

export default function (num: number | string) {
    const valueStatus: ValueStatus = getValueStatus(Number(num));
    return ValuesLib[valueStatus];
}
