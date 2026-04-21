import React from "react";

import Icon from "../../icons/Icon";

import type { Breakpoint } from "@/interfaces/general";

import { cssVars } from "@/styles/cssVariables";

import style from './index.module.scss';



interface FooterProps {
    breakpoint: Breakpoint;
}


const Footer: React.FC<FooterProps> = ({ breakpoint }) => {

    const iconSize = () => {
        return breakpoint === 'mobile' ? 20 : 32
    }


    return (
        <footer className={style.footer}>
            <div className={`container ${style.footerWrapper}`}>
                <a href="#" className={style.footerItemWrapper}>
                    <div className={style.footerIconWrapper}>
                        <Icon 
                            iconClass={style.footerIcon}
                            name='email' 
                            strokeColor={'none'}
                            size={iconSize()}
                            fillColor={cssVars.neutral_300}
                        />
                    </div>

                    <p className={style.footerText}>vlad.sad28@yandex.ru</p>
                </a>

                <a href="#" className={style.footerItemWrapper}>
                    <div className={style.footerIconWrapper}>
                        <Icon 
                            iconClass={style.footerIcon}
                            name='phone' 
                            fillColor="none"
                            size={iconSize()}
                            strokeColor={cssVars.neutral_300}
                        />
                    </div>
                    <p className={style.footerText}>+7 (900) 015-81-16</p>
                </a>

                <a href="#" className={style.footerItemWrapper}>
                    <div className={style.footerIconWrapper}>
                        <Icon 
                            iconClass={style.footerIcon}
                            name='telegram' 
                            strokeColor={'none'}
                            size={iconSize()}
                            fillColor={cssVars.neutral_300}
                        />
                    </div>
                    <p className={style.footerText}>@VlassaDassa</p>
                </a>
            </div>
        </footer>
    )
}

export default Footer