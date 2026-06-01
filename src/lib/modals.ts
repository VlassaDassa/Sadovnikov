import { AppDispatch } from "@/store";
import { toggleIsOverlayVisible, toggleEditSkillsModal, toggleEditFooterModal } from '@/store/slices/uiSlice';




export const closeModals = (dispatch: AppDispatch, modalName: string) => {
    dispatch(toggleIsOverlayVisible())

    if (modalName === 'editSkills') {
        dispatch(toggleEditSkillsModal())
    }

    if (modalName === 'editFooter') {
        dispatch(toggleEditFooterModal())
    }
}





