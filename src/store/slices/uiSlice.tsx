import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface UIState {
    isOverlayVisible: boolean,
    isMenuOpen: boolean
}


const initialState: UIState = {
    isOverlayVisible: false,
    isMenuOpen: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleIsOverlayVisible: (state) => {
            state.isOverlayVisible = !state.isOverlayVisible
        },

        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen
        },

        closeMenu: (state) => {
            state.isMenuOpen = false
        },
    },
})

export const { toggleIsOverlayVisible, toggleMenu, closeMenu } = uiSlice.actions;
export default uiSlice.reducer;