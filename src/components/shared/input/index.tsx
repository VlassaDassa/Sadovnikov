'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Icon from '../icons/Icon';

import { RootState } from '@/store';
import { cssVars } from "@/styles/cssVariables";

import style from './index.module.scss';


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
    value?: string | number,
    maxLen?: number,
    variant?: 'default' | 'admin',
    adminLabel?: 'withLabel' | 'withoutLabel',
    label?: string,
    disabled?: boolean,

    counter?: boolean,
    maxCounter?: number,

    error?: string,

    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onClick?: (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}


const Input: React.FC<InputProps> = ({
    placeholder,
    name,
    value,
    type='text',
    additionalClass='',
    icon,
    iconPosition,
    maxLen,
    variant='default',
    adminLabel='withoutPlaceholder',
    label, 
    error,
    disabled=false,
    
    counter,
    maxCounter,
    onChange,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)

    useEffect(() => {
        if (type === 'textarea' && textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [value])


    const iconColor = {
        default: {
            strokeColor: (isHovered && !error ? cssVars.neutral_400 :
                value?.toString()?.length === 0 ? cssVars.neutral_600 :
                error ? cssVars.error_600 :
                cssVars.white), // <- Белый во всех случаях кроме empty и hover
            fillColor: 'none'
        },
        admin: {
            strokeColor: (
                isHovered && !error ? cssVars.neutral_400 :
                value?.toString()?.length === 0 ? cssVars.neutral_600 :
                error ? cssVars.error_600 :
                cssVars.neutral_300 
            ),
            fillColor: 'none',
        }
    }
   


    const iconOne = (
        (iconPosition === 'iconLeft' || iconPosition === 'iconBoth') && icon?.first ?
            <Icon 
                name={icon.first}
                iconClass={`${variant === 'default' ? style.inputIcon : adminLabel==='withLabel' ? style.inputAdminIconLabel : style.inputAdminIcon} ${style.inputIconLeft}`}
                strokeColor={iconColor[variant].strokeColor}
                fillColor={iconColor[variant].fillColor}
                size={
                    breakpoint === 'desktop' ? 24 : 20
                }
            />
        : null
    )

    const errorEl = error ? <p className={style.inputErrorText}>⚠ {error}</p> : null

    const iconBoth = (
        iconPosition === 'iconBoth' && icon?.second  ?
            <Icon 
                name={icon.second}
                strokeColor={iconColor[variant].strokeColor}
                fillColor={iconColor[variant].fillColor}
                aria-label={placeholder || name}
                iconClass={`${variant === 'default' ? style.inputIcon : adminLabel==='withLabel' ? style.inputAdminIconLabel : style.inputAdminIcon} ${style.inputIconRight}`}
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
                strokeColor={iconColor[variant].strokeColor}
                fillColor={iconColor[variant].fillColor}
                iconClass={`${variant === 'default' ? style.inputIcon : adminLabel==='withLabel' ? style.inputAdminIconLabel : style.inputAdminIcon} ${style.inputIconRight}`}
                size={
                    breakpoint === 'desktop' ? 24 : 20
                }
            />
        : null
    )

    const inputClass = (
        `${variant === 'admin' ? style.inputAdmin : style.input} 
        ${style.additionalClass} 
        ${
            variant === 'default' && iconPosition !== 'noIcon' ? style.inputWithIcon :
            variant === 'admin' && iconPosition !== 'noIcon' ? style.inputAdminWithIcon : '' 
        }  
        ${error && variant === 'default' ?  style.inputError : error && variant === 'admin' ? style.inputAdminError : ''} 
        ${type === 'textarea' ? style['input-textarea'] : ''} 
        ${additionalClass}
        `
    )


    const counterLabel = (
        counter && type === 'textarea' ?
            <div className={`${style.counter} ${value && value.toString().length > maxCounter! ? style.counterError : ''} ${adminLabel === 'withoutLabel' ? style.counterWithoutLabel : null}`}>
                {value ? value.toString().length : 0}/{maxCounter}
            </div>
        : null
    )


    return (
        <div 
            className={`${style.inputWrapper} ${style[`inputWrapper-${type}`]} ${style[`inputWrapper-${variant}`]} ${additionalClass}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {
                label && adminLabel === 'withLabel' ?
                    <label htmlFor={name} className={`${error ? style.labelError : ''} ${style.inputLabel}`}>{label}</label>
                : null
            }

            {iconOne}
            {counterLabel}

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
                        onClick={onClick}
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
                        onClick={onClick}
                    /> 
            }
            
            {errorEl}
            {iconBoth}
            {iconRight}

        </div>
    )
}

export default Input;

