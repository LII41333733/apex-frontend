import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderSummary } from '@/interfaces/OrderSummary';
import { TradeStatus } from '@/constants';
import { apexApi } from './api/apex';

export interface OrdersState {
    orderSummary: OrderSummary;
    ordersView: TradeStatus;
    confirmCancelId: number | null;
    confirmSellId: number | null;
}

const initialState: OrdersState = {
    orderSummary: {
        allOrders: [],
        openOrders: [],
        otherOrders: [],
        pendingOrders: [],
        filledOrders: [],
    },
    ordersView: TradeStatus.ALL,
    confirmCancelId: null,
    confirmSellId: null,
};

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        updateOrderSummary: (state, action: PayloadAction<OrderSummary>) => {
            state.orderSummary = action.payload;
        },
        updateOrdersView: (state, action: PayloadAction<TradeStatus>) => {
            state.ordersView = action.payload;
        },
        setConfirmCancelId: (state, action: PayloadAction<number | null>) => {
            state.confirmCancelId = action.payload;
        },
        setConfirmSellId: (state, action: PayloadAction<number | null>) => {
            state.confirmSellId = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            apexApi.endpoints.cancelTrade.matchFulfilled,
            (state) => {
                state.confirmCancelId = null;
            }
        );
    },
});

export const {
    updateOrderSummary,
    updateOrdersView,
    setConfirmCancelId,
    setConfirmSellId,
} = orderSlice.actions;

export default orderSlice.reducer;
