import React from "react";

import styles from './index.module.scss';



interface ModalBackgroundProps {
    children: React.ReactNode;
    className?: string
}

const ModalBackground: React.FC<ModalBackgroundProps> = ({ children, className='' }) => {
    return (
        <div className="container">
            <div className={`${styles.background} ${className}`}>
                { children }
            </div>
        </div>
        
    )
}

export default ModalBackground;