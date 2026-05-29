import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconMathMinus: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.59998 12C3.59998 11.3373 4.13723 10.8 4.79998 10.8L19.2 10.8C19.8627 10.8 20.4 11.3373 20.4 12C20.4 12.6628 19.8627 13.2 19.2 13.2L4.79998 13.2C4.13723 13.2 3.59998 12.6628 3.59998 12Z"
                fill={strokeColor} 
            />
        </svg>
    )
}

export default IconMathMinus;