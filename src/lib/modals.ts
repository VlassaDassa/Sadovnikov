import { AppDispatch } from "@/store";
import { 
    toggleIsOverlayVisible, 

    closeEditFooterModal, 
    closeEditSkillsModal, 
    closeEditMyStackModal, 
    closeSelectPeriodModal,
    closeEditProjectStackModal,
} from '@/store/slices/uiSlice';


// Эта переменная существует на уровне файла, а не внутри компонента
const beforeCloseCallbacks: Record<string, () => Promise<void>> = {};

export const registerBeforeClose = (modalName: string, callback: () => Promise<void>) => {
    beforeCloseCallbacks[modalName] = callback;
};

export const unregisterBeforeClose = (modalName: string) => {
    delete beforeCloseCallbacks[modalName];
};

export const closeModals = async (dispatch: AppDispatch, modalName: string) => {
    if (beforeCloseCallbacks[modalName]) {
        await beforeCloseCallbacks[modalName]();
    }

    dispatch(toggleIsOverlayVisible());

    switch (modalName) {
        case 'editSkills':
            dispatch(closeEditSkillsModal());
            break;
        case 'editFooter':
            dispatch(closeEditFooterModal());
            break;
        case 'editMyStack':
            dispatch(closeEditMyStackModal());
            break;
        case 'selectPeriod':
            dispatch(closeSelectPeriodModal());
            break;
        case 'editProjectStack':
            dispatch(closeEditProjectStackModal());
            break;

        default:
            break;
    }
};







