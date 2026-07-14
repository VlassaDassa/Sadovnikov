import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconArrow: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox={`0 0 24 24`} className={iconClass} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9"
                stroke={strokeColor} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>

    )
}

export default IconArrow;