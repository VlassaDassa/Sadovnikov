import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconLoadTime: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0V3.07692C10.7 3.07692 3.07692 10.7 3.07692 20C3.07692 29.3 10.7 36.9231 20 36.9231C29.3 36.9231 36.9231 29.3 36.9231 20C36.9231 15.4662 35.2154 11.3692 32.1631 8.31692L30 10.4815C32.4877 12.9662 33.8462 16.2246 33.8462 20C33.8462 27.6231 27.6231 33.8461 20 33.8461C12.3769 33.8461 6.15385 27.6231 6.15385 20C6.15385 12.3769 12.3769 6.15385 20 6.15385V9.23077L27.6923 4.61538L20 0ZM23.2215 10.0969L19.3754 17.7892C18.8902 17.9203 18.462 18.2082 18.1575 18.6081C17.8531 19.008 17.6895 19.4974 17.6923 20C17.6923 20.612 17.9354 21.199 18.3682 21.6318C18.801 22.0646 19.388 22.3077 20 22.3077H20.0969L25.0477 27.26L27.26 25.0477L22.3077 20.0969V20C22.3077 19.6969 22.2215 19.4 22.1154 19.1338L26.0092 11.4415L23.2215 10.0954V10.0969Z"
                stroke={strokeColor} 
                fill={strokeColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                />
        </svg>
    )
}

export default IconLoadTime;