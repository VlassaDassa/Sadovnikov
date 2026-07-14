import React, { useState, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable} from '@dnd-kit/sortable'

import Input from '@/components/shared/input';
import IconUploader from '@/components/admin/general/iconUploader';
import ModalWrapper from '@/components/admin/modals/modalWrapper';
import DragHandler from '../dragHandler';
import Button from '@/components/shared/button/Button';
import SavingIndicator from '@/components/shared/SavingIndicator';

import { IFooterItem } from '@/interfaces/general';
import { useDebounce } from '@/hooks/useDebounce';
import { updateFooter } from '@/app/actions/footer';
import { registerBeforeClose, unregisterBeforeClose } from '@/lib/modals';

import styles from './index.module.scss';




interface FooterItemProps {
    item: IFooterItem,
    setItems: Dispatch<SetStateAction<IFooterItem[]>>,
    setIsSaving: Dispatch<SetStateAction<boolean>>,
}


const FooterItem: React.FC<FooterItemProps> = ({ item, setItems, setIsSaving }) => {
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

        setIsSaving(true)
    }

    const handleChangText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newText = e.target.value;
        
        setItems(
            prev => prev.map((el) => el.id === item.id 
                ? {...el, text: newText}
                : el
            ) 
        )
        
        setIsSaving(true)
    }

    const handleChangLink = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newLink = e.target.value;
        
        setItems(
            prev => prev.map((el) => el.id === item.id 
                ? {...el, link: newLink}
                : el
            ) 
        )

        setIsSaving(true)
    }

    const handleIconUpload = (path: string, id: number) => {
        setItems(prev => {
            const newItems = prev.map((item) => {
                if (item.id === id) {
                    return { ...item, icon: path };
                }
                return item;
            });
            return newItems;
        });

        setIsSaving(true);
    };

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

interface EditFooterModalProps {
    footer: IFooterItem[]
}

const EditFooterModal: React.FC<EditFooterModalProps> = ({ footer }) => {
    const [items, setItems] = useState<IFooterItem[]>(footer)
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false)
    const modalName = 'editFooter'
    const defaultIcon = '/images/mockImages/footer/default.svg'

    const debouncedFooter = useDebounce(items, 1000);

    const saveFooter = async () => {
        const hasChanged = JSON.stringify(items) !== JSON.stringify(footer)
        if (!hasChanged) return;

        setIsSaving(true)
        try {
            await updateFooter(items)
            console.log('✅ Footer saved');
        } catch (error) {
            console.error('❌ Failed to save footer:', error);
        }
        finally {
            setIsSaving(false)
        }
    }

    useEffect(() => {
        saveFooter()
    }, [debouncedFooter])

    useEffect(() => {
        registerBeforeClose(modalName, saveFooter);

        return () => {
            unregisterBeforeClose(modalName);
        };
    }, [items]);


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
        const maxId = Math.max(...footer.map(s => s.id), 0);
        const newItems: IFooterItem = {
            id: maxId + 1,
            text: '',
            icon: defaultIcon,
            link: null
        }
        setIsSaving(true)

        setItems(prev => [...prev, newItems])
    }


    return (
        <ModalWrapper
            drag={true}
            tooltipVisible={false}
            disableBtn={disableBtn}
            addItem={addItem}

            modalName={modalName}

            title='Edit Footer'
            subTitle='Customize the footer content and links'
            ref={containerRef}

            items={items}
            setItems={setItems}
        >
            <SavingIndicator isSaving={isSaving} />

            {
                items.map((item) => (
                    <FooterItem 
                        key={item.id}
                        item={item}
                        setItems={setItems}
                        setIsSaving={setIsSaving}
                    />
                ))
            }
        </ModalWrapper>
    )
}

export default EditFooterModal;