import React from 'react';

import styles from './index.module.scss';


interface ModalTooltipProps {
    text: string;
    counter?: number;
    max?: number;
}

const ModalTooltip: React.FC<ModalTooltipProps> = ({ text, counter, max }) => {
    return (
        <div className={`${styles.tooltip} modalElementBg`}>
            <p className={styles.tooltipText}>{text}</p>
            <p className={styles.tooltipCounter}>{counter}/{max}</p>
        </div>
    )
}

export default ModalTooltip;