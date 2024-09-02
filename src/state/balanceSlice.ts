import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Balance from "@/interfaces/Balance";

// Define a type for the slice state
export interface BalanceState {
  totalEquity: number;
  unsettledFunds: number;
  cashAvailable: number;
  marketValue: number;
  openPl: number;
  closePl: number;
  pendingCash: number;
  unclearedFunds: number;
}

// Define the initial state using that type
const initialState: BalanceState = {
  totalEquity: 0,
  unsettledFunds: 0,
  cashAvailable: 0,
  marketValue: 0,
  openPl: 0,
  closePl: 0,
  pendingCash: 0,
  unclearedFunds: 0,
};

export const balanceSlice = createSlice({
  name: "balance",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateAll: (state, action: PayloadAction<Balance>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateAll } = balanceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default balanceSlice.reducer;
