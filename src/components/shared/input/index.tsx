'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DatePicker, registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import { enUS } from 'date-fns/locale/en-US';


import Icon from '../icons/Icon';
import Noize from '../Noize';

import { RootState } from '@/store';
import { cssVars } from "@/styles/cssVariables";
import { displayDate } from '@/lib/dates';

import 'react-datepicker/dist/react-datepicker.css';
import style from './index.module.scss';


registerLocale('ru', ru);
registerLocale('en', enUS);


interface Icon {
    first?: string,
    second?: string
}
 
interface InputProps {
    name: string,
    placeholder?: string,
    additionalClass?: string,
    icon?: Icon,
    type?: 'text' | 'textarea' | 'email' | 'password' | 'number',
    iconPosition: 'noIcon' | 'iconLeft' | 'iconRight' | 'iconBoth',
    value?: string | number,
    maxLen?: number,
    variant?: 'default' | 'admin',
    adminLabel?: 'withLabel' | 'withoutLabel',
    label?: string,
    disabled?: boolean,
    readonly?: boolean,
    noize?: boolean,
    lang?: 'ru' | 'en',

    datePickerDay?: boolean,
    datePicker?: boolean,
    datePickerChange?: (date: string) => void;

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
    adminLabel='withoutLabel',
    label, 
    error,
    disabled=false,
    readonly=false,
    
    noize=false,

    lang='en',

    datePicker=false,
    datePickerChange,
    datePickerDay=false,
    
    counter,
    maxCounter,

    onChange,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

    useEffect(() => {
        if (type === 'textarea' && textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [value])



    const handleDatePicker = (date: Date | null) => {
        setDatePickerOpen(false);
        if (datePickerChange) {
            const newDate = displayDate(date?.toISOString(), datePickerDay, lang)
            datePickerChange(newDate)
        }
    };


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
                type !== 'textarea' && !datePicker ?
                    <input 
                        type={type} 
                        className={inputClass}
                        placeholder={placeholder}
                        value={value}
                        aria-label={placeholder || name}
                        name={name}
                        maxLength={maxLen}
                        onChange={onChange}  
                        onClick={onClick}
                        readOnly={readonly}
                    />
                : datePicker ?
                    <div className={style.datePickerWrapper}>
                        {iconOne}

                        <input 
                            type={type} 
                            className={inputClass}
                            placeholder={placeholder}
                            value={value}
                            aria-label={placeholder || name}
                            name={name}
                            maxLength={maxLen}
                            onClick={() => setDatePickerOpen(true)}
                            readOnly
                        />

                        {datePickerOpen && (
                            <DatePicker
                                onChange={handleDatePicker}
                                onClickOutside={() => setDatePickerOpen(false)}
                                open={datePickerOpen}
                                locale={lang}
                                inline
                                className={style.datePicker}
                            />
                        )}
                    </div>
                :

                    <div className={style.fieldWrapper}>
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
                            readOnly={readonly}
                        /> 

                        {
                            noize && <Noize className={style.noize} />
                        }
                        
                    </div>
                    

            }
            
            {errorEl}
            {iconBoth}
            {iconRight}

        </div>
    )
}

export default Input;

