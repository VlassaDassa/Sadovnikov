'use client'

import React from 'react';
import { useSelector } from 'react-redux';

import Icon from '../../icons/Icon';

import { RootState } from '@/store';

import { cssVars } from "@/styles/cssVariables";
import style from './decorButton.module.scss';


const bigBgBtn = '/images/button/bg_big_btn.png';
const mediumBgBtn = '/images/button/bg_medium_btn.png';
const smallBgBtn = '/images/button/bg_small_btn.png';
const indexFinger = '/images/main/index_finger.png';

interface DecorativeText {
    default: string,
    alter: string
}


interface DecorButtonProps {
    behavior: 'default' | 'loading' | 'disabled';
    
    variant: 'big' | 'medium' | 'small';
    text: DecorativeText;
    additionalClass?: string;

    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};


const DecorButton: React.FC<DecorButtonProps> = ({
    behavior='default',
    variant='medium',
    text={ default:'Button', alter:'btn' },

    additionalClass,
    onClick,
}) => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)



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
                        iconClass={style.btnLoader}
                        size={defineSizeLoader()}
                    />
                :
                    <p 
                        className={`${style.textDecorBtn} 
                            ${style[`textDecorBtn-${variant}`]} 
                            ${style[`textDecorBtn-${variant}-${size}`]} 
                        `}
                    >
                        {curText}
                    </p>
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
                                `${style.decorBtnIcon} 
                                ${style[`decorBtnIconPosition_${behavior}`]} 
                                ${style[`decorBtnIcon_${size}`]} 
                                ` 
                            }
                        />

                        <p 
                            className={`${style.decorBtnLabel} 
                                ${style[`decorBtnLabel_${size}`]} 
                            `}
                        >
                            (click)
                        </p>
                    </>
                :
                    null 
    )

    return (
        <div 
            tabIndex={0}
            role='button' 
            className={`${style.decorBtn} 
                ${style[`decorBtn-${additionalClass}`]} 
                ${style[`decorBtn_${behavior}`]} 
                ${style[`decorBtn_${variant}`]} 
            `}
            onClick={onClick}
        >
            <img 
                 
                className={
                    `${style.decorBgBtnBig} 
                    ${style[`decorBgBtn-${variant}-${size}`]} 
                    ${style[`decorBgBtn-${variant}-${behavior}`]} 
                    `
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
