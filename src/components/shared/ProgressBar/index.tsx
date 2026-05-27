import React from 'react';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';


interface ProgressBarProps {
    type: 'time' | 'score' | 'source',
    max: number,
    current: number
}


const ProgressBar: React.FC<ProgressBarProps> = ({type, max, current}) => {
    const percentage = (current / max) * 100;
    const scoreColor = percentage >= 75 ? cssVars.green : percentage >= 50 ? cssVars.warning_400 : cssVars.error_600
    const timeColor = percentage >= 75 ? cssVars.error_600 : percentage >= 50 ? cssVars.warning_400 : cssVars.green

    const titleContent = (type === 'score' ? 
        (
            <p className={styles.title}><span style={{ color: scoreColor }}>{current}</span>/{max}</p>
        )
         
    : type === 'time' ?
        <p className={styles.title}><span style={{ color: timeColor }}>{current} s</span></p>
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