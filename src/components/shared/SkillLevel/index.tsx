import React from 'react';

import styles from './index.module.scss';

interface SkillLevelProps {
    score: number;
    classNameWrapper?: string;
    classNameItem?: string;
}

const SkillLevel: React.FC<SkillLevelProps> = ({ score, classNameWrapper, classNameItem }) => {
    return (
        <div className={`${styles.skillLevelWrapper} ${classNameWrapper}`}>

            {
                Array.from({ length: 10 }).map((_, index) => {
                    if (index < score) {
                        return <div key={index} className={`${styles.skillLevelItem} ${styles['skillLevelItem--filled']} ${classNameItem}`}></div>
                    }
                    else {
                        return <div key={index} className={`${styles.skillLevelItem} ${classNameItem}`}></div>
                    }
                })
            }
        </div>
    )
    
}

export default SkillLevel;