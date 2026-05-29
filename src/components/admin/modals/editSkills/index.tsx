'use client'

import React from 'react';

import ModalBackground from './../../general/modalBackground';
import Button from '@/components/shared/button/Button';
import ModalHeader from '../../general/modalHeader';

import styles from './index.module.scss';


const AdminModals: React.FC = () => {
    return (
        <ModalBackground className={styles.modalBackground}>
            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="close"
                additionalClass={styles.closeButton}
            />

            <div className={styles.contentWrapper}>
                <ModalHeader 
                    title='Edit Skills'
                    subTitle='Manage your homepage skill section'
                    icon='arrow'
                />

                .
            </div>
            
        </ModalBackground>
    );
}

export default AdminModals;