export default interface Quote {
  ask: number;
  bid: number;
  optionType: "call" | "put";
  strike: number;
  symbol: string;
}
