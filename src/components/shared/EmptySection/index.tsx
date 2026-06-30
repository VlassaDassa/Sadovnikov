import React from 'react';

import styles from './index.module.scss';



interface EmptSectionProps {
    text: string;
}

const EmptySection: React.FC<EmptSectionProps> = ({ text }) => {
    return (
        <div className={styles.empty}>{text}</div>
    )
}

export default EmptySection;