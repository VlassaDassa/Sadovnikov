"use client";

import React from "react";

import styles from "./index.module.scss";

interface SectionBackgroundProps extends React.HTMLAttributes<HTMLElement> {
    section?: boolean;
}

const SectionBackground = React.forwardRef<
    HTMLDivElement,
    SectionBackgroundProps
>(({ children, className = "", section = false, ...rest }, ref) => {
    if (section) {
        return (
            <section className={`${styles.background} ${className}`} {...rest}>
                <div className={styles.noise} aria-hidden="true" />
                {children}
            </section>
        );
    }

    return (
        <div
            ref={ref}
            className={`${styles.background} ${className}`}
            {...rest}
        >
            <div className={styles.noise} aria-hidden="true" />
            {children}
        </div>
    );
});

SectionBackground.displayName = "SectionBackground";

export default SectionBackground;
