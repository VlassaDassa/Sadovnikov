import React from 'react';

import './index.scss';



const Header: React.FC = () => {
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
        </header>
    )
}

export default Header;