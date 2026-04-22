'use client'

import React from "react";

import { useSelector } from "react-redux";

import Icon from "@/components/icons/Icon";

import { RootState } from "@/store";

import style from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';


const Menu = () => {
    const isMenuOpen = useSelector((state: RootState) => state.uiState.isMenuOpen)

    if (isMenuOpen) {
        return (
            <div className={style.menu}>
                <Icon 
                    name='home'
                    strokeColor={cssVars.neutral_300}
                    fillColor={cssVars.neutral_300}
                    size={35}
                />

                <nav className={style.menu}>
                    <ul className={style.menuList}>
                        <li className={style.listItem}>
                            <p className={style.listItemText}>CONTACTS</p>
                            <Icon 
                                name='link'
                                strokeColor={cssVars.neutral_300}
                                fillColor={cssVars.neutral_300}
                                size={20}
                            />
                        </li>
                        <li className={style.listItem}>
                            <p className={style.listItemText}>ABOUT</p>
                            <Icon 
                                name='link'
                                strokeColor={cssVars.neutral_300}
                                fillColor={cssVars.neutral_300}
                                size={20}
                            />
                        </li>
                        <li className={style.listItem}>
                            <p className={style.listItemText}>BLOG</p>
                            <Icon 
                                name='link'
                                strokeColor={cssVars.neutral_300}
                                fillColor={cssVars.neutral_300}
                                size={20}
                            />
                        </li>
                        <li className={style.listItem}>
                            <p className={style.listItemText}>PORTFOLIO</p>
                            <Icon 
                                name='link'
                                strokeColor={cssVars.neutral_300}
                                fillColor={cssVars.neutral_300}
                                size={20}
                            />
                        </li>
                    </ul>
                </nav>

                <div className={style.selectLang}>
                    <span className={style.selectLangItem}>RU</span>
                    <span className={style.selectLangItem}>EN</span>
                </div>
            </div>
        )
    }
    else {
        return null
    }

    
}

export default Menu;