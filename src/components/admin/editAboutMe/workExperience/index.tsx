'use client'

import React, { Dispatch, SetStateAction } from 'react';
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
import {
    useSortable,
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'


import { 
    toggleIsOverlayVisible, 
    toggleSelectPeriodModal,
    setCurrentId

} from '@/store/slices/uiSlice'; 


import AnimatedSection from '@/components/shared/AnimatedScroll';
import SectionBackground from "@/components/admin/general/sectionBackground";
import SectionTitle from '@/components/admin/general/sectionTitle';
import DragHandler from '@/components/admin/modals/dragHandler';
import Button from '@/components/shared/button/Button';
import Input from '@/components/shared/input';

import type { WorkExperience } from '@/interfaces/general';

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
        dispatch(toggleSelectPeriodModal())
        dispatch(toggleIsOverlayVisible())
        dispatch(setCurrentId(item.id))
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
            {...attributes}
            {...listeners}
            style={style} 
        >
            <div className={styles.assistantBtn}>
                <DragHandler 
                    variant='big'
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
                    name='period'
                    placeholder='Choice period'
                    iconPosition='iconLeft'
                    icon={{first: 'calendar'}}
                    value={`${displayDate(item.workingPeriod.startDate)} - ${displayDate(item.workingPeriod.endDate)}`}
                    disabled={true}
                    variant='admin'
                    adminLabel='withLabel'
                    label='Period'
                    readonly={true}
                    additionalClass={styles.periodInput}
                    onClick={openSelectPeriod}
                />

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
            </div>
        </SectionBackground>
    )
}



interface WorkExperienceProps {
    data: WorkExperience[],
    setData: Dispatch<SetStateAction<WorkExperience[]>>;
}


const WorkExperience: React.FC<WorkExperienceProps> = ({ data, setData }) => {
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
            const oldIndex = data.findIndex((item) => item.id === active.id)
            const newIndex = data.findIndex((item) => item.id === over?.id)
            setData(arrayMove(data, oldIndex, newIndex))
        }
    }

    const deleteItem = (id: number) => {
        setData(prev => prev.filter((item) => item.id !== id))
    }

    const updateItem = (id: number, field: keyof WorkExperience, value: string) => {
        setData(prev => prev.map(item => 
            item.id === id ? {...item, [field]: value} : item
        ))
    }

    const addItem = () => {
        const maxId = Math.max(...data.map(s => s.id), 0);
        const newExp: WorkExperience = {
            id: maxId + 1,
            position: '',
            organization: '',
            workingPeriod: {
                startDate: '',
                endDate: ''
            },
            description: ''
        }

        setData(prev => [...prev, newExp])
    }


    // DEBOUNCE
    const saveChanges = () => {
        return
        // console.log('Updated Work Experience:', data);
    }

    const handleChange = (id: number, field: keyof WorkExperience, value: string) => {
        updateItem(id, field, value);
        saveChanges();
    }

    return (
        <section className={`${styles.section}`}>
            <SectionTitle 
                text='Add, edit or reorder your work experience'
                title='WORK EXPERIENCE'
                counter={true}
                count={data.length}
            />

            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={data.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {data.map((item) => (
                        <AnimatedSection key={item.id}  animation='fade-up'>
                            <Item 
                                item={item}
                                onChange={handleChange} 
                                deleteItem={deleteItem}
                            />
                        </AnimatedSection>
                        
                    ))}
                </SortableContext>
            </DndContext>

            <Button 
                behavior='default'
                variant='black'
                iconPosition='leftIcon'
                icon='plus'
                text='Add New Project'
                onClick={addItem}

                additionalClass={styles.addBtn}
            />
        </section>
    )
}

export default WorkExperience;