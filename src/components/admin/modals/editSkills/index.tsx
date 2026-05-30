'use client'

import React from 'react';
import { useDispatch } from "react-redux";
import { toggleIsOverlayVisible, toggleEditSkillsModal } from '@/store/slices/uiSlice';

import ModalBackground from './../../general/modalBackground';
import Button from '@/components/shared/button/Button';
import ModalHeader from '../../general/modalHeader';
import ModalTooltip from '../modalTooltip';
import DragHandler from '../dragHandler';
import Input from '@/components/shared/input';
import SkillLevel from '@/components/shared/SkillLevel';

import { skills } from '@/mockData/skills';

import styles from './index.module.scss';


const AdminModals: React.FC = () => {
    const dispatch = useDispatch()

    const overlayClickHandler = () => {
        dispatch(toggleEditSkillsModal())
        dispatch(toggleIsOverlayVisible())
    }


    return (
        <ModalBackground className={styles.modalBackground}>
            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="close"
                onClick={overlayClickHandler}
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
                        
                        <div className={styles.firstLineWrapper}>
                            <div className={styles.inputWrapper}>
                                <DragHandler
                                    variant="small"
                                />

                                <Input 
                                    name='test'
                                    placeholder='Text...'
                                    value={skill.name}
                                    variant='admin'
                                    iconPosition='noIcon'
                                    adminLabel='withoutLabel'
                                    onChange={() => {}}
                                />
                            </div>

                            <Button
                                variant="black"
                                behavior="default"
                                iconPosition="only"
                                icon="trash"
                                additionalClass={styles.deleteBtn}
                            />
                        </div>

                        <div className={styles.secondLineWrapper}>
                            <Button
                                variant="black"
                                behavior="default"
                                iconPosition="only"
                                icon="mathMinus"
                                additionalClass={styles.deleteBtn}
                            />

                            <SkillLevel score={skill.score} classNameWrapper={styles.skillLevel} classNameItem={styles.skillLevelItem} />

                            <Button
                                variant="black"
                                behavior="default"
                                iconPosition="only"
                                icon="mathPlus"
                                additionalClass={styles.deleteBtn}
                            />
                        </div>
                    </div>
                ))}

                <Button
                    variant="black"
                    behavior="default"
                    iconPosition="noIcon"
                    text={'Add Skill'}
                    additionalClass={styles.addBtn}
                />
            </div>





            
        </ModalBackground>
    );
}

export default AdminModals;