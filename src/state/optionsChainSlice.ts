import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Quote from "@/interfaces/Quote";
import { OptionType } from "@/constants";
import { apexApi } from "./api/apex";

// Define a type for the slice state
export interface OptionsChainState {
  quotesMap: { [key: string]: Quote };
  quotesPrices: { [key: string]: number };
  optionType: OptionType;
  symbolInput: string;
  activeSymbol: string;
  confirmedSymbol: string;
}

// Define the initial state using that type
const initialState: OptionsChainState = {
  quotesMap: {},
  quotesPrices: {},
  optionType: OptionType.CALL,
  symbolInput: "",
  activeSymbol: "",
  confirmedSymbol: "",
};

export const optionsChainSlice = createSlice({
  name: "optionsChain",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSymbolInput: (state, action: PayloadAction<string>) => {
      state.symbolInput = action.payload;
    },
    updateQuotesPrices: (
      state,
      action: PayloadAction<{ symbol: string; price: number }>
    ) => {
      state.quotesPrices = {
        ...state.quotesPrices,
        [action.payload.symbol]: action.payload.price,
      };
    },
    updateQuotesMap: (state, action: PayloadAction<Quote>) => {
      state.quotesMap = {
        ...state.quotesMap,
        [action.payload.symbol]: action.payload,
      };
    },
    updateOptionType: (state, action: PayloadAction<OptionType>) => {
      state.optionType = action.payload;
    },
    updateConfirmedSymbol: (state, action: PayloadAction<string>) => {
      state.confirmedSymbol = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      apexApi.endpoints.getOptionsChain.matchFulfilled,
      (state, { payload, meta }) => {
        for (const data of payload) {
          state.quotesMap = {
            ...state.quotesMap,
            [data.symbol]: data,
          };

          state.quotesPrices = {
            ...state.quotesPrices,
            [data.symbol]: data.ask,
          };
        }

        state.activeSymbol = meta.arg.originalArgs.symbol;
      }
    );
  },
});

export const {
  updateQuotesPrices,
  updateSymbolInput,
  updateOptionType,
  updateConfirmedSymbol,
  updateQuotesMap,
} = optionsChainSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default optionsChainSlice.reducer;
