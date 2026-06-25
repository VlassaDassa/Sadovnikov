import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
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
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'

import ModalBackground from '@/components/admin/modals/modalBackground';
import ModalHeader from '../modalHeader';
import ModalTooltip from '../modalTooltip';
import Button from '@/components/shared/button/Button';

import { closeModals } from '@/lib/modals';

import styles from './index.module.scss';



interface ModalWrapperProps {
    drag: boolean;
    tooltipVisible: boolean;
    tooltipMax?: number;

    modalName: string;

    tooltipText?: string;
    title: string;
    subTitle: string;

    button?: boolean;

    disableBtn?: () => "default" | "loading" | "disabled";
    addItem?: () => void;
    items?: any[];
    setItems?: Dispatch<SetStateAction<any[]>>;

    children: React.ReactNode;
}


const ModalWrapper: React.FC<ModalWrapperProps> = ({ 
    drag, 
    tooltipVisible,
    tooltipMax,

    modalName,
    
    title,
    subTitle,
    tooltipText='Manage items',

    button=false,

    children, 
    disableBtn = () => "default",
    addItem = () => {},
    items = [],
    setItems = () => {}
}) => {
    const dispatch = useDispatch()

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
            const oldIndex = items.findIndex((item) => item.id === active.id)
            const newIndex = items.findIndex((item) => item.id === over?.id)
            setItems(arrayMove(items, oldIndex, newIndex))
        }
    }

    
    let content = (
        <div className={styles.content}>
            {
                tooltipVisible && (
                    <ModalTooltip 
                        text={tooltipText}
                        counter={items.length}
                        max={tooltipMax}
                    />
                )
                    
            }

            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >

                <SortableContext
                    items={items.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    { children }

                </SortableContext>
            </DndContext>

            <Button
                variant="black"
                behavior={disableBtn()}
                iconPosition="noIcon"
                text={'Add Item'}
                additionalClass={styles.addBtn}
                onClick={addItem}
            />
        </div>
    )

    if (!drag) {
        content = (
            <div className={styles.content}>
                {
                    tooltipVisible &&
                    <ModalTooltip 
                        text={tooltipText}
                        counter={items.length}
                        max={tooltipMax}
                    />
                }

                { children }
                
                {
                    button &&

                    <Button
                        variant="black"
                        behavior={disableBtn()}
                        iconPosition="noIcon"
                        text={'Add Item'}
                        additionalClass={styles.addBtn}
                        onClick={addItem}
                    />
                }
                
            </div>
        )
    }

    return (
        <ModalBackground
            className={`${styles.modalBackground} ${!drag && styles.modalBackgroundNoDrag}`}
        >
            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="close"
                onClick={() => closeModals(dispatch, modalName)}
                additionalClass={styles.closeButton}
            />

            <ModalHeader 
                title={title}
                subTitle={subTitle}
                icon='arrow'
            />

            {content}
            
        </ModalBackground>
    )
}

export default ModalWrapper;