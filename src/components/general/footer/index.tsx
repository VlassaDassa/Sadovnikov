import React from "react";

import Icon from "../../icons/Icon";

import type { Breakpoint } from "../../../interfaces/general";

import cssVars from './../../../assets/styles/__variables.module.scss';

import './index.scss';


interface FooterProps {
    breakpoint: Breakpoint;
}


const Footer: React.FC<FooterProps> = ({ breakpoint }) => {

    const iconSize = () => {
        return breakpoint === 'mobile' ? 20 : 32
    }



    return (
        <footer className="footer">
            <div className="container footerWrapper">
                <a href="#" className="footerItemWrapper">
                    <div className="footerIconWrapper">
                        <Icon 
                            iconClass='footerIcon'
                            name='email' 
                            strokeColor={'none'}
                            size={iconSize()}
                            fillColor={cssVars.neutral_300}
                        />
                    </div>

                    <p className="footerText">vlad.sad28@yandex.ru</p>
                </a>

                <a href="#" className="footerItemWrapper">
                    <div className="footerIconWrapper">
                        <Icon 
                            iconClass='footerIcon'
                            name='phone' 
                            fillColor="none"
                            size={iconSize()}
                            strokeColor={cssVars.neutral_300}
                        />
                    </div>
                    <p className="footerText">+7 (900) 015-81-16</p>
                </a>

                <a href="#" className="footerItemWrapper">
                    <div className="footerIconWrapper">
                        <Icon 
                            iconClass='footerIcon'
                            name='telegram' 
                            strokeColor={'none'}
                            size={iconSize()}
                            fillColor={cssVars.neutral_300}
                        />
                    </div>
                    <p className="footerText">@VlassaDassa</p>
                </a>
            </div>
        </footer>
    )
}

export default Footer