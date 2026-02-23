import React, { useState } from 'react';

import './index.scss';

import textBox from './../../assets/images/textBox.png';
import languageTextBox from './../../assets/images/languageTextBox.png';

const Header: React.FC = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
    const [currentLang, setCurrentLang] = useState<string>('EN')


    const handleClickLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
        const lang = e.currentTarget.getAttribute('data-lang') ?? 'en'
        setCurrentLang(lang)
        document.documentElement.lang = lang;

        toggleDropdown()
        // Смена языка
        //...
    }

    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    }


    return (
        <header className="container header">
            <div className="logo">
                <img src={textBox} alt="Logo" />
                <span className="logoText">SADOVNIKOV</span>
            </div>

            <nav>
                <ul className="navBar">
                    <li><a href="#contacts">CONTACTS</a></li>
                    <li><a href="#about">ABOUT</a></li>
                    <li><a href="#">BLOG</a></li>
                    <li><a href="#portfolio">PORTFOLIO</a></li>
                    <li className="navLanguage" onClick={toggleDropdown}>
                        <img src={languageTextBox} alt="Change language" />
                        <span className="navLanguageText">{currentLang}</span>

                        <div 
                            className="languageDropdown"
                            style={{
                                opacity: isDropDownOpen ? 1 : 0,
                                visibility: isDropDownOpen ? 'visible' : 'hidden',
                                transform: isDropDownOpen ? 'translateY(0)' : 'translateY(-10px)'
                            }}
                        >
                            <div 
                                className="languageOption"
                                data-lang="RU"
                                onClick={handleClickLanguage}
                            >
                                <span>Русский</span>
                                <span className="langCode">RU</span>
                            </div>
                            <div 
                                className="languageOption"
                                data-lang="EN"
                                onClick={handleClickLanguage}
                            >
                                <span>English</span>
                                <span className="langCode">EN</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>


        </header>
    )
}

export default Header;