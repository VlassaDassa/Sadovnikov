import React from 'react';

import styles from './index.module.scss';



interface DashboardTitleProps {
    text: string,
    additionalClass?: string,
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({ text, additionalClass='' }) => {
    return (
        <h2 className={`${styles.title} ${additionalClass}`}>
            {text}
        </h2>
    )
}

export default DashboardTitle;