import { dollar } from './dollar';

export function returnValueWithOperatorPrefix(value: number) {
    if (value > 0) {
        return `+${dollar(value)}`;
    }
    if (value < 0) {
        return `-${dollar(Math.abs(value))}`;
    }
    return '0';
}
