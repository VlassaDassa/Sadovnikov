import React, { useState, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable} from '@dnd-kit/sortable'

import Input from '@/components/shared/input';
import IconUploader from '@/components/admin/general/iconUploader';
import ModalWrapper from '@/components/admin/modals/modalWrapper';
import DragHandler from '../dragHandler';
import Button from '@/components/shared/button/Button';

import { footerItems } from '@/mockData/footer';
import { IFooterItem } from '@/interfaces/general';

import styles from './index.module.scss';


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

    const handleIconUpload = (path: string, index: number) => {
        setItems(prev => prev.map((item, i) => 
            i === index ? {...item, icon: path} : item
        ))
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

                <IconUploader 
                    additionalClass={styles.iconBtnWrapper}
                    icon={item.icon}
                    onIconUpload={(path: string) => handleIconUpload(path, item.id)}
                />
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
    const [items, setItems] = useState(footerItems)
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultIcon = '/images/mockImages/footer/default.svg'

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [items.length])

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
            icon: defaultIcon
        }

        setItems(prev => [...prev, newItems])
    }


    return (
        <ModalWrapper
            drag={true}
            tooltipVisible={false}
            disableBtn={disableBtn}
            addItem={addItem}

            modalName='editFooter'

            title='Edit Footer'
            subTitle='Customize the footer content and links'
            ref={containerRef}

            items={items}
            setItems={setItems}
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
        </ModalWrapper>
    )
}

export default EditFooterModal;