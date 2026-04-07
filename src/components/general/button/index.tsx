import React, { useEffect, useState } from 'react';

import bigBgBtn from './../../../assets/images/button/bg_big_btn.png';
import mediumBgBtn from './../../../assets/images/button/bg_medium_btn.png';
import smallBgBtn from './../../../assets/images/button/bg_small_btn.png';
import indexFinger from './../../../assets/images/main/index_finger.png';
import loader from './../../../assets/images/icons/loader.svg';

import type { Breakpoint, DecorativeText } from '../../../interfaces/general';

import './index.scss';



interface ButtonProps {
    size?: 'big' | 'medium' | 'small';
    behaivor?: 'default' | 'loading' | 'disabled';
    iconPosition?: 'noIcon' | 'leftIcon' | 'rightIcon' | 'only' | 'withIcon';
    
    variant?: 'primary' | 'secondary';
    decorativeVariant?: 'big' | 'medium' | 'small';
    decorativeBtnText?: DecorativeText,

    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    breakpoint: Breakpoint
};


const Button: React.FC<ButtonProps> = ({
        size='small',
        behaivor='default',
        iconPosition='noIcon',
        variant='primary',
        decorativeBtnText,
        
        text,
        decorativeVariant,
        icon,
        onClick,
        
        breakpoint
    }) => {
    const [currentSize, setCurrentSize] = useState<string>(size)
    const [btnBg, setBtnBg] = useState<string>(bigBgBtn)
    const [curText, setCurText] = useState<string>()
    
    // Определение текста
    const defineTextBtn = () => {
        // Сокращение текста для мобильной версии
        if (decorativeBtnText) {
            if (breakpoint && String(breakpoint.breakpoint) === 'mobile') {
                setCurText(decorativeBtnText.alter)
            }
            else {
                setCurText(decorativeBtnText.default)
            }
        }
        else if (text) {
            setCurText(text)
        }
    }
    
    // Определение фонового изображения для декоративной кнопки
    const defineBgImg = () => {
        if (!decorativeVariant) return

        if (decorativeVariant === 'big') setBtnBg(bigBgBtn);
        else if (decorativeVariant === 'medium') setBtnBg(mediumBgBtn);
        else setBtnBg(smallBgBtn);
    };

    // Определение размера по ширине
    const defineSize = (breakpoint: Breakpoint) => {
        if (breakpoint.breakpoint === 'desktop') setCurrentSize('big');
        else if (breakpoint.breakpoint === 'tablet') setCurrentSize('medium');
        else setCurrentSize('small');  
    };

    useEffect(() => {
        defineSize(breakpoint)
        defineBgImg()
        defineTextBtn()
    }, [breakpoint])

    
    // Декоративная кнопка
    if (decorativeVariant) {
        return (
            <div className={`decorBtn decorBtn-aboutMe decorBtn_${behaivor}`}>
                <img 
                    role='button' 
                    className={
                        `decorBgBtnBig 
                        decorBgBtn-${decorativeVariant}-${currentSize} 
                        decorBgBtn-${decorativeVariant}-${behaivor}`
                    } 
                    src={btnBg} 
                    alt="" 
                    aria-hidden='true'
                />
                {
                    behaivor == 'loading' ? 
                        <img src={loader} alt="Loading..." className={`btnLoader btnLoader_${currentSize}`} />
                    :
                        <p className={`whiteText textDecorBtn textDecorBtn-${decorativeVariant}-${currentSize}`}>{curText}</p>
                }

                {
                    decorativeVariant === 'big' ?
                        <>
                            <img 
                                src={indexFinger} 
                                alt="" 
                                aria-hidden='true'
                                className={
                                    `decorBtnIcon 
                                    decorBtnIcon_${iconPosition} 
                                    decorBtnIconPosition_${behaivor} 
                                    decorBtnIcon_${currentSize}
                                    ` 
                                }
                            />

                            <p className={`decorBtnLabel lightText decorBtnLabel_${currentSize}`}>(click)</p>
                        </>
                    :
                        null 

                }
            </div>
        )
    }
    

    // Обычная кнопка
    return (
        <button className="button">Button</button>
    )

    
}

export default Button;