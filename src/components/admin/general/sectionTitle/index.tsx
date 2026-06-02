import React from "react";

import styles from './index.module.scss';


interface SectionTitleProps {
    title: string,
    text: string,
    counter?: boolean,
    count?: number,
}


const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    text,
    counter=false,
    count=0
}) => {
    return (
        <div className={styles.titleWrapper}>
            <div className={styles.textWrapper}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.text}>{text}</p>
            </div>

            {counter && (
                <p className={styles.counter}>{count} items</p>
            )}
        </div>
    )
}

export default SectionTitle;