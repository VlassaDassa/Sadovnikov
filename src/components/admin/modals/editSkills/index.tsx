'use client'

import React, { Dispatch, SetStateAction, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'

import ModalBackground from './../../general/modalBackground';
import Button from '@/components/shared/button/Button';
import ModalHeader from '../../general/modalHeader';
import ModalTooltip from '../modalTooltip';
import DragHandler from '../dragHandler';
import Input from '@/components/shared/input';
import SkillLevel from '@/components/shared/SkillLevel';

import { skills as initialSkills } from '@/mockData/skills';
import { closeModals } from '@/lib/modals';
import { Skill } from '@/interfaces/general';

import styles from './index.module.scss';



interface SkillItemProps {
    skill: Skill,
    setSkills: Dispatch<SetStateAction<Skill[]>>
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, setSkills }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: skill.id})


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    }

    const deleteItem = (id: number) => {
        setSkills(prev => prev.filter((item) => item.id !== id))
    }

    const incrementScore = (id: number) => {
        setSkills(prev => prev.map(skill => 
            skill.id === id && skill.score < 10 
                ? { ...skill, score: skill.score + 1 } 
                : skill
        ));
    };

    const decrementScore = (id: number) => {
        setSkills(prev => prev.map(skill => 
            skill.id === id && skill.score > 0 
                ? { ...skill, score: skill.score - 1 } 
                : skill
        ));
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newName = e.target.value;
        
        if (newName.length <= 20) {
                setSkills(
                prev => prev.map((item) => item.id === skill.id 
                    ? {...item, name: newName}
                    : item
                ) 
            )
        }
    }


    return (
        <div 
            ref={setNodeRef} 
            {...attributes}
            {...listeners}
            style={style} 
            className={`${styles.skill} modalElementBg`}
        >
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
                        onChange={handleChangeName}
                    />
                </div>

                <Button
                    variant="black"
                    behavior="default"
                    iconPosition="only"
                    icon="trash"
                    onClick={() => deleteItem(skill.id)}
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
                    onClick={() => decrementScore(skill.id)}
                />

                <SkillLevel score={skill.score} classNameWrapper={styles.skillLevel} classNameItem={styles.skillLevelItem} />

                <Button
                    variant="black"
                    behavior="default"
                    iconPosition="only"
                    icon="mathPlus"
                    additionalClass={styles.deleteBtn}
                    onClick={() => incrementScore(skill.id)}
                />
            </div>
        </div>
    )
}


const EditSkillModal: React.FC = () => {
    const dispatch = useDispatch()
    const [skills, setSkills] = useState(initialSkills)
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, 
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = skills.findIndex((item) => item.id === active.id)
            const newIndex = skills.findIndex((item) => item.id === over?.id)
            setSkills(arrayMove(skills, oldIndex, newIndex))
        }
    }

    const addItem = () => {
        const maxId = Math.max(...skills.map(s => s.id), 0);
        const newSkill: Skill = {
            id: maxId + 1,
            name: '',
            score: 0
        }

        setSkills(prev => [...prev, newSkill])
    }

    const disableBtn = () => {
        if (skills.length >= 4) {
            return 'disabled'
        }

        return 'default'
    }


    return (
        <ModalBackground className={styles.modalBackground}>
            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="close"
                onClick={() => closeModals(dispatch, 'editSkills')}
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

                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={skills.map(s => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {skills.map(skill => (
                            <SkillItem 
                                key={skill.id} 
                                skill={skill} 
                                setSkills={setSkills} 
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                <Button
                    variant="black"
                    behavior={disableBtn()}
                    iconPosition="noIcon"
                    text={'Add Skill'}
                    additionalClass={styles.addBtn}
                    onClick={addItem}
                />
            </div>
        </ModalBackground>
    );
}

export default EditSkillModal;