import { AppDispatch } from "@/store";
import { toggleIsOverlayVisible, toggleEditSkillsModal } from '@/store/slices/uiSlice';


type closeModalsType = 'editSkills' | ''

export const closeModals = (dispatch: AppDispatch, modalName: closeModalsType) => {
    dispatch(toggleIsOverlayVisible())

    if (modalName === 'editSkills') {
        dispatch(toggleEditSkillsModal())
    }
}





