'use client'

import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import IconUploader from '@/components/admin/general/iconUploader'
import Button from '@/components/shared/button/Button'
import Input from '@/components/shared/input'
import SavingIndicator from '@/components/shared/SavingIndicator'

import DragHandler from '../dragHandler'
import ModalWrapper from '../modalWrapper'

import { updateFooter } from '@/app/actions/footer'
import { useDebounce } from '@/hooks/useDebounce'
import { IFooterItem } from '@/interfaces/general'
import {
    registerBeforeClose,
    unregisterBeforeClose,
} from '@/lib/modals'

import styles from './index.module.scss'

const MODAL_NAME = 'editFooter'

const DEFAULT_ICON =
    '/images/mockImages/footer/default.svg'

interface FooterItemProps {
    item: IFooterItem
    setItems: Dispatch<
        SetStateAction<IFooterItem[]>
    >
    setIsSaving: Dispatch<
        SetStateAction<boolean>
    >
}

const FooterItem: React.FC<
    FooterItemProps
> = ({
    item,
    setItems,
    setIsSaving,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.id,
    })

    const style = {
        transform:
            CSS.Transform.toString(
                transform,
            ),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    const deleteItem = (
        id: number,
    ) => {
        setIsSaving(true)

        setItems((previous) =>
            previous.filter(
                (footerItem) =>
                    footerItem.id !== id,
            ),
        )
    }

    const handleChangeText = (
        event: React.ChangeEvent<
            | HTMLInputElement
            | HTMLTextAreaElement
        >,
    ) => {
        const newText =
            event.target.value

        setItems((previous) =>
            previous.map(
                (footerItem) =>
                    footerItem.id ===
                    item.id
                        ? {
                              ...footerItem,
                              text: newText,
                          }
                        : footerItem,
            ),
        )

        setIsSaving(true)
    }

    const handleChangeLink = (
        event: React.ChangeEvent<
            | HTMLInputElement
            | HTMLTextAreaElement
        >,
    ) => {
        const newLink =
            event.target.value

        setItems((previous) =>
            previous.map(
                (footerItem) =>
                    footerItem.id ===
                    item.id
                        ? {
                              ...footerItem,
                              link: newLink,
                          }
                        : footerItem,
            ),
        )

        setIsSaving(true)
    }

    const handleIconUpload = (
        path: string,
        id: number,
    ) => {
        setItems((previous) =>
            previous.map(
                (footerItem) =>
                    footerItem.id === id
                        ? {
                              ...footerItem,
                              icon: path,
                          }
                        : footerItem,
            ),
        )

        setIsSaving(true)
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
                variant="big"
                additionalClass={
                    styles.dragHand
                }
            />

            <div
                className={
                    styles.inputs
                }
            >
                <Input
                    name={`footer-text-${item.id}`}
                    placeholder="Text..."
                    additionalClass={
                        styles.input
                    }
                    type="text"
                    iconPosition="noIcon"
                    value={item.text}
                    variant="admin"
                    adminLabel="withoutLabel"
                    onChange={
                        handleChangeText
                    }
                />

                <Input
                    name={`footer-link-${item.id}`}
                    placeholder="Link (optional)"
                    additionalClass={`${styles.input} ${styles.linkInput}`}
                    type="text"
                    iconPosition="noIcon"
                    value={
                        item.link ?? ''
                    }
                    variant="admin"
                    adminLabel="withoutLabel"
                    onChange={
                        handleChangeLink
                    }
                />

                <IconUploader
                    additionalClass={
                        styles.iconBtnWrapper
                    }
                    icon={item.icon}
                    onIconUpload={(
                        path: string,
                    ) =>
                        handleIconUpload(
                            path,
                            item.id,
                        )
                    }
                />
            </div>

            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="trash"
                onClick={() =>
                    deleteItem(
                        item.id,
                    )
                }
                additionalClass={
                    styles.deleteBtn
                }
            />
        </div>
    )
}

interface EditFooterModalProps {
    footer: IFooterItem[]
}

const EditFooterModal: React.FC<
    EditFooterModalProps
> = ({
    footer,
}) => {
    const [items, setItems] =
        useState<IFooterItem[]>(
            footer,
        )

    const [
        isSaving,
        setIsSaving,
    ] = useState(false)

    const containerRef =
        useRef<HTMLDivElement>(null)

    const debouncedFooter =
        useDebounce(
            items,
            1000,
        )

    const saveFooter = useCallback(
        async (
            footerToSave: IFooterItem[],
        ) => {
            const hasChanged =
                JSON.stringify(
                    footerToSave,
                ) !==
                JSON.stringify(
                    footer,
                )

            if (!hasChanged) {
                return
            }

            try {
                await updateFooter(
                    footerToSave,
                )
            } catch (error) {
                console.error(
                    'Failed to save footer:',
                    error,
                )
            } finally {
                setIsSaving(false)
            }
        },
        [
            footer,
        ],
    )

    const setItemsFromDrag =
        useCallback<
            Dispatch<
                SetStateAction<
                    IFooterItem[]
                >
            >
        >(
            (nextItems) => {
                setIsSaving(true)
                setItems(nextItems)
            },
            [],
        )

    useEffect(() => {
        void saveFooter(
            debouncedFooter,
        )
    }, [
        debouncedFooter,
        saveFooter,
    ])

    useEffect(() => {
        const saveBeforeClose =
            () => {
                return saveFooter(
                    items,
                )
            }

        registerBeforeClose(
            MODAL_NAME,
            saveBeforeClose,
        )

        return () => {
            unregisterBeforeClose(
                MODAL_NAME,
            )
        }
    }, [
        items,
        saveFooter,
    ])

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        containerRef.current.scrollTop =
            containerRef.current.scrollHeight
    }, [
        items.length,
    ])

    const disableBtn = () => {
        if (items.length >= 3) {
            return 'disabled'
        }

        return 'default'
    }

    const addItem = () => {
        const maxId = Math.max(
            ...items.map(
                (item) => item.id,
            ),
            0,
        )

        const newItem: IFooterItem = {
            id: maxId + 1,
            text: '',
            icon: DEFAULT_ICON,
            link: null,
        }

        setIsSaving(true)

        setItems(
            (previous) => [
                ...previous,
                newItem,
            ],
        )
    }

    return (
        <ModalWrapper
            drag={true}
            tooltipVisible={true}
            tooltipText="Maximum 3 items allowed"
            tooltipMax={3}
            disableBtn={disableBtn}
            addItem={addItem}
            modalName={MODAL_NAME}
            title="Edit Footer"
            subTitle="Customize the footer content and links"
            ref={containerRef}
            items={items}
            setItems={
                setItemsFromDrag
            }
        >
            <SavingIndicator
                isSaving={isSaving}
            />

            {items.map(
                (item) => (
                    <FooterItem
                        key={item.id}
                        item={item}
                        setItems={
                            setItems
                        }
                        setIsSaving={
                            setIsSaving
                        }
                    />
                ),
            )}
        </ModalWrapper>
    )
}

export default EditFooterModal