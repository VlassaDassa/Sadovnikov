import React, { useState, useEffect, useRef } from 'react';

import Icon from '../../icons/Icon';

import type { Breakpoint } from '../../../interfaces/general';

import cssVars from './../../../assets/styles/__variables.module.scss';

import './index.scss';


interface Icon {
    first?: string,
    second?: string
}
 
interface InputProps {
    name: string,
    placeholder?: string,
    additionalClass?: string,
    icon?: Icon,
    type?: 'text' | 'textarea' | 'email' | 'password',
    iconPosition: 'noIcon' | 'iconLeft' | 'iconRight' | 'iconBoth',
    value?: string,
    breakpoint: Breakpoint,
    maxLen?: number,

    error?: string,

    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}


const Input: React.FC<InputProps> = ({
    placeholder,
    name,
    value,
    type='text',
    additionalClass='',
    icon,
    iconPosition,
    breakpoint,
    maxLen,

    error,
    onChange,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (type === 'textarea' && textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [value])

    
    const iconColor = {
        strokeColor: (isHovered ? cssVars.neutral_400 :
            value?.length === 0 ? cssVars.neutral_600 :
            cssVars.white), // <- Белый во всех случаях кроме empty и hover
        fillColor: 'none'
    }


    const iconFirst = (
        (iconPosition === 'iconLeft' || iconPosition === 'iconBoth') && icon?.first ?
            <Icon 
                name={icon.first}
                iconClass={`inputIcon inputIconLeft`}
                strokeColor={iconColor.strokeColor}
                fillColor={iconColor.fillColor}
                size={
                    breakpoint === 'desktop' ? 24 : 20
                }
            />
        : null
    )

    const errorEl = error ? <p className="inputErrorText">{error}</p> : null

    const iconBoth = (
        iconPosition === 'iconBoth' && icon?.second  ?
            <Icon 
                name={icon.second}
                strokeColor={iconColor.strokeColor}
                fillColor={iconColor.fillColor}
                aria-label={placeholder || name}
                iconClass='inputIcon inputIconRight'
                size={
                    breakpoint === 'desktop' ? 24 : 20
                }
            />
        : null
    )

    const iconRight = (
        iconPosition === 'iconRight' && icon?.first ?
            <Icon 
                name={icon.first}
                strokeColor={iconColor.strokeColor}
                fillColor={iconColor.fillColor}
                iconClass='inputIcon inputIconRight'
                size={
                    breakpoint === 'desktop' ? 24 : 20
                }
            />
        : null
    )

    const inputClass = (
        `input 
        ${additionalClass} 
        ${iconPosition !== 'noIcon' ? 'inputWithIcon' : ''}  
        ${error ? 'inputError' : ''} 
        ${type === 'textarea' ? 'input-textarea' : ''} 
        `
    )


    return (
        <div 
            className={`inputWrapper inputWrapper-${type}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {iconFirst}

            {
                type !== 'textarea' ?
                    <input 
                        type={type} 
                        className={inputClass}
                        placeholder={placeholder}
                        value={value}
                        aria-label={placeholder || name}
                        name={name}
                        onChange={onChange}  
                    />
                :
                    <textarea 
                        className={inputClass}
                        placeholder={placeholder}
                        value={value}
                        name={name}
                        aria-label={placeholder || name}
                        onChange={onChange}  
                        ref={textAreaRef}
                        maxLength={maxLen}
                    /> 
            }
            
            {errorEl}
            {iconBoth}
            {iconRight}

        </div>
    )
}

export default Input;

