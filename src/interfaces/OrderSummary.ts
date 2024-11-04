import { Order } from './Order';

export interface OrderSummary {
    allOrders: Order[];
    openOrders: Order[];
    otherOrders: Order[];
    pendingOrders: Order[];
    filledOrders: Order[];
}
