import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { Breakpoint } from '@/interfaces/general';

interface BreakpointState {
    value: Breakpoint;
}

const initialState: BreakpointState = {
    value: 'mobile'
}

const breakpointSlice = createSlice({
    name: 'breakpoint',
    initialState,
    reducers: {
        setBreakpoint: (state, action: PayloadAction<Breakpoint>) => {
            state.value = action.payload
        },
    },
})

export const { setBreakpoint } = breakpointSlice.actions;
export default breakpointSlice.reducer;