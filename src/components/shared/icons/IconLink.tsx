import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconLink: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 27 27" className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6759 8.42831L18.5423 8.42831M18.5423 8.42831L18.5423 16.2947M18.5423 8.42831L8.42831 18.5423"
                stroke={strokeColor} 
                fill={fillColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconLink;