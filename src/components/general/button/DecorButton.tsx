import React from 'react';

import Icon from '../../icons/Icon';

import bigBgBtn from './../../../assets/images/button/bg_big_btn.png';
import mediumBgBtn from './../../../assets/images/button/bg_medium_btn.png';
import smallBgBtn from './../../../assets/images/button/bg_small_btn.png';
import indexFinger from './../../../assets/images/main/index_finger.png';

import type { Breakpoint } from '../../../interfaces/general';

import cssVars from './../../../assets/styles/__variables.module.scss';
import './decorButton.scss';



interface DecorativeText {
    default: string,
    alter: string
}


interface DecorButtonProps {
    behavior: 'default' | 'loading' | 'disabled';
    
    variant: 'big' | 'medium' | 'small';
    text: DecorativeText;
    additionalClass?: string;

    onClick?: () => void;
    breakpoint: Breakpoint;
};


const DecorButton: React.FC<DecorButtonProps> = ({
    behavior='default',
    variant='medium',
    text={ default:'Button', alter:'btn' },

    additionalClass,
    onClick,
    breakpoint
}) => {

    const size = breakpoint === 'desktop' ? 'big' :
                                breakpoint === 'tablet' ? 'medium' : 'small'
    
    const curText = breakpoint === 'mobile' ? text.alter : text.default 

    const bgBtn = variant === 'big' ? bigBgBtn:
                        variant === 'medium' ? mediumBgBtn: smallBgBtn; 


    // Определение размера декоративного Loader
    const defineSizeLoader = () => {
        if (variant === 'big') {
            // Размер для большого варианта
            if (size === 'big') {
                return 64
            }
            else if (size === 'medium') {
                return 44
            }
            else {
                return 24
            }
        }

        else if (variant === 'medium') {
            // Размер для среднего варианта
            if (size === 'big') {
                return 44
            }
            else {
                return 24
            }
        }
        else {
            return 24
        }
    }

    // Если ожидание загрузки, вместо текста - иконка
    const buttonContent = (
                behavior === 'loading' ? 
                    <Icon 
                        name='loader'
                        strokeColor={cssVars.white}
                        iconClass='btnLoader'
                        size={defineSizeLoader()}
                    />
                :
                    <p className={`whiteText textDecorBtn textDecorBtn-${variant} textDecorBtn-${variant}-${size}`}>{curText}</p>
    )

    // Если вариант кнопки "big", показывать характерные элементы
    const variantElements = (
        variant === 'big' ?
                    <>
                        <img 
                            src={indexFinger} 
                            alt="" 
                            aria-hidden='true'
                            className={
                                `decorBtnIcon 
                                decorBtnIconPosition_${behavior} 
                                decorBtnIcon_${size}
                                ` 
                            }
                        />

                        <p className={`decorBtnLabel lightText decorBtnLabel_${size}`}>(click)</p>
                    </>
                :
                    null 
    )

    return (
        <div tabIndex={0} role='button' className={`decorBtn decorBtn-${additionalClass} decorBtn_${behavior} decorBtn-${variant}`}>
            <img 
                 
                className={
                    `decorBgBtnBig 
                    decorBgBtn-${variant}-${size} 
                    decorBgBtn-${variant}-${behavior}`
                } 
                src={bgBtn} 
                alt="" 
                aria-hidden='true'
            />
            {buttonContent}
            {variantElements}
        </div>
    )
}

export default DecorButton;
