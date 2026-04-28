'use client'

import React from "react";

import { useSelector } from "react-redux";

import Icon from "@/components/icons/Icon";

import { RootState } from "@/store";
import { cssVars } from "@/styles/cssVariables";

import style from './index.module.scss';


const GlobalLoader: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.loader.isLoading)

    if (!isLoading) return null;

    return (
        <div className={style.globalLoader}>
            <div className={style.loader} />
            <Icon 
                name='loader'
                strokeColor={cssVars.brand_600}
                iconClass={style.loader}
                size={64}
            />
            <p className={style.text} >Loading...</p>
        </div>
    )
}

export default GlobalLoader;