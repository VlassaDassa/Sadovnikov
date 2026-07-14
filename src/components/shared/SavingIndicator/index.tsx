'use client';

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

interface SavingIndicatorProps {
    isSaving: boolean;
}

const SavingIndicator: React.FC<SavingIndicatorProps> = ({ 
    isSaving, 
}) => {
    if (!isSaving) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.spinner}></div>
            </div>
        </div>,
        document.body
    );
};

export default SavingIndicator;