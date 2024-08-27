import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import optionsChainReducer from "./optionsChainSlice";
import { apexApi } from "@/state/api/apex";

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
    optionsChain: optionsChainReducer,
    [apexApi.reducerPath]: apexApi.reducer,
    // orders: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apexApi.middleware),
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
