'use client'

import React from 'react';
import { useDispatch } from "react-redux";
import { CSS } from '@dnd-kit/utilities';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    useSortable,
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'


import {
    openSelectPeriodModal,
    setCurrentId,
    showOverlay,

} from '@/store/slices/uiSlice'; 


import SectionBackground from "@/components/admin/general/sectionBackground";
import SectionTitle from '@/components/admin/general/sectionTitle';
import DragHandler from '@/components/admin/modals/dragHandler';
import Button from '@/components/shared/button/Button';
import Input from '@/components/shared/input';

import type { WorkExperience, AboutMe } from '@/interfaces/general';

import { displayDate } from '@/lib/dates';

import styles from './index.module.scss';



interface ItemProps {
    item: WorkExperience,
    onChange: (id: number, field: keyof WorkExperience, value: string) => void,
    deleteItem: (id:number) => void;
    
}

const Item: React.FC<ItemProps> = ({ item, onChange, deleteItem }) => {
    const dispatch = useDispatch()
    const handleChange = (field: keyof WorkExperience) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(item.id, field, e.target.value);
    }

    const openSelectPeriod = () => {
        dispatch(setCurrentId(item.id))
        dispatch(openSelectPeriodModal())
        dispatch(showOverlay())
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: item.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    }

    return (
        <SectionBackground 
            className={`${styles.sectionBg} ${styles.item}`}
            ref={setNodeRef}
            style={style} 
        >
            <div className={styles.assistantBtn}>
                <DragHandler 
                    variant='big'
                    {...attributes}
                    {...listeners}
                />

                <Button 
                    behavior='default'
                    variant='black'
                    iconPosition='only'
                    icon='trash'
                    onClick={() => deleteItem(item.id)}
                />
            </div>

            <div className={styles.inputs}>
                <div className={styles.inputGroup}>
                    <Input 
                        name='organization'
                        placeholder='Text...'
                        iconPosition='noIcon'
                        value={item.organization}
                        variant='admin'
                        adminLabel='withLabel'
                        label='Organization'
                        onChange={handleChange('organization')}
                    />

                    <Input 
                        name='organizationRu'
                        placeholder='Text on russian...'
                        iconPosition='noIcon'
                        value={item.organizationRu}
                        variant='admin'
                        adminLabel='withoutLabel'
                        onChange={handleChange('organizationRu')}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <Input 
                        name='position'
                        placeholder='Text...'
                        iconPosition='noIcon'
                        value={item.position}
                        variant='admin'
                        adminLabel='withLabel'
                        label='Position'
                        onChange={handleChange('position')}
                    />

                    <Input 
                        name='positionRu'
                        placeholder='Text on russian...'
                        iconPosition='noIcon'
                        value={item.positionRu}
                        variant='admin'
                        adminLabel='withoutLabel'
                        onChange={handleChange('positionRu')}
                    />
                </div>

                <Input 
                    name='period'
                    placeholder='Choice period'
                    iconPosition='iconLeft'
                    icon={{first: 'calendar'}}
                    value={`${displayDate(item.workingPeriod.startDate)} - ${displayDate(item.workingPeriod.endDate)}`}
                    variant='admin'
                    adminLabel='withLabel'
                    label='Period'
                    readonly={true}
                    additionalClass={styles.periodInput}
                    onClick={openSelectPeriod}
                />

                <div className={`${styles.inputGroup} ${styles.inputGroupTextArea}`}>
                    <Input 
                        name='responsibilities'
                        type='textarea'
                        placeholder='Text...'
                        iconPosition='noIcon'
                        additionalClass={styles.responsibilities}
                        value={item.description}
                        variant='admin'
                        adminLabel='withLabel'
                        label='Responsibilities'
                        counter={true}
                        maxLen={500}
                        maxCounter={500}
                        onChange={handleChange('description')}
                    />

                    <Input 
                        name='responsibilitiesRu'
                        type='textarea'
                        placeholder='Text on russian...'
                        iconPosition='noIcon'
                        additionalClass={styles.responsibilities}
                        value={item.descriptionRu}
                        variant='admin'
                        adminLabel='withoutLabel'
                        counter={true}
                        maxLen={500}
                        maxCounter={500}
                        onChange={handleChange('descriptionRu')}
                    />
                </div>

                
            </div>
        </SectionBackground>
    )
}



interface WorkExperienceProps {
    data: AboutMe,
    setData: React.Dispatch<React.SetStateAction<AboutMe>>,
    setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
}


const WorkExperience: React.FC<WorkExperienceProps> = ({ data, setData, setIsSaving }) => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, 
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return
        }

        setData((previous) => {
            const oldIndex = previous.workExperience.findIndex(
                (item) => item.id === active.id,
            )
            const newIndex = previous.workExperience.findIndex(
                (item) => item.id === over.id,
            )

            if (oldIndex === -1 || newIndex === -1) {
                return previous
            }

            return {
                ...previous,
                workExperience: arrayMove(
                    previous.workExperience,
                    oldIndex,
                    newIndex,
                ),
            }
        })

        setIsSaving(true)
    }

    const deleteItem = (id: number) => {
        setData(prev => ({...prev, workExperience: prev.workExperience.filter((item) => item.id !== id)}))
        setIsSaving(true)
    }

    const updateItem = (id: number, field: keyof WorkExperience, value: string) => {
        setData(prev => ({...prev, workExperience: prev.workExperience.map(item => 
            item.id === id ? {...item, [field]: value} : item
        )}))
        setIsSaving(true)
    }

    const addItem = () => {
        const nextTemporaryId = Math.min(
            0,
            ...data.workExperience.map((experience) => experience.id),
        ) - 1;
        const newExp: WorkExperience = {
            id: nextTemporaryId,
            position: '',
            positionRu: '',
            organization: '',
            organizationRu: '',
            workingPeriod: {
                startDate: '',
                endDate: ''
            },
            description: '',
            descriptionRu: ''
        }

        setData(prev => ({...prev, workExperience: [...prev.workExperience, newExp]}))
        setIsSaving(true)
    }
   

    const handleChange = (id: number, field: keyof WorkExperience, value: string) => {
        updateItem(id, field, value);
        setIsSaving(true);
    }

    return (
        <section className={`${styles.section}`}>
            <SectionTitle 
                text='Add, edit or reorder your work experience'
                title='WORK EXPERIENCE'
                counter={true}
                count={data.workExperience.length}
            />

            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={data.workExperience.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {data.workExperience.map((item) => (
                        <Item
                            key={item.id}
                            item={item}
                            onChange={handleChange}
                            deleteItem={deleteItem}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <Button 
                behavior='default'
                variant='black'
                iconPosition='leftIcon'
                icon='plus'
                text='Add New Item'
                noize={true}
                onClick={addItem}

                additionalClass={`${styles.addBtn}`}
            />
        </section>
    )
}

export default WorkExperience;
