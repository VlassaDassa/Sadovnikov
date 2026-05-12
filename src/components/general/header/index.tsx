'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import DecorButton from '../button/DecorButton';

import { toggleMenu, toggleIsOverlayVisible } from '@/store/slices/uiSlice'; 

import style from './index.module.scss';

const logoBg = '/images/button/bg_medium_btn.png'



interface SelectLangProps {
    show: boolean,
    onClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
}


const SelectLang: React.FC<SelectLangProps> = ({ show, onClick }) => {
    return (
        <div className={`${style.selectLang} 
            ${style.selectLang}-${show ? 'show' : ''} `
        }>
            <p 
                data-lang='RU' 
                className={style.selectLangItem}
                onClick={onClick}
            >
                    Русский 
                <span className={style.spanLang}>RU</span>
            </p>
            <p 
                data-lang='EN' 
                className={style.selectLangItem}
                onClick={onClick}
            >
                    Английский 
                <span className={style.spanLang}>EN</span>
            </p>
        </div>
    )
}


const Header: React.FC = () => {
    const [selectLangShow, setSelectLangShow] = useState<boolean>(false)
    const [curLang, setCurLang] = useState<string>('RU')

    const dispatch = useDispatch()

    const toggleLang = () => {
        setSelectLangShow(prev => !prev);
    };

    const changeLang = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const newLang = String(e.currentTarget.getAttribute('data-lang')) 
        setCurLang(newLang)
        toggleLang()
    }

    const burgerClickHandler = () => {
        dispatch(toggleMenu())
        dispatch(toggleIsOverlayVisible())
    }

    return (
        <header className={`${style.header} container`}>
            <Link className={style.logo} href='/' aria-label="Логотип">
                <Image 
                    src={logoBg}
                    alt="Logo"
                    fill
                    loading='eager'
                    className={style.logoImg}
                    sizes='50vw'
                />
                <p className={style.logoText}>
                    SADOVNIKOV
                </p>
            </Link>

            <button 
                className={style.btnBurger}
                aria-label="Открыть меню"
                onClick={burgerClickHandler}
            >
                <span className="radius-12"></span>
                <span className="radius-12"></span>
                <span className="radius-12"></span>
            </button>

            <nav className={style.headerNav}>
                <ul className={style.headerNavList}>
                    <li className={style.headerNavItem}>
                        <Link className={style.headerNavItemLink} href="/#contacts">Contacts</Link>
                    </li>

                    <li className={style.headerNavItem}>
                        <Link className={style.headerNavItemLink} href="/#about">About</Link>
                    </li>

                    <li className={style.headerNavItem}>
                        <Link className={style.headerNavItemLink} href="/#portfolio">Portfolio</Link>
                    </li>
                    
                    <li className={style.headerNavItem}>
                        <DecorButton
                            behavior='default'
                            variant='small'
                            text={{
                                default: curLang,
                                alter: curLang
                            }}
                            additionalClass='changeLang'
                            onClick={toggleLang}
                        />

                        <SelectLang show={selectLangShow} onClick={changeLang}  />
                    </li>
                    
                </ul>    
            </nav>  
        </header>
    )
}

export default Header;