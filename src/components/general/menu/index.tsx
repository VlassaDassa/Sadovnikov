'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { useSelector, useDispatch } from "react-redux";

import NoiseBackground from "../NoizeBg";
import Icon from "@/components/icons/Icon";

import { RootState } from "@/store";
import { toggleMenu, toggleIsOverlayVisible } from '@/store/slices/uiSlice'; 

import style from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';



const Menu = () => {
    const isMenuOpen = useSelector((state: RootState) => state.uiState.isMenuOpen)
    const [curLang, setCurLang] = useState<'RU' | 'EN'>('EN')
    const router = useRouter();

    useEffect(() => {
        if (isMenuOpen) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
        }
        
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [isMenuOpen]);


    const dispatch = useDispatch()

    const homeClickHandler = () => {
        dispatch(toggleMenu())
        dispatch(toggleIsOverlayVisible())
    }

    const linkClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); 
        const href = e.currentTarget.getAttribute('href');
        dispatch(toggleMenu());
        dispatch(toggleIsOverlayVisible());
        router.push(href || '/');
    }

    const langClickHandler = () => {
        setCurLang(prev => prev === 'RU' ? 'EN' : 'RU')
    }

    return (
        <div className={`${style.menu} ${isMenuOpen ? style.menuShow : ''}`}>
            <NoiseBackground />

            <div onClick={homeClickHandler} className={style.iconWrapper}>
                <Icon 
                    name='home'
                    strokeColor={cssVars.neutral_300}
                    fillColor={cssVars.neutral_300}
                    iconClass={style.homeIcon}
                    size={35}
                />
            </div>

            <nav className={style.menuNav}>
                <ul className={style.menuList}>
                    <li>
                        <Link className={style.listItem} href="/#contacts" onClick={linkClickHandler}>
                            <p className={style.listItemText}>CONTACTS</p>
                            <Icon 
                                name='link'
                                strokeColor={cssVars.neutral_300}
                                fillColor={cssVars.neutral_300}
                                size={20}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link className={style.listItem} href="/#about" onClick={linkClickHandler}>
                            <p className={style.listItemText}>ABOUT</p>
                            <Icon 
                                name='link'
                                strokeColor={cssVars.neutral_300}
                                fillColor={cssVars.neutral_300}
                                size={20}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link className={style.listItem} href="/#portfolio" onClick={linkClickHandler}>
                            <p className={style.listItemText}>PORTFOLIO</p>
                            <Icon 
                                name='link'
                                strokeColor={cssVars.neutral_300}
                                fillColor={cssVars.neutral_300}
                                size={20}
                            />
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={style.selectLang} onClick={langClickHandler}>
                <span className={`${style.selectLangItem} ${style.selectLangItem_1}`}>RU</span>
                <span className={`${style.selectLangItem} ${style.selectLangItem_2}`}>EN</span>
                <div className={`${style.selectedLang} ${curLang === 'EN' ? style.selectedLang_right : ''}`}></div>
            </div>
        </div>
    )
  

    
}

export default Menu;