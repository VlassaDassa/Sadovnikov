import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconFlag: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={13} height={16} className={iconClass}  fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.00006 10.219V1.57619C1.00006 1.30423 1.00006 1.16825 1.08418 1.08412C1.1683 1 1.30429 1 1.57625 1H6.04979C6.3955 1 6.56951 1 6.70895 1.08643C6.84724 1.1717 6.9256 1.32728 7.08002 1.63727L7.59629 2.6675C7.7507 2.97864 7.82791 3.13306 7.96735 3.21833C8.10679 3.30476 8.27965 3.30476 8.62651 3.30476H14.2524C14.5244 3.30476 14.6604 3.30476 14.7445 3.38889C14.8286 3.47301 14.8286 3.60899 14.8286 3.88095V11.9476C14.8286 12.2196 14.8286 12.3556 14.7445 12.4397C14.6604 12.5238 14.5244 12.5238 14.2524 12.5238H8.62651C8.2808 12.5238 8.10679 12.5238 7.96735 12.4374C7.82907 12.3521 7.7507 12.1965 7.59629 11.8865L7.08002 10.8563C6.9256 10.5452 6.84839 10.3908 6.70895 10.3055C6.56951 10.219 6.39666 10.219 6.04979 10.219H1.00006ZM1.00006 10.219V17.1333"
                stroke={strokeColor} 
                fill={strokeColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>

    )
}

export default IconFlag;