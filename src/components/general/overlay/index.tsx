'use client'

import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

import style from './index.module.scss';



const Overlay = () => {
    const isOverlayVisible = useSelector((state: RootState) => state.uiState.isOverlayVisible)
    console.log('Overlay - ', isOverlayVisible)
    return <>overlay</>
}

export default Overlay;