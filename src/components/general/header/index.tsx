'use client'

import React, { useState } from 'react';

import DecorButton from '../button/DecorButton';

import style from './index.module.scss';





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

    const toggleLang = () => {
        setSelectLangShow(prev => !prev);
    };

    const changeLang = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const newLang = String(e.currentTarget.getAttribute('data-lang')) 
        setCurLang(newLang)
        toggleLang()
    }

    return (
        <header className={`${style.header} container`}>
            <a className={style.logo} href="#" aria-label="Логотип">
                <p className={style.logoText}>
                    SADOVNIKOV
                </p>
            </a>

            <button 
                className={style.btnBurger}
                aria-label="Открыть меню"
            >
                <span className="radius-12"></span>
                <span className="radius-12"></span>
                <span className="radius-12"></span>
            </button>

            <nav className={style.headerNav}>
                <ul className={style.headerNavList}>
                    <li className={style.headerNavItem}>
                        <a className={style.headerNavItemLink} href="#">Contacts</a>
                    </li>

                    <li className={style.headerNavItem}>
                        <a className={style.headerNavItemLink} href="#">About</a>
                    </li>

                    <li className={style.headerNavItem}>
                        <a className={style.headerNavItemLink} href="#">Blog</a>
                    </li>

                    <li className={style.headerNavItem}>
                        <a className={style.headerNavItemLink} href="#">Portfolio</a>
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