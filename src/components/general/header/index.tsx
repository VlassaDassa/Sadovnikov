import React, { useState } from 'react';

import DecorButton from '../button/DecorButton';
import type { Breakpoint } from '../../../interfaces/general';

import './index.scss';



interface HeaderProps {
    breakpoint: Breakpoint
}

interface SelectLangProps {
    show: boolean,
    onClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
}


const SelectLang: React.FC<SelectLangProps> = ({ show, onClick }) => {
    return (
        <div className={`selectLang selectLang-${show ? 'show' : ''}`}>
            <p 
                data-lang='RU' 
                className="selectLangItem"
                onClick={onClick}
            >
                
                    Русский 
                <span className="spanLang">RU</span>
            </p>
            <p 
                data-lang='EN' 
                className="selectLangItem"
                onClick={onClick}
            >
                    Английский 
                <span className="spanLang">EN</span>
            </p>
        </div>
    )
}


const Header: React.FC<HeaderProps> = ({ breakpoint }) => {
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
        <header className="header container">
            <a className="logo" href="#" aria-label="Логотип">
                <p className="logoText">
                    SADOVNIKOV
                </p>
            </a>

            <button 
                className="btnBurger radius-full"
                aria-label="Открыть меню"
            >
                <span className="radius-12"></span>
                <span className="radius-12"></span>
                <span className="radius-12"></span>
            </button>

            <nav className="headerNav">
                <ul className="headerNavList" >
                    <li className="headerNavItem">
                        <a className="headerNavItemLink" href="#">Contacts</a>
                    </li>

                    <li className="headerNavItem">
                        <a className="headerNavItemLink" href="#">About</a>
                    </li>

                    <li className="headerNavItem">
                        <a className="headerNavItemLink" href="#">Blog</a>
                    </li>

                    <li className="headerNavItem">
                        <a className="headerNavItemLink" href="#">Portfolio</a>
                    </li>
                    
                    <li className="headerNavItem">
                        <DecorButton
                            behavior='default'
                            variant='small'
                            text={{
                                default: curLang,
                                alter: curLang
                            }}
                            additionalClass='changeLang'
                            breakpoint={breakpoint}
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