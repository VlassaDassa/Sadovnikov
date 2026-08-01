import React, { forwardRef } from "react";

import styles from './index.module.scss';



interface ModalBackgroundProps {
    children: React.ReactNode;
    className?: string
}

const ModalBackground = forwardRef<HTMLDivElement, ModalBackgroundProps>(
    ({ children, className }, ref) => {
    return (
        <div className="container">
            <div data-modal-scroll className={`${styles.background} ${className}`} ref={ref}>
                { children }
            </div>
        </div>
        
    )
})

export default ModalBackground;