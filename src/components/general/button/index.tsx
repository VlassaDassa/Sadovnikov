import React, { useEffect, useState } from 'react';

import Icon from '../../icons/Icon';

import bigBgBtn from './../../../assets/images/button/bg_big_btn.png';
import mediumBgBtn from './../../../assets/images/button/bg_medium_btn.png';
import smallBgBtn from './../../../assets/images/button/bg_small_btn.png';
import indexFinger from './../../../assets/images/main/index_finger.png';

import type { Breakpoint, DecorativeText } from '../../../interfaces/general';

import './index.scss';
import cssVars from './../../../assets/styles/__variables.module.scss';


interface ButtonProps {
    size?: 'big' | 'medium' | 'small';
    behaivor: 'default' | 'loading' | 'disabled';
    iconPosition?: 'noIcon' | 'leftIcon' | 'rightIcon' | 'only' | 'withIcon';
    
    variant?: 'primary' | 'secondary';
    decorativeVariant?: 'big' | 'medium' | 'small';
    decorativeBtnText?: DecorativeText;
    additionalClass?: string;

    text?: string;
    tooltipText?: string;
    icon?: string;
    onClick?: () => void;
    breakpoint: Breakpoint;
};


const Button: React.FC<ButtonProps> = ({
        size='small',
        behaivor='default',
        iconPosition='noIcon',
        variant='primary',
        decorativeBtnText,
        
        text,
        decorativeVariant,
        additionalClass,
        icon='loader',
        tooltipText,
        onClick,
        
        breakpoint
    }) => {
    const [currentSize, setCurrentSize] = useState<string>(size)
    const [btnBg, setBtnBg] = useState<string>(bigBgBtn)
    const [curText, setCurText] = useState<string>()
    const [curSizeIcon, setCurSizeIcon] = useState<number>()
    const [iconColor, setIconColor] = useState<string>(cssVars.white)
    const [decSizeLoader, setDecSizeLoader] = useState<number>(24)
    
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

    // Определение размера иконки
    const defineSizeIcon = () => {
        if (iconPosition == 'only') {
            if (breakpoint.breakpoint === 'desktop') {
                setCurSizeIcon(32)
                return
            }
        }
        setCurSizeIcon(24)
    }

    // Определение размера декоративного Loader
    const defineDecorSizeLoader = () => {
        if (decorativeVariant === 'big') {
            // Размер для большого варианта
            if (currentSize === 'big') {
                setDecSizeLoader(64)
            }
            else if (currentSize === 'medium') {
                setDecSizeLoader(44)
            }
            else {
                setDecSizeLoader(24)
            }
        }

        else if (decorativeVariant === 'medium') {
            // Размер для среднего варианта
            if (currentSize === 'big') {
                setDecSizeLoader(44)
            }
            else {
                setDecSizeLoader(24)
            }
        }

        else {
            setCurSizeIcon(24)
        }
    }

    // Определение цвета иконки
    const defineIconColor = () => {
        if (variant == 'primary') {
            setIconColor(cssVars.white)
        }
        else {
            setIconColor(cssVars.neutral_900)
        }
    }

    useEffect(() => {
        defineSize(breakpoint)
        defineBgImg()
        defineTextBtn()
        defineSizeIcon()
        defineIconColor()
    }, [breakpoint])

    
    useEffect(() => {
        defineDecorSizeLoader()
    }, [currentSize, decorativeVariant])

    
    // Декоративная кнопка
    if (decorativeVariant) {
        return (
            <div className={`decorBtn decorBtn-aboutMe decorBtn_${behaivor} decorBtn-${decorativeVariant} ${additionalClass}`}>
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
                        <Icon 
                            name='loader'
                            strokeColor={iconColor}
                            iconClass='btnLoader'
                            size={decSizeLoader}
                        />
                    :
                        <p className={`whiteText textDecorBtn textDecorBtn-${decorativeVariant} textDecorBtn-${decorativeVariant}-${currentSize}`}>{curText}</p>
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
        <button 
            className={`
                button 
                button-${currentSize} 
                button-${behaivor} 
                button-${variant} 
                button-${iconPosition}-${currentSize} 
                button-${iconPosition} 
                radius-10 
            `}
        >
            {
                iconPosition != 'only' && behaivor != 'loading' ? 
                <p 
                    className={`
                        buttonText 
                        buttonText-${currentSize} 
                        buttonText-${variant}
                    `}
                >
                    {text}
                </p>
                : null
            }

            {
                iconPosition != 'noIcon' && behaivor != 'loading' ?
                <Icon 
                    name={icon}
                    strokeColor={iconColor}
                    fillColor='none'
                    iconClass='icon-btn'
                    size={curSizeIcon}
                />
                : null

            }

            {
                behaivor == 'loading' ?
                <Icon 
                    name='loader'
                    strokeColor={iconColor}
                    iconClass='icon-btn icon-btn-loader'
                    size={curSizeIcon}
                />
                : null

            }

            {
                iconPosition == 'only' && tooltipText ?
                    <p className="shadow-xl radius-4 tooltip whiteText">{tooltipText}</p>
                :
                    null
            }
        </button>
    )
}


export default Button;