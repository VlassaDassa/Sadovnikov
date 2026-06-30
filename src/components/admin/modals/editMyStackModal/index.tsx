'use client'

import React, { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable'

import Button from '@/components/shared/button/Button';
import DragHandler from '../dragHandler';
import Input from '@/components/shared/input';
import ModalWrapper from '../modalWrapper';

import { Stack } from '@/interfaces/general';

import styles from './index.module.scss';



interface StackItemProps {
    stackItem: Stack,
    setStack: Dispatch<SetStateAction<Stack[]>>
}

const StackItem: React.FC<StackItemProps> = ({ stackItem, setStack }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: stackItem.id})


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    }

    const deleteItem = (id: number) => {
        setStack(prev => prev.filter((item) => item.id !== id))
    }


    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newName = e.target.value;
        
        if (newName.length <= 20) {
                setStack(
                prev => prev.map((item) => item.id === stackItem.id 
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
            className={`${styles.stackItem} modalElementBg`}
        >
            <DragHandler
                variant="small"
            />

            <Input 
                name={stackItem.name}
                placeholder='Text...'
                value={stackItem.name}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withoutLabel'
                onChange={handleChangeName}
            />

            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="trash"
                onClick={() => deleteItem(stackItem.id)}
                additionalClass={styles.deleteBtn}
            />
        </div>
    )
}


interface EditMyStackModalProps {
    initialStack: Stack[]
}

const EditMyStackModal: React.FC<EditMyStackModalProps> = ({ initialStack }) => {
    const [stack, setStack] = useState(initialStack)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [stack.length])
    
    const addItem = () => {
        const maxId = Math.max(...stack.map(s => s.id), 0);
        const nweStack: Stack = {
            id: maxId + 1,
            name: '',
        }

        setStack(prev => [...prev, nweStack])
    }

    const disableBtn = () => {
        if (stack.length >= 9) {
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
            items={stack}
            setItems={setStack}
            ref={containerRef}

            modalName='editMyStack'

            title='Edit Stack'
            subTitle='Manage your homepage stack section'

            tooltipMax={9}
            tooltipText='Maximum 9 technologies allowed'
        >
            {stack.map(stackItem => (
                <StackItem 
                    key={stackItem.id} 
                    stackItem={stackItem} 
                    setStack={setStack} 
                />
            ))}
        </ModalWrapper>
                 
    );
}

export default EditMyStackModal;