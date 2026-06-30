'use client'

import React, { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
    useSortable,
} from '@dnd-kit/sortable'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Button from '@/components/shared/button/Button';
import DragHandler from '../dragHandler';
import Input from '@/components/shared/input';
import SkillLevel from '@/components/shared/SkillLevel';
import ModalWrapper from '../modalWrapper';
import SavingIndicator from '@/components/shared/SavingIndicator';

import { Skill } from '@/interfaces/general';
import { useDebounce } from '@/hooks/useDebounce';
import { updateSkills } from '@/app/actions/skills';

import styles from './index.module.scss';






interface SkillItemProps {
    skill: Skill,
    setSkills: Dispatch<SetStateAction<Skill[]>>

    setIsSaving: Dispatch<SetStateAction<boolean>>
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, setSkills, setIsSaving }) => {
    const windowWidth = useSelector((state: RootState) => state.breakpoint.windowWidth)

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

        setIsSaving(true)
    }

    const incrementScore = (id: number) => {
        setSkills(prev => prev.map(skill => 
            skill.id === id && skill.score < 10 
                ? { ...skill, score: skill.score + 1 } 
                : skill
        ));

        setIsSaving(true)
    };

    const decrementScore = (id: number) => {
        setSkills(prev => prev.map(skill => 
            skill.id === id && skill.score > 0 
                ? { ...skill, score: skill.score - 1 } 
                : skill
        ));

        setIsSaving(true)
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

            setIsSaving(true)
        }
    }


    const secondLine = (
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
    )
    

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
                        name={skill.name}
                        placeholder='Text...'
                        value={skill.name}
                        variant='admin'
                        iconPosition='noIcon'
                        adminLabel='withoutLabel'
                        onChange={handleChangeName}
                    />
                </div>

                {
                    windowWidth >= 800 && (
                        secondLine
                    )
                }

                <Button
                    variant="black"
                    behavior="default"
                    iconPosition="only"
                    icon="trash"
                    onClick={() => deleteItem(skill.id)}
                    additionalClass={styles.deleteBtn}
                />
            </div>

                {
                    windowWidth <= 800 && (
                        secondLine
                    )
                }
        </div>
    )
}


interface EditSkillModal {
    initialSkills: Skill[]
}

const EditSkillModal: React.FC<EditSkillModal> = ({ initialSkills}) => {
    const [skills, setSkills] = useState<Skill[]>(initialSkills)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isSaving, setIsSaving] = useState(false)

    const debouncedSkills = useDebounce(skills, 1000);

    // Сохранение на сервере
    useEffect(() => {
        const saveSkills = async () => {
            const hasChanged = JSON.stringify(skills) !== JSON.stringify(initialSkills)
            if (!hasChanged) return;

            setIsSaving(true)
            try {
                await updateSkills(skills)
                console.log('✅ Skills saved');
            } catch (error) {
                console.error('❌ Failed to save skills:', error);
            }
            finally {
                setIsSaving(false)
            }
        }

        saveSkills()
    }, [debouncedSkills, initialSkills])
  


    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [skills.length])
    
    const addItem = () => {
        const maxId = Math.max(...skills.map(s => s.id), 0);
        const newSkill: Skill = {
            id: maxId + 1,
            name: '',
            score: 0
        }
        setIsSaving(true)

        setSkills(prev => [...prev, newSkill])
    }

    const disableBtn = () => {
        if (skills.length >= 4) {
            return 'disabled'
        }

        return 'default'
    }

    return (
        <ModalWrapper
            drag={true}
            tooltipVisible={true}
            disableBtn={disableBtn}
            addItem={addItem}
            items={skills}
            setItems={setSkills}
            ref={containerRef}

            modalName='editSkills'

            title='Edit Skills'
            subTitle='Manage your homepage skill section'

            tooltipMax={4}
            tooltipText='Maximum 4 skills allowed'
        >
            <SavingIndicator isSaving={isSaving} />

            {skills.map(skill => (
                <SkillItem 
                    key={skill.id} 
                    skill={skill} 
                    setSkills={setSkills} 

                    setIsSaving={setIsSaving}
                />
            ))}
        </ModalWrapper>
                 
    );
}

export default EditSkillModal;