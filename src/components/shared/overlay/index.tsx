'use client'

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/store";
import { closeMenu, closeOverlay } from '@/store/slices/uiSlice'; 
import { closeModals } from "@/lib/modals";

import style from './index.module.scss';



const Overlay = () => {
    const isOverlayVisible = useSelector((state: RootState) => state.uiState.isOverlayVisible)
    
    const dispatch = useDispatch()

    const overlayClickHandler = async () => {
        dispatch(closeMenu())

        await closeModals(dispatch, 'editSkills')
        await closeModals(dispatch, 'editFooter')
        await closeModals(dispatch, 'editMyStack')
        await closeModals(dispatch, 'selectPeriod')
        await closeModals(dispatch, 'editProjectStack')
        await closeModals(dispatch, 'evolutionReviewModal')

        dispatch(closeOverlay())
    }

    return (
        <div 
            className={`${style.overlay} ${isOverlayVisible ? style.overlayShow : ''}`}
            onClick={async () => await overlayClickHandler()}
        >
        </div>
    )
    
}

export default Overlay;