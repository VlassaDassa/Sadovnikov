'use client'

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/store";
import { closeMenu, closeEditFooterModal, closeEditSkillsModal, toggleIsOverlayVisible } from '@/store/slices/uiSlice'; 

import style from './index.module.scss';



const Overlay = () => {
    const isOverlayVisible = useSelector((state: RootState) => state.uiState.isOverlayVisible)
    
    const dispatch = useDispatch()

    const overlayClickHandler = () => {
        dispatch(closeMenu())
        dispatch(closeEditSkillsModal())
        dispatch(closeEditFooterModal())
        dispatch(toggleIsOverlayVisible())
    }

    return (
        <div 
            className={`${style.overlay} ${isOverlayVisible ? style.overlayShow : ''}`}
            onClick={overlayClickHandler}
        >

        </div>
    )
    
}

export default Overlay;