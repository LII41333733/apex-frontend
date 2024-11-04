import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Quote from '@/interfaces/Quote';
import { OptionType, RiskType } from '@/constants';
import { apexApi } from './api/apex';
import dateFormatter from '@/utils/dateFormatter';
import float from '@/utils/float';

export interface OptionsChainState {
    quotesMap: { [key: string]: Quote };
    quotesPrices: { [key: string]: string };
    optionType: OptionType;
    symbolInput: string;
    activeSymbol: string;
    confirmedSymbol: string;
    expirationDate: string;
    riskType: string;
}

const initialState: OptionsChainState = {
    quotesMap: {},
    quotesPrices: {},
    optionType: OptionType.CALL,
    symbolInput: '',
    activeSymbol: '',
    confirmedSymbol: '',
    expirationDate: '',
    riskType: RiskType.BASE,
};

export const optionsChainSlice = createSlice({
    name: 'optionsChain',
    initialState,
    reducers: {
        resetState: () => initialState,
        updateSymbolInput: (state, action: PayloadAction<string>) => {
            state.symbolInput = action.payload;
        },
        updateQuotesPrices: (
            state,
            action: PayloadAction<{ symbol: string; price: string }>
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
                state.quotesPrices[symbol] = float(ask);
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
        updateRiskType: (state, action: PayloadAction<string>) => {
            const type =
                RiskType[action.payload as keyof typeof RiskType].toUpperCase();
            state.riskType = type;
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
                        state.expirationDate = dateFormatter(
                            payload[0].expirationDate
                        );

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
            .addMatcher(
                apexApi.endpoints.getOptionsChain.matchPending,
                (state) => {
                    state.quotesPrices = {};
                    state.quotesMap = {};
                    state.activeSymbol = '';
                    state.confirmedSymbol = '';
                    state.expirationDate = '';
                }
            )
            .addMatcher(
                apexApi.endpoints.placeTrade.matchFulfilled,
                () => initialState
            )
            .addMatcher(
                apexApi.endpoints.stopOptionsChain.matchPending,
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
    updateRiskType,
} = optionsChainSlice.actions;

export default optionsChainSlice.reducer;
