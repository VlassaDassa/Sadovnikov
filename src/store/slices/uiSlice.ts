import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UIState {
    isOverlayVisible: boolean,
    isMenuOpen: boolean,
    isEditSkillsModalOpen?: boolean,
    isEditFooterModalOpen?: boolean,
    isEditMyStackModalOpen?: boolean,
    isSelectPeriodModalOpen?: boolean,
    isEditProjectStackModalOpen?: boolean,
    currentId?: number,
    bodyScroll: boolean,
}


const initialState: UIState = {
    isOverlayVisible: false,
    isMenuOpen: false,
    isEditSkillsModalOpen: false,
    isEditFooterModalOpen: false,
    isEditMyStackModalOpen: false,
    isSelectPeriodModalOpen: false,
    isEditProjectStackModalOpen: false,
    currentId: 1,
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

        toggleEditProjectStackModalOpen: (state) => {
            state.isEditProjectStackModalOpen = !state.isEditProjectStackModalOpen
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
        },

        closeEditProjectStackModalOpen: (state) => {
            state.isEditProjectStackModalOpen = !state.isEditProjectStackModalOpen
        },

        setCurrentId: (state, action: PayloadAction<number>) => {
            state.currentId = action.payload
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
        toggleEditProjectStackModalOpen,
        
        closeEditSkillsModal,
        closeEditFooterModal,
        closeEditMyStackModal,
        closeSelectPeriodModal,
        closeEditProjectStackModalOpen,
        closeMenu,

        setCurrentId
    } 
     = uiSlice.actions;
export default uiSlice.reducer;