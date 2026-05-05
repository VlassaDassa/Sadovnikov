import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconTime: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6V10L13 13M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" 
                stroke={strokeColor} 
                fill={fillColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconTime;