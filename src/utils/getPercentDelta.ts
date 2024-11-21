export function getPercentDelta(initialValue: number, currentValue: number) {
    return ((currentValue - initialValue) / initialValue) * 100;
}
