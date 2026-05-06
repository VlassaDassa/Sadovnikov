import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface TooltipState {
    isVisible: boolean,
    text: string,
    title?: string,
    date?: string,
    type: 'lvl1' | 'lvl2' | 'lvl3',
    position: { top: number, left: number }
    targetId?: string
}

const initialState: TooltipState = {
    isVisible: false,
    text: '',
    title: '',
    date: '',
    type: 'lvl1',
    position: { top: 0, left: 0 },
    targetId: undefined
}

const tooltipSlice = createSlice({
    name: 'tooltip',
    initialState,
    reducers: {
        showTooltip: (state, action: PayloadAction<Omit<TooltipState, 'isVisible'>>) => {
            state.isVisible = true;
            state.text = action.payload.text;
            state.title = action.payload.title || '';
            state.date = action.payload.date || '';
            state.type = action.payload.type;
            state.position = action.payload.position;
            state.targetId = action.payload.targetId;
        },

        hideTooltip: (state) => {
            state.isVisible = false;
        },

        updatePosition: (state, action: PayloadAction<{top: number; left: number}>) => {
            state.position = action.payload
        },
    },
});

export const { showTooltip, hideTooltip, updatePosition } = tooltipSlice.actions;
export default tooltipSlice.reducer;