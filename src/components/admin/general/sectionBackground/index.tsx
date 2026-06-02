import React from "react";

import styles from './index.module.scss';



interface SectionBackgroundProps {
    children: React.ReactNode;
    className?: string;
    section?: boolean,
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ children, className='', section=false }) => {
    if (section) {
        <section className={`${styles.background} ${className}`}>
            <div className={styles.noise} aria-hidden="true" />
            { children }
        </section>
    }

    return (
        <div className={`${styles.background} ${className}`}>
            <div className={styles.noise} aria-hidden="true" />
            { children }
        </div>
    )
}

export default SectionBackground;