import { Leg } from "./Leg";

export interface Order {
  class: string;
  createDate: string;
  id: number;
  leg: Leg[];
  reasonDescription?: string;
  status: string;
  transactionDate: string;
  last: number;
}
