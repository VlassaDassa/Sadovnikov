import { createSlice } from '@reduxjs/toolkit';


interface UIState {
    isOverlayVisible: boolean,
    isMenuOpen: boolean,
    isEditSkillsModalOpen?: boolean,
    isEditFooterModalOpen?: boolean,
    isEditMyStackModalOpen?: boolean,
    isSelectPeriodModalOpen?: boolean,
    bodyScroll: boolean,
}


const initialState: UIState = {
    isOverlayVisible: false,
    isMenuOpen: false,
    isEditSkillsModalOpen: false,
    isEditFooterModalOpen: false,
    isEditMyStackModalOpen: false,
    isSelectPeriodModalOpen: false,
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

        toggleEditMyStackModal: (state) => {
            state.isEditMyStackModalOpen = !state.isEditMyStackModalOpen
        },

        toggleSelectPeriodModal: (state) => {
            state.isSelectPeriodModalOpen = !state.isSelectPeriodModalOpen
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

        closeEditMyStackModal: (state) => {
            state.isEditMyStackModalOpen = false
        },

        closeSelectPeriodModal: (state) => {
            state.isSelectPeriodModalOpen = false
        }
    },
})

export const { 
        toggleIsOverlayVisible,
        toggleMenu,
        toggleEditSkillsModal,
        toggleEditFooterModal,
        toggleEditMyStackModal,
        toggleSelectPeriodModal,
        
        closeEditSkillsModal,
        closeEditFooterModal,
        closeEditMyStackModal,
        closeSelectPeriodModal,
        closeMenu,
    } 
     = uiSlice.actions;
export default uiSlice.reducer;