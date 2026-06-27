import { AppDispatch } from "@/store";
import { 
    toggleIsOverlayVisible, 
    toggleEditSkillsModal, 
    toggleEditFooterModal, 
    toggleEditMyStackModal,
    toggleSelectPeriodModal,
    toggleEditProjectStackModal
} from '@/store/slices/uiSlice';




export const closeModals = (dispatch: AppDispatch, modalName: string) => {
    dispatch(toggleIsOverlayVisible())

    if (modalName === 'editSkills') {
        dispatch(toggleEditSkillsModal())
    }

    if (modalName === 'editFooter') {
        dispatch(toggleEditFooterModal())
    }

    if (modalName === 'editMyStack') {
        dispatch(toggleEditMyStackModal())
    }

    if (modalName === 'selectPeriod') {
        dispatch(toggleSelectPeriodModal())
    }

    if (modalName === 'editProjectStack') {
        dispatch(toggleEditProjectStackModal())
    }
}





