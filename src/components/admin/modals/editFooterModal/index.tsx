import React, { useState, Dispatch, SetStateAction } from 'react';
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

import ModalBackground from '@/components/admin/general/modalBackground';
import ModalHeader from '../../general/modalHeader';
import Button from '@/components/shared/button/Button';
import DragHandler from '../dragHandler';
import Input from '@/components/shared/input';


import { footerItems } from '@/mockData/footer';
import { closeModals } from '@/lib/modals';
import { IFooterItem } from '@/interfaces/general';

import styles from './index.module.scss';
import AdaptiveImage from '@/components/shared/AdaptiveImage';


interface FooterItemProps {
    item: IFooterItem,
    setItems: Dispatch<SetStateAction<IFooterItem[]>>
}


const FooterItem: React.FC<FooterItemProps> = ({ item, setItems }) => {
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

    const deleteItem = (id: number) => {
        setItems(prev => prev.filter((el) => el.id !== id))
    }

    const handleChangText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newText = e.target.value;
        
        setItems(
            prev => prev.map((el) => el.id === item.id 
                ? {...el, text: newText}
                : el
            ) 
        )
    }

    const handleChangLink = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newLink = e.target.value;
        
        setItems(
            prev => prev.map((el) => el.id === item.id 
                ? {...el, link: newLink}
                : el
            ) 
        )
    }

    return (
        <div 
            className={`${styles.item} modalElementBg`}
            ref={setNodeRef} 
            {...attributes}
            {...listeners}
            style={style} 
        >
            <DragHandler 
                variant='small'
                additionalClass={styles.dragHand}

            />

            <div className={styles.inputs}>
                <Input 
                    name={item.text}
                    placeholder='Text...'
                    additionalClass={styles.input}
                    type='text'
                    iconPosition='noIcon'
                    value={item.text}
                    variant='admin'
                    adminLabel='withoutLabel'
                    onChange={handleChangText}
                />

                <Input 
                    name={item.text}
                    placeholder='Link (optional)'
                    additionalClass={`${styles.input} ${styles.linkInput}`}
                    type='text'
                    iconPosition='noIcon'
                    value={item.link || ''}
                    variant='admin'
                    adminLabel='withoutLabel'
                    onChange={handleChangLink}
                />


                <div className={styles.iconBtnWrapper}>
                    <AdaptiveImage 
                        src={item.icon}
                        wrapClass={styles.iconBtn}
                    />
                </div>
            </div>

            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="trash"
                onClick={() => deleteItem(item.id)}
                additionalClass={styles.deleteBtn}
            />
        </div>
    )
}



const EditFooterModal: React.FC = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState(footerItems)

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

    const disableBtn = () => {
        if (items.length >= 3) {
            return 'disabled'
        }

        return 'default'
    }

    const addItem = () => {
        const maxId = Math.max(...items.map(s => s.id), 0);
        const newItems: IFooterItem = {
            id: maxId + 1,
            text: '',
            icon: '/images/mockImages/footer/default.svg'
        }

        setItems(prev => [...prev, newItems])
    }


    return (
        <ModalBackground
            className={styles.modalBackground}
        >
            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="close"
                onClick={() => closeModals(dispatch, 'editFooter')}
                additionalClass={styles.closeButton}
            />

            <ModalHeader 
                title='Edit Footer'
                subTitle='Customize the footer content and links'
                icon='arrow'
            />

            <div className={styles.content}>
                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >

                    <SortableContext
                        items={items.map(s => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {
                            items.map((item) => (
                                <FooterItem 
                                    key={item.id}
                                    item={item}
                                    setItems={setItems}
                                />
                            ))
                        }
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

            
        </ModalBackground>
    )
}

export default EditFooterModal;