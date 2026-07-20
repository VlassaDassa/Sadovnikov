import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UIState {
    isOverlayVisible: boolean,
    isMenuOpen: boolean,
    isEditSkillsModalOpen?: boolean,
    isEditFooterModalOpen?: boolean,
    isEditMyStackModalOpen?: boolean,
    isSelectPeriodModalOpen?: boolean,
    isEditProjectStackModalOpen?: boolean,
    isEvolutionReviewModal?: boolean,
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
    isEvolutionReviewModal: false,
    currentId: 1,
    bodyScroll: true,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleIsOverlayVisible: (state) => {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            state.isOverlayVisible = !state.isOverlayVisible
            state.bodyScroll = !state.bodyScroll
            
            if (state.bodyScroll) {
                document.documentElement.style.overflow = 'auto';
                document.documentElement.style.paddingRight = '0';
            }
            else {
                document.documentElement.style.overflow = 'hidden';
                document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
            }
        },

        closeOverlay: (state) => {
            state.isOverlayVisible = false;
            document.documentElement.style.overflow = 'auto';
            document.documentElement.style.paddingRight = '0';
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

        toggleEditProjectStackModal: (state) => {
            state.isEditProjectStackModalOpen = !state.isEditProjectStackModalOpen
        },

        toggleEvolutionReviewModal: (state) => {
            state.isEvolutionReviewModal = !state.isEvolutionReviewModal
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

        closeEditProjectStackModal: (state) => {
            state.isEditProjectStackModalOpen = false
        },

        closeEvolutionReviewModal: (state) => {
            state.isEvolutionReviewModal = false        
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
        toggleEditProjectStackModal,
        toggleEvolutionReviewModal,
        
        closeEditSkillsModal,
        closeEditFooterModal,
        closeEditMyStackModal,
        closeSelectPeriodModal,
        closeEditProjectStackModal,
        closeEvolutionReviewModal,
        closeOverlay,
        closeMenu,

        setCurrentId
    } 
     = uiSlice.actions;
export default uiSlice.reducer;