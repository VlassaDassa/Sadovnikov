import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconPerson: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path d="M7 6C8.65685 6 10 4.65685 10 3C10 1.34315 8.65685 0 7 0C5.34315 0 4 1.34315 4 3C4 4.65685 5.34315 6 7 6Z"
                stroke={strokeColor} 
                fill={fillColor}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M0 15C0 11.134 3.13401 8 7 8C10.866 8 14 11.134 14 15H0Z"
                stroke={strokeColor} 
                fill={fillColor}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>

    )
}

export default IconPerson;