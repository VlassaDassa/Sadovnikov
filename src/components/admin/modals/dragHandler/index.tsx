import React from 'react';

import styles from './index.module.scss';

interface DragHandlerProps extends React.HTMLAttributes<HTMLDivElement> {
    variant: 'small' | 'big';
    additionalClass?: string;
}


const DragHandler: React.FC<DragHandlerProps> = ({
    variant,
    additionalClass = '',
    ...props
}) => {
    const variantClassName = variant === 'small' ? styles.small : styles.big;
    const countCircles = variant === 'small' ? 3 : 6;

    return (
        <div
            {...props}
            className={`${styles.dragHandler} ${variantClassName} ${additionalClass}`}
        >
            {
                Array(countCircles).fill(0).map((_, index) => (
                    <div key={index} className={styles.circle}></div>
                ))
            }
        </div>
    )
}

export default DragHandler;
