'use client' 

import React from "react";

import AdaptiveImage from "@/components/shared/AdaptiveImage";

import { footerItems } from "@/mockData/footer";
import { useCopy } from "@/hooks/useCopy";

import style from './index.module.scss';



interface ContactItemProps {
    link?: string,
    icon: string,
    text: string,
}


const ContactItem: React.FC<ContactItemProps> = ({ icon, text, link }) => {
    const { copy, copied } = useCopy();

    if (!link) {
        return (
            <div className={style.footerItemWrapper} onClick={() => copy(text)}>
                <div className={style.footerIconWrapper}>
                    <AdaptiveImage 
                        src={icon}
                        wrapClass={style.icon}
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
                <AdaptiveImage 
                    src={icon}
                    wrapClass={style.icon}
                />
            </div>
            <p className={style.footerText}>{text}</p>
        </a>
        )
    }
}



const Footer: React.FC = () => {
    return (
        <footer className={style.footer}>
            <div className={`container ${style.footerWrapper}`}>
                {
                    footerItems.map((item) => (
                        <ContactItem
                            key={item.id}
                            text={item.text}
                            link={item?.link}
                            icon={item.icon}
                        />
                    ))
                }
            </div>
        </footer>
    )
}

export default Footer