import React from "react";

import styles from './index.module.scss';



interface SectionBackgroundProps {
    children: React.ReactNode;
    className?: string
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ children, className='' }) => {
    return (
        <div className={`${styles.background} ${className}`}>
            <div className={styles.noise} aria-hidden="true" />
            { children }
        </div>
    )
}

export default SectionBackground;