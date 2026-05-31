import { createSlice } from '@reduxjs/toolkit';


interface UIState {
    isOverlayVisible: boolean,
    isMenuOpen: boolean,
    isEditSkillsModalOpen?: boolean,
    isEditFooterModalOpen?: boolean,
    bodyScroll: boolean,
}


const initialState: UIState = {
    isOverlayVisible: false,
    isMenuOpen: false,
    isEditSkillsModalOpen: false,
    isEditFooterModalOpen: false,
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

        toggleEditSkillsModal: (state) => {
            state.isEditSkillsModalOpen = !state.isEditSkillsModalOpen
        },

        toggleEditFooterModal: (state) => {
            state.isEditFooterModalOpen = !state.isEditFooterModalOpen
        },

        closeMenu: (state) => {
            state.isMenuOpen = false
        },

        closeEditSkillsModal: (state) => {
            state.isEditSkillsModalOpen = false
        },

        closeEditFooterModal: (state) => {
            state.isEditFooterModalOpen = false
        },
    },
})

export const { 
        toggleIsOverlayVisible,
        toggleMenu,
        toggleEditSkillsModal,
        toggleEditFooterModal,
        
        closeEditSkillsModal,
        closeEditFooterModal,
        closeMenu,
    } 
     = uiSlice.actions;
export default uiSlice.reducer;