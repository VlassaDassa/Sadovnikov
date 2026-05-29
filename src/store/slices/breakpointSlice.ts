import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Breakpoint } from '@/interfaces/general';

interface BreakpointState {
    value: Breakpoint;
    windowWidth: number;
}

const initialState: BreakpointState = {
    value: 'mobile',
    windowWidth: 0
}

const breakpointSlice = createSlice({
    name: 'breakpoint',
    initialState,
    reducers: {
        setBreakpoint: (state, action: PayloadAction<Breakpoint>) => {
            state.value = action.payload
        },
        setWindowWidth: (state, action: PayloadAction<number>) => {
            state.windowWidth = action.payload
        }
    },
})

export const { setBreakpoint, setWindowWidth } = breakpointSlice.actions;
export default breakpointSlice.reducer;