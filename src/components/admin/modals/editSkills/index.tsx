'use client'

import React from 'react';

import ModalBackground from './../../general/modalBackground';
import Button from '@/components/shared/button/Button';
import ModalHeader from '../../general/modalHeader';
import ModalTooltip from '../modalTooltip';
import DragHandler from '../dragHandler';
import Input from '@/components/shared/input';

import { skills } from '@/mockData/skills';

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

            <ModalHeader 
                title='Edit Skills'
                subTitle='Manage your homepage skill section'
                icon='arrow'
            />

            <div className={styles.content}>
                <ModalTooltip 
                    text='Maximum 4 skills allowed'
                    counter={skills.length}
                    max={4}
                />
                
                {skills.map(skill => (
                    <div key={skill.id} className={`${styles.skill} modalElementBg`}>
                        <DragHandler
                            variant="small"
                        />

                        <Input
                            name={`skill-${skill.id}`}
                            iconPosition='noIcon'
                            value={skill.name}
                            additionalClass={styles.input}
                        />

                        <Button
                            variant="black"
                            behavior="default"
                            iconPosition="only"
                            icon="trash"
                            additionalClass={styles.deleteBtn}
                        />

                        <Button
                            variant="black"
                            behavior="default"
                            iconPosition="only"
                            icon="mathMinus"
                            additionalClass={styles.deleteBtn}
                        />

                        <Button
                            variant="black"
                            behavior="default"
                            iconPosition="only"
                            icon="mathPlus"
                            additionalClass={styles.deleteBtn}
                        />

                    </div>
                ))}
            </div>





            
        </ModalBackground>
    );
}

export default AdminModals;