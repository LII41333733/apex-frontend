export default (num: number, place?: number) => (num ?? 0).toFixed(place || 2);
