import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconSpeed: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path d="M7.52 34.02H32.48C34.7599 31.1782 36.0017 27.6434 36 24C36 15.18 28.84 8 20 8C11.16 8 4 15.18 4 24C4 27.8 5.32 31.26 7.52 34.02ZM18 12C18 10.9 18.9 10 20 10C21.1 10 22 10.9 22 12C22 13.12 21.1 14 20 14C18.9 14 18 13.12 18 12ZM8 16C8 14.9 8.9 14 10 14C11.1 14 12 14.9 12 16C12 17.12 11.1 18 10 18C8.9 18 8 17.12 8 16ZM17.04 22.8C18.72 21.14 30.06 15.8 30.06 15.8C30.06 15.8 24.74 27.16 23.08 28.82C21.4 30.5 18.72 30.5 17.04 28.82C16.2425 28.0213 15.7945 26.9387 15.7945 25.81C15.7945 24.6813 16.2425 23.5987 17.04 22.8ZM6 26C6 24.9 6.9 24 8 24C9.1 24 10 24.9 10 26C10 27.12 9.1 28 8 28C6.9 28 6 27.12 6 26ZM18 26C18 24.9 18.9 24 20 24C21.1 24 22 24.9 22 26C22 27.12 21.1 28 20 28C18.9 28 18 27.12 18 26ZM30 26C30 24.9 30.9 24 32 24C33.1 24 34 24.9 34 26C34 27.12 33.1 28 32 28C30.9 28 30 27.12 30 26Z"
                stroke={strokeColor} 
                fill={strokeColor}
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>

    )
}

export default IconSpeed;