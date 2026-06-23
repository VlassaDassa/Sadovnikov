import React from 'react';

import Icon from '../icons/Icon';
import ProgressBar from '../ProgressBar';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';


interface MetricItemProps {
    id: number,
    icon: string,
    title: string,
    text: string,
    type: 'time' | 'score' | 'source',
    current: number | string,
    max: number | string,
    className?: string,
    contentWrapperClass?: string,
}

const MetricItem: React.FC<MetricItemProps> = ({
        id, 
        icon, 
        title, 
        text, 
        type, 
        current, 
        max, 
        className, 
        contentWrapperClass 
    }) => {
    return (
        <div className={`${styles.metricItem} ${className}`}>
            <div className={styles.iconWrapper}>
                <Icon 
                    name={icon}
                    size={40}
                    strokeColor={cssVars.white}
                />
            </div>

            <div className={`${styles.contentWrapper} ${contentWrapperClass}`}>
                <div className={styles.textWrapper}>
                    <h3 className={styles.metricTitle}>{title}</h3>
                    <p className={styles.metricText}>{text}</p>
                </div>

                <ProgressBar 
                    type={type} 
                    current={current}
                    max={max}
                />
            </div>
        </div>
    )
}

export default MetricItem;