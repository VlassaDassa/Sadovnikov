"use client";

import React from "react";

import styles from "./index.module.scss";

interface SectionBackgroundProps extends React.HTMLAttributes<HTMLElement> {
    section?: boolean;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({
    children,
    className = "",
    section = false,
    ...rest
}) => {
    if (section) {
        return (
            <section className={`${styles.background} ${className}`} {...rest}>
                <div className={styles.noise} aria-hidden="true" />

                {children}
            </section>
        );
    }

    return (
        <div className={`${styles.background} ${className}`} {...rest}>
            <div className={styles.noise} aria-hidden="true" />

            {children}
        </div>
    );
};

export default SectionBackground;
