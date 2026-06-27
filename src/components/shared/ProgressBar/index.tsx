import React from 'react';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';


interface ProgressBarProps {
    type: 'time' | 'score' | 'source',
    max: number | string,
    current: number | string,
}


const ProgressBar: React.FC<ProgressBarProps> = ({type, max, current}) => {
    const maxParse = typeof max === 'string' 
    ? parseFloat(max) || 0 
    : max

    const currentParse = typeof current === 'string' 
    ? parseFloat(current) || 0 
    : current

    const percentage = (currentParse / maxParse) * 100;
    const scoreColor = percentage >= 75 ? cssVars.green : percentage >= 50 ? cssVars.warning_400 : cssVars.error_600
    const timeColor = percentage >= 75 ? cssVars.error_600 : percentage >= 50 ? cssVars.warning_400 : cssVars.green

    const titleContent = (type === 'score' ? 
        (
            <p className={styles.title}><span style={{ color: scoreColor }}>{currentParse}</span>/{maxParse}</p>
        )
         
    : type === 'time' ?
        <p className={styles.title}><span style={{ color: timeColor }}>{currentParse} s</span></p>
    :
        null
    )

    const itemClass = (type === 'source' ? `${styles.progressBarItem} ${styles.progressSource}` : styles.progressBarItem)
    

    return (
        <div className={styles.progressBar}>
            {titleContent}
            <div className={itemClass}>
                <div className={styles.progressBarItemFill} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}

export default ProgressBar;