import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconSearch: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8ZM4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 18.5917 27.1784 20.9914 25.7815 22.9531L35.4142 32.5858C36.1953 33.3668 36.1953 34.6332 35.4142 35.4142C34.6332 36.1953 33.3668 36.1953 32.5858 35.4142L22.9531 25.7815C20.9914 27.1784 18.5917 28 16 28C9.37258 28 4 22.6274 4 16Z"
                stroke={strokeColor} 
                fill={strokeColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconSearch;