import React from 'react';

import styles from './index.module.scss';


interface TooltipProps {
    text: string,
    title?: string,
    date?: string,
    type: 'lvl1' | 'lvl2' | 'lvl3' // 1 - просто текст, 2 - заголовок и текст, 3 - заголовок, дата, текст
}

const Tooltip: React.FC<TooltipProps> = ({ text, title, date, type='lvl1' }) => {
    return (
        <div className={`${styles.tooltip} tooltip`}>
            {
                type !== 'lvl1' ? 
                    <h4 className={styles.title}>{title}</h4>
                : null
            }

            {
                type === 'lvl3'  ? 
                    <p className={styles.date}>{date}</p>
                : null
            }

            <p className={styles.text}>{text}</p>
        </div>            
    )
}

export default Tooltip;

