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
                    </li>
                </ul>
            </nav>


        </header>
    )
}

export default Header;