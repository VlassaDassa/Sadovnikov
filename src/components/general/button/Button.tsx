import React from 'react';

import Icon from '../../icons/Icon';

import type { Breakpoint } from '@/interfaces/general';

import { cssVars } from '@/styles/cssVariables';
import style from './button.module.scss';


interface ButtonProps {
    behavior: 'default' | 'loading' | 'disabled';
    iconPosition: 'noIcon' | 'leftIcon' | 'rightIcon' | 'only';
    
    variant: 'primary' | 'secondary';
    additionalClass?: string;

    text?: string;
    tooltipText?: string;
    icon?: string;
    onClick?: () => void;
    breakpoint: Breakpoint;
};


const Button: React.FC<ButtonProps> = ({
        behavior='default',
        iconPosition='noIcon',
        variant='primary',
        
        additionalClass,
        text,
        icon,
        tooltipText,
        onClick,
        
        breakpoint
    }) => {
    
    const size = breakpoint === 'desktop' ? 'big' :
                            breakpoint === 'tablet' ? 'medium' : 'small'

    const sizeIcon = iconPosition === 'only' ? 
                            breakpoint === 'desktop' ? 32 : 24
                        : 24

    const iconColor = variant === 'primary' ? cssVars.white : cssVars.neutral_900

    
    const contentButton = (
        iconPosition !== 'only' && behavior !== 'loading' ? 
                <p 
                    className={`
                        ${style.buttonText} 
                        ${style[`buttonText-${size}`]} 
                        ${style[`buttonText-${variant}`]} 
                    `}
                >
                    {text}
                </p>
                : null
    )

    const iconButton = (
        iconPosition !== 'noIcon' && behavior !== 'loading' ?
            <Icon 
                name={icon || 'loader'}
                strokeColor={iconColor}
                fillColor='none'
                iconClass='icon-btn'
                size={sizeIcon}
            />
            : null
    )

    const loader = (
        behavior === 'loading' ?
                <Icon 
                    name='loader'
                    strokeColor={iconColor}
                    iconClass='icon-btn icon-btn-loader'
                    size={sizeIcon}
                />
                : null
    )

    const toolTip = (
        iconPosition === 'only' && tooltipText ?
            <p role="tooltip" className={style.tooltip}>{tooltipText}</p>
        :
            null
    )

    
    return (
        <button 
            disabled={behavior === 'disabled'}
            className={`
                ${style.button} 
                ${style[`button-${size}`]} 
                ${style[`button-${behavior}`]} 
                ${style[`button-${variant}`]} 
                ${style[`button-${iconPosition}-${size}`]} 
                ${style[`button-${iconPosition}`]} 
                ${style[`button-${additionalClass}`]} 
            `}
        >
            {contentButton}
            {iconButton}
            {loader}
            {toolTip}

        </button>
    )
}


export default Button;