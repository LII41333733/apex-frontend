import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Quote from "@/interfaces/Quote";
import { OptionType } from "@/constants";
import { apexApi } from "./api/apex";
import dateFormatter from "@/utils/dateFormatter";

export interface OptionsChainState {
  quotesMap: { [key: string]: Quote };
  quotesPrices: { [key: string]: number };
  optionType: OptionType;
  symbolInput: string;
  activeSymbol: string;
  confirmedSymbol: string;
  expirationDate: string;
}

const initialState: OptionsChainState = {
  quotesMap: {},
  quotesPrices: {},
  optionType: OptionType.CALL,
  symbolInput: "",
  activeSymbol: "",
  confirmedSymbol: "",
  expirationDate: "",
};

export const optionsChainSlice = createSlice({
  name: "optionsChain",
  initialState,
  reducers: {
    resetState: () => initialState,
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
    updateQuotesMap: (
      state,
      { payload: { symbol, ask, bid } }: PayloadAction<Quote>
    ) => {
      const quotesPrices = JSON.parse(JSON.stringify(state.quotesPrices));

      if (!quotesPrices[symbol]) {
        state.quotesPrices[symbol] = ask;
      }

      state.quotesMap = {
        ...state.quotesMap,
        [symbol]: {
          ...state.quotesMap[symbol],
          ask,
          bid,
        },
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
    builder
      .addMatcher(
        apexApi.endpoints.getOptionsChain.matchFulfilled,
        (state, { payload, meta }) => {
          if (payload.length) {
            state.expirationDate = dateFormatter(payload[0].expirationDate);

            for (const data of payload) {
              state.quotesMap = {
                ...state.quotesMap,
                [data.symbol]: data,
              };
            }
          }

          state.activeSymbol = meta.arg.originalArgs.symbol;
        }
      )
      .addMatcher(apexApi.endpoints.getOptionsChain.matchPending, (state) => {
        state.quotesPrices = {};
        state.quotesMap = {};
        state.activeSymbol = "";
        state.confirmedSymbol = "";
        state.expirationDate = "";
      })
      .addMatcher(
        apexApi.endpoints.placeTrade.matchFulfilled,
        () => initialState
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
