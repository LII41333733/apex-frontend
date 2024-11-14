import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RiskType } from '@/constants';

export interface ChartsState {
    chartType: RiskType | 'All';
}

export const initialState: ChartsState = {
    chartType: 'All',
};

export const chartsSlice = createSlice({
    name: 'charts',
    initialState,
    reducers: {
        updateChartType: (state, action: PayloadAction<RiskType | 'All'>) => {
            state.chartType = action.payload;
        },
    },
});

export const { updateChartType } = chartsSlice.actions;

export default chartsSlice.reducer;
