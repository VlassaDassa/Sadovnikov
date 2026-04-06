import React from 'react';

import bigBgBtn from './../../../assets/images/button/bg_big_btn.png';
import mediumBgBtn from './../../../assets/images/button/bg_medium_btn.png';
import smallBgBtn from './../../../assets/images/button/bg_small_btn.png';
import indexFinger from './../../../assets/images/main/index_finger.png';

import './index.scss';


interface ButtonProps {
    size?: 'big' | 'medium' | 'small';
    behaivor?: 'default' | 'hover' | 'loading' | 'disabled';
    iconPosition?: 'noIcon' | 'leftIcon' | 'rightIcon' | 'only' | 'withIcon';
    
    variant?: 'primary' | 'secondary';
    decorativeVariant?: 'big' | 'medium' | 'small';

    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
};


const Button: React.FC<ButtonProps> = ({
        size='small',
        behaivor='default',
        iconPosition='noIcon',
        variant='primary',
        text='Button',

        decorativeVariant,
        icon,
        onClick
    }) => {

    
    // Декоративная кнопка
    if (decorativeVariant) {

        return (
            <div className="decorBtn decorBtn--aboutMe">
                <img className={`decorBgBtn img_${size}`} src={bigBgBtn} alt="Button" />
                <p className={`whiteText textDecorBtn textDecorBtn_${size}`}>{text}</p>
                <img 
                    src={indexFinger} 
                    alt="Button" 
                    className={
                        `decorBtnIcon 
                        decorBtnIcon_${iconPosition} 
                        decorBtnIconPosition_${behaivor} 
                        decorBtnIcon_${size}
                        ` 
                    }
                />
            </div>
        )

        // Добить decorative:
        // 1. Состояния;
        // 2. Все размеры;
        // 3. Адаптация;
    }
    

    // Обычная кнопка
    return (
        <button className="button">Button</button>
    )

    
}

export default Button;