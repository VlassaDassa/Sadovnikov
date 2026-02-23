import React from 'react';

import './index.scss';

import textBox from './../../assets/images/textBox.png';
import languageTextBox from './../../assets/images/languageTextBox.png';

const Header: React.FC = () => {
    return (
        <header className="container header">
            <div className="logo">
                <img src={textBox} alt="Logo" />
                <span className="logoText">SADOVNIKOV</span>
            </div>

            <nav>
                <ul className="navBar">
                    <li>HOME</li>
                    <li>ABOUT</li>
                    <li>BLOG</li>
                    <li>PORTFOLIO</li>
                    <li className="navLanguage">
                        <img src={languageTextBox} alt="Change language" />
                        <span className="navLanguageText">RU/EN</span>

                        <div className="languageDropdown">
                            <div className="languageOption" data-lang="ru">
                                <span>Русский</span>
                                <span className="langCode">RU</span>
                            </div>
                            <div className="languageOption" data-lang="en">
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