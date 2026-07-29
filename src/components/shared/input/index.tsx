'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DatePicker, registerLocale } from 'react-datepicker';
import { isValid, parse, format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { enUS } from 'date-fns/locale/en-US';


import Icon from '../icons/Icon';
import Noize from '../Noize';

import { RootState } from '@/store';
import { cssVars } from "@/styles/cssVariables";

import 'react-datepicker/dist/react-datepicker.css';
import style from './index.module.scss';


registerLocale('ru', ru);
registerLocale('en', enUS);

const dateLocales = {
    ru,
    en: enUS,
} as const

const fullDateFormats = [
    'd/M/yyyy',
    'dd/MM/yyyy',
    'd.M.yyyy',
    'dd.MM.yyyy',
    'd-M-yyyy',
    'dd-MM-yyyy',
    'yyyy-MM-dd',
    'd MMMM yyyy',
    'd MMM yyyy',
    'MMMM d, yyyy',
    'MMM d, yyyy',
    'MMMM d yyyy',
    'MMM d yyyy',
]

const monthYearFormats = [
    'M/yyyy',
    'MM/yyyy',
    'M.yyyy',
    'MM.yyyy',
    'M-yyyy',
    'MM-yyyy',
    'yyyy-MM',
    'LLLL yyyy',
    'LLLL, yyyy',
    'MMM yyyy',
    'MMM, yyyy',
]

function normalizeDate(
    date: Date,
    withDay: boolean,
): Date {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        withDay ? date.getDate() : 1,
        12,
        0,
        0,
        0,
    )
}

function capitalizeFirst(
    value: string,
): string {
    if (!value) {
        return value
    }

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    )
}

function formatDateValue(
    date: Date,
    withDay: boolean,
    lang: 'ru' | 'en',
): string {
    const locale = dateLocales[lang]

    if (withDay) {
        return format(
            date,
            lang === 'ru'
                ? 'd MMMM yyyy'
                : 'MMMM d, yyyy',
            {
                locale,
            },
        )
    }

    const formatted = format(
        date,
        'LLLL, yyyy',
        {
            locale,
        },
    )

    return capitalizeFirst(formatted)
}

function parseUsingFormats(
    value: string,
    formats: string[],
    locales: Array<typeof ru | typeof enUS>,
): Date | null {
    for (const locale of locales) {
        for (const dateFormat of formats) {
            const parsedDate = parse(
                value,
                dateFormat,
                new Date(),
                {
                    locale,
                },
            )

            if (isValid(parsedDate)) {
                return parsedDate
            }
        }
    }

    return null
}

function parseDateValue(
    value: string | number | undefined,
    withDay: boolean,
    lang: 'ru' | 'en',
): Date | null {
    const normalizedValue = String(
        value ?? '',
    )
        .trim()
        .replace(/\s+/g, ' ')

    if (!normalizedValue) {
        return null
    }

    const locales = lang === 'ru'
        ? [ru, enUS]
        : [enUS, ru]

    const fullDate = parseUsingFormats(
        normalizedValue,
        fullDateFormats,
        locales,
    )

    if (fullDate) {
        return normalizeDate(
            fullDate,
            withDay,
        )
    }

    if (withDay) {
        return null
    }

    const monthYear = parseUsingFormats(
        normalizedValue,
        monthYearFormats,
        locales,
    )

    if (!monthYear) {
        return null
    }

    return normalizeDate(
        monthYear,
        false,
    )
}

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
    const initialDate = parseDateValue(
        value,
        datePickerDay,
        lang,
    )
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate)
    const [dateInputValue, setDateInputValue] = 
        useState(() => {
            if (!initialDate) {
                return String(value ?? '')
            }

            return formatDateValue(
                initialDate,
                datePickerDay,
                lang,
            )
        })
    const lastValidDateValueRef = useRef(
        dateInputValue,
    )
    const datePickerWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (type === 'textarea' && textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [value])

    useEffect(() => {
        const handlePointerDown = (
            event: PointerEvent,
        ) => {
            const target = event.target

            if (!(target instanceof Node)) {
                return
            }

            if (
                datePickerWrapperRef.current &&
                !datePickerWrapperRef.current
                    .contains(target)
            ) {
                commitDateInput()
                setDatePickerOpen(false)
            }
        }

        document.addEventListener(
            'pointerdown',
            handlePointerDown,
        )

        return () => {
            document.removeEventListener(
                'pointerdown',
                handlePointerDown,
            )
        }
    })

    useEffect(() => {
        if (!datePicker) {
            return
        }

        const parsedDate = parseDateValue(
            value,
            datePickerDay,
            lang,
        )

        if (!parsedDate) {
            const nextValue = String(value ?? '')

            setSelectedDate(null)
            setDateInputValue(nextValue)
            lastValidDateValueRef.current =
                nextValue

            return
        }

        const formattedValue =
            formatDateValue(
                parsedDate,
                datePickerDay,
                lang,
            )

        setSelectedDate(parsedDate)
        setDateInputValue(formattedValue)
        lastValidDateValueRef.current =
            formattedValue
    }, [
        value,
        datePicker,
        datePickerDay,
        lang,
    ])

    const commitDate = (
        date: Date,
    ) => {
        const normalizedDate =
            normalizeDate(
                date,
                datePickerDay,
            )

        const formattedValue =
            formatDateValue(
                normalizedDate,
                datePickerDay,
                lang,
            )

        setSelectedDate(normalizedDate)
        setDateInputValue(formattedValue)

        lastValidDateValueRef.current =
            formattedValue

        datePickerChange?.(formattedValue)
    }

    const commitDateInput = (): boolean => {
        const trimmedValue =
            dateInputValue.trim()

        if (!trimmedValue) {
            setSelectedDate(null)
            setDateInputValue('')

            lastValidDateValueRef.current = ''

            datePickerChange?.('')

            return true
        }

        const parsedDate = parseDateValue(
            trimmedValue,
            datePickerDay,
            lang,
        )

        if (!parsedDate) {
            setDateInputValue(
                lastValidDateValueRef.current,
            )

            return false
        }

        commitDate(parsedDate)

        return true
    }



    const handleDatePicker = (
        date: Date | null,
    ) => {
        if (!date) {
            setSelectedDate(null)
            setDateInputValue('')

            lastValidDateValueRef.current = ''

            datePickerChange?.('')
            setDatePickerOpen(false)

            return
        }

        commitDate(date)
        setDatePickerOpen(false)
    }


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
                iconClass={`${variant === 'default' ? style.inputIcon : adminLabel==='withLabel' ? style.inputAdminIconLabel : style.inputAdminIcon} ${style.inputIconLeft} ${datePickerOpen && style.iconDatePickerOpen} ${datePicker && style.iconDatePicker}`}
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
                    <div
                        ref={datePickerWrapperRef}
                        className={style.datePickerWrapper}
                    >
                        <input
                            type="text"
                            className={inputClass}
                            placeholder={
                                placeholder ??
                                (
                                    datePickerDay
                                        ? lang === 'ru'
                                            ? 'ДД.ММ.ГГГГ'
                                            : 'DD/MM/YYYY'
                                        : lang === 'ru'
                                            ? 'ММ.ГГГГ'
                                            : 'MM/YYYY'
                                )
                            }
                            value={dateInputValue}
                            aria-label={placeholder || name}
                            aria-expanded={datePickerOpen}
                            name={name}
                            maxLength={maxLen ?? 30}
                            autoComplete="off"
                            disabled={disabled}
                            onChange={(event) => {
                                setDateInputValue(
                                    event.target.value,
                                )
                            }}
                            onClick={() => {
                                setDatePickerOpen(
                                    (previous) => !previous,
                                )
                            }}
                            onBlur={(event) => {
                                const nextTarget =
                                    event.relatedTarget

                                if (
                                    nextTarget instanceof Node &&
                                    datePickerWrapperRef.current
                                        ?.contains(nextTarget)
                                ) {
                                    return
                                }

                                commitDateInput()
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()

                                    const committed =
                                        commitDateInput()

                                    if (committed) {
                                        setDatePickerOpen(false)
                                    }
                                }

                                if (event.key === 'Escape') {
                                    setDateInputValue(
                                        lastValidDateValueRef.current,
                                    )

                                    setDatePickerOpen(false)
                                }
                            }}
                        />

                        {datePickerOpen && (
                            <DatePicker
                                selected={selectedDate}
                                openToDate={selectedDate ?? new Date()}
                                onChange={handleDatePicker}
                                locale={lang}
                                inline
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                minDate={new Date(1950, 0, 1)}
                                maxDate={
                                    new Date(
                                        new Date().getFullYear() + 10,
                                        11,
                                        31,
                                    )
                                }
                                calendarClassName={style.datePicker}
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

