export interface Leg {
  avgFillPrice: number;
  class: string;
  createDate: string;
  duration: string;
  execQuantity: number;
  id: number;
  lastFillPrice: number;
  lastFillQuantity: number;
  optionSymbol: string;
  price: number;
  quantity: number;
  reasonDescription?: string;
  remainingQuantity: number;
  side: string;
  status: string;
  stopPrice: number;
  symbol: string;
  transactionDate: string;
  type: string;
}
