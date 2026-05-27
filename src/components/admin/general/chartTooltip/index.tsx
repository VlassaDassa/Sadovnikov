import React from "react";
import { Tooltip } from 'recharts';

import styles from './index.module.scss';


interface ChartTooltipProps {
    type: 'visits' | 'devices'
}


const ChartTooltip: React.FC<ChartTooltipProps> = ({ type }) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (type === 'visits' && active && payload && payload.length) {
            const text = payload[0].value >= 1000 
                            ? `${(payload[0].value / 1000).toFixed(1)}k` 
                            : payload[0].value

            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipLabel}>{label}</p>
                    <p className={styles.tooltipValue}>
                        {text}
                    </p>
                </div>
            );
        }
        else if (type === 'devices' && active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipLabel}>{payload[0].payload.device}</p>
                    <p className={styles.tooltipValue}>
                        {payload[0].payload.percentage}%    
                    </p>
                </div>
            );
        }
}
    return (
        <Tooltip  content={<CustomTooltip />} />
    )
}

export default ChartTooltip