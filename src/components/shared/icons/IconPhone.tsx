import React from 'react';

import type { IconItem } from '@/interfaces/general';


const IconPhone: React.FC<IconItem> = ({ strokeColor, fillColor, iconClass, size }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 19 19"  className={iconClass} xmlns="http://www.w3.org/2000/svg">
            <path d="M8.1292 4.53417L5.31003 1.28001C4.98503 0.905006 4.3892 0.906672 4.0117 1.28501L1.69337 3.60751C1.00337 4.29834 0.805865 5.32417 1.20503 6.14667C3.58971 11.0841 7.57174 15.0717 12.5059 17.4633C13.3275 17.8625 14.3525 17.665 15.0425 16.9742L17.3825 14.63C17.7617 14.2508 17.7625 13.6517 17.3842 13.3267L14.1175 10.5225C13.7759 10.2292 13.245 10.2675 12.9025 10.6108L11.7659 11.7492C11.7077 11.8102 11.6311 11.8504 11.5478 11.8636C11.4646 11.8769 11.3793 11.8624 11.305 11.8225C9.44707 10.7526 7.90586 9.20936 6.83837 7.35001C6.79839 7.27563 6.78391 7.19019 6.79716 7.1068C6.81041 7.02341 6.85064 6.94666 6.9117 6.88834L8.04503 5.75417C8.38837 5.40917 8.42587 4.87667 8.1292 4.53417Z" 
                stroke={strokeColor} 
                fill={fillColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default IconPhone;