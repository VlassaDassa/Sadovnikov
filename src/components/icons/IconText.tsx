import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconText: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} className={iconClass} viewBox="2 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.60952 6.91431H23.0476M4.60952 13.8286H23.0476M4.60952 20.7429H23.0476"
                stroke={strokeColor} 
                fill={fillColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
        </svg>

    )
}

export default IconText;