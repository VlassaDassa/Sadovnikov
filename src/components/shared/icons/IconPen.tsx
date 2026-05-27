import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconPen: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 19 19" fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7029 1.70294C14.6402 0.765685 16.1598 0.765685 17.0971 1.70294C18.0343 2.6402 18.0343 4.1598 17.0971 5.09706L16.1456 6.04853L12.7515 2.65442L13.7029 1.70294Z"
                stroke={strokeColor} 
                fill={fillColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            <path d="M11.0544 4.35147L1 14.4059V17.8H4.39411L14.4485 7.74558L11.0544 4.35147Z" 
                stroke={strokeColor} 
                fill={fillColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>

    )
}

export default IconPen;