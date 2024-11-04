import { ValueStatus } from '@/constants';

export default function (num: number) {
    return num > 0
        ? ValueStatus.POSITIVE
        : num < 0
          ? ValueStatus.NEGATIVE
          : ValueStatus.NEUTRAL;
}
