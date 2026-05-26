import React from 'react';

import styles from './index.module.scss';



interface DashboardTitleProps {
    text: string
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({ text }) => {
    return (
        <h2 className={styles.title}>
            {text}
        </h2>
    )
}

export default DashboardTitle;