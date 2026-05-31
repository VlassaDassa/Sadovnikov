import { AppDispatch } from "@/store";
import { toggleIsOverlayVisible, toggleEditSkillsModal, toggleEditFooterModal } from '@/store/slices/uiSlice';


type closeModalsType = 'editSkills' | 'editFooter'

export const closeModals = (dispatch: AppDispatch, modalName: closeModalsType) => {
    dispatch(toggleIsOverlayVisible())

    if (modalName === 'editSkills') {
        dispatch(toggleEditSkillsModal())
    }

    if (modalName === 'editFooter') {
        dispatch(toggleEditFooterModal())
    }
}





