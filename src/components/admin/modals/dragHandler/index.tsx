import React from 'react';

import styles from './index.module.scss';

interface DragHandlerProps {
    variant: 'small' | 'big';
    additionalClass?: string;
}


const DragHandler: React.FC<DragHandlerProps> = ({ variant, additionalClass }) => {
    const className = variant === 'small' ? styles.small : styles.big;
    const countCircles = variant === 'small' ? 3 : 6;

    return (
        <div className={`${styles.dragHandler} ${className} ${additionalClass}`}>
            {
                Array(countCircles).fill(0).map((_, index) => (
                    <div key={index} className={styles.circle}></div>
                ))
            }
        </div>
    )
}

export default DragHandler;