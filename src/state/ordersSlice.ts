import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderSummary } from "@/interfaces/OrderSummary";
import { OrderStatuses } from "@/constants";

export interface OrdersState {
  orderSummary: OrderSummary;
  ordersView: OrderStatuses;
}

const initialState: OrdersState = {
  orderSummary: {
    allOrders: [],
    openOrders: [],
    otherOrders: [],
    pendingOrders: [],
    filledOrders: [],
  },
  ordersView: OrderStatuses.ALL,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrderSummary: (state, action: PayloadAction<OrderSummary>) => {
      state.orderSummary = action.payload;
    },
    updateOrdersView: (state, action: PayloadAction<OrderStatuses>) => {
      state.ordersView = action.payload;
    },
  },
});

export const { updateOrderSummary, updateOrdersView } = ordersSlice.actions;

export default ordersSlice.reducer;
