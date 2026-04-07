import React, { useEffect, useState } from 'react';

import bigBgBtn from './../../../assets/images/button/bg_big_btn.png';
import mediumBgBtn from './../../../assets/images/button/bg_medium_btn.png';
import smallBgBtn from './../../../assets/images/button/bg_small_btn.png';
import indexFinger from './../../../assets/images/main/index_finger.png';
import loader from './../../../assets/images/icons/loader.svg';

import type { Breakpoint } from '../../../interfaces/general';

import './index.scss';


interface ButtonProps {
    size?: 'big' | 'medium' | 'small';
    behaivor?: 'default' | 'loading' | 'disabled';
    iconPosition?: 'noIcon' | 'leftIcon' | 'rightIcon' | 'only' | 'withIcon';
    
    variant?: 'primary' | 'secondary';
    decorativeVariant?: 'big' | 'medium' | 'small';

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
        text='Button',

        decorativeVariant,
        icon,
        onClick,
        
        breakpoint
    }) => {
    const [currentSize, setCurrentSize] = useState(size)
    
    // Определение размера по ширине
    const defineSize = (breakpoint: Breakpoint) => {
        if (breakpoint.breakpoint === 'desktop') setCurrentSize('big');
        else if (breakpoint.breakpoint === 'tablet') setCurrentSize('medium');
        else setCurrentSize('small');  
    };

    useEffect(() => {
        defineSize(breakpoint)
    }, [breakpoint])

    
    // Декоративная кнопка
    if (decorativeVariant) {
        return (
            <div className={`decorBtn decorBtn--aboutMe decorBtn_${behaivor}`}>
                <img 
                    role='button' 
                    className={`decorBgBtnBig decorBgBtnBig_${currentSize} decorBgBtnBig_${behaivor}`} 
                    src={bigBgBtn} 
                    alt="" 
                    aria-hidden='true'
                />
                {
                    behaivor == 'loading' ? 
                        <img src={loader} alt="Loading..." className={`btnLoader btnLoader_${currentSize}`} />
                    :
                        <p className={`whiteText textDecorBtn textDecorBtn_${currentSize}`}>{text}</p>
                }

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
            </div>
        )
    }
    

    // Обычная кнопка
    return (
        <button className="button">Button</button>
    )

    
}

export default Button;