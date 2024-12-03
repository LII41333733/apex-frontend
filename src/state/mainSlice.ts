import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Displays } from '@/constants';
import { PriceData } from '@/types/PriceData';
import { apexApi } from './api/apex';

export interface MainState {
    token: string | null;
    display: Displays;
    symbols: PriceData[];
    isDemoMode: boolean;
}

export const initialState: MainState = {
    token: localStorage.getItem('token'),
    display: Displays.ANALYTICS,
    symbols: [],
    isDemoMode: true,
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        updateDisplay: (state, action: PayloadAction<Displays>) => {
            state.display = action.payload;
        },
        updateSymbolData: (state, action: PayloadAction<PriceData[]>) => {
            state.symbols = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        removeToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            apexApi.endpoints.placeTrade.matchFulfilled,
            (state) => {
                state.display = Displays.POSITIONS;
            }
        );
    },
});

export const { updateDisplay, updateSymbolData, setToken, removeToken } =
    mainSlice.actions;

export default mainSlice.reducer;
