'use client' 

import React from "react";
import { useSelector } from "react-redux";

import Icon from "../../../shared/icons/Icon";

import { RootState } from "@/store";
import { cssVars } from "@/styles/cssVariables";

import style from './index.module.scss';
import { useCopy } from "@/hooks/useCopy";



interface ContactItemProps {
    type: 'link' | 'copyText',
    iconSize?: number;
    link?: string,
    name: string,
    text: string,
    copyText?: string,
}


const ContactItem: React.FC<ContactItemProps> = ({ copyText='', type, iconSize, name, text, link }) => {
    const { copy, copied } = useCopy();

    if (type === 'copyText') {
        return (
            <div className={style.footerItemWrapper} onClick={() => copy(copyText)}>
                <div className={style.footerIconWrapper}>
                    <Icon 
                        iconClass={style.footerIcon}
                        name={name} 
                        strokeColor={'none'}
                        size={iconSize}
                        fillColor={cssVars.neutral_300}
                    />
                </div>

                <p className={style.footerText}>{text}</p>

                {copied && <span className='copyText'>Скопировано!</span>}
            </div>
        )
    }

    else {
        return (
            <a href={link} target="_blank" className={style.footerItemWrapper}>
            <div className={style.footerIconWrapper}>
                <Icon 
                    iconClass={style.footerIcon}
                    name={name}
                    strokeColor={'none'}
                    size={iconSize}
                    fillColor={cssVars.neutral_300}
                />
            </div>
            <p className={style.footerText}>{text}</p>
        </a>
        )
    }
}



const Footer: React.FC = () => {
    const iconSize = () => {
        const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
        return breakpoint === 'mobile' ? 20 : 32
    }


    return (
        <footer className={style.footer}>
            <div className={`container ${style.footerWrapper}`}>
                <ContactItem 
                    type='copyText'
                    text='vlad.sad28@yandex.ru'
                    iconSize={iconSize()}
                    name='email'
                    copyText='vlad.sad28@yandex.ru'
                />

                <ContactItem 
                    type='copyText'
                    text='+7 (900) 015-81-16'
                    iconSize={iconSize()}
                    name='phone'
                    copyText='+7 (900) 015-81-16'
                />

                <ContactItem 
                    type='link'
                    text='@VlassaDassa'
                    iconSize={iconSize()}
                    name='telegram'
                    link='https://t.me/VlassaDassa'
                />
            </div>
        </footer>
    )
}

export default Footer