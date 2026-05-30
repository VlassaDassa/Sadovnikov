import { createSlice } from '@reduxjs/toolkit';


interface UIState {
    isOverlayVisible: boolean,
    isMenuOpen: boolean,
    isEditSkillsModalOpen?: boolean,
    bodyScroll: boolean,
}


const initialState: UIState = {
    isOverlayVisible: false,
    isMenuOpen: false,
    isEditSkillsModalOpen: false,
    bodyScroll: true,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleIsOverlayVisible: (state) => {
            state.isOverlayVisible = !state.isOverlayVisible
            state.bodyScroll = !state.bodyScroll
            document.documentElement.style.overflow = state.bodyScroll ? 'auto' : 'hidden';
        },

        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen
        },

        closeMenu: (state) => {
            state.isMenuOpen = false
        },

        toggleEditSkillsModal: (state) => {
            state.isEditSkillsModalOpen = !state.isEditSkillsModalOpen
        }
    },
})

export const { 
        toggleIsOverlayVisible,
        toggleMenu,
        closeMenu,
        toggleEditSkillsModal,
    } 
     = uiSlice.actions;
export default uiSlice.reducer;