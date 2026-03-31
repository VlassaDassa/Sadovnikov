import React from 'react';

import './index.scss';



const Header: React.FC = () => {
    return (
        <header className="header container">
            <a className="btn logo" href="#" aria-label="Логотип">
                <p className="btnText body-16-magra-bold whiteText">
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