"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Input from '@/components/shared/input';
import ModalWrapper from '@/components/admin/modals/modalWrapper';
import Button from '@/components/shared/button/Button';

import { publishEvolution, saveEvolutionDraft } from "@/app/actions/evolution";
import type { IEvolutionDraftItem } from "@/interfaces/evolution";

import styles from "./index.module.scss";





interface EvolutionReviewModalProps {
    projectId: number;
    githubLink: string;
    initialItems: IEvolutionDraftItem[];
    onDraftSaved: (items: IEvolutionDraftItem[]) => void;
    onPublished: (publishedCount: number) => void;
}

function cloneItems(
    items: IEvolutionDraftItem[]
): IEvolutionDraftItem[] {
    return items.map((item) => ({
        ...item,

        nameRu: item.nameRu ?? '',
        dateRu: item.dateRu ?? '',
        textRu: item.textRu ?? '',

        sourceShas: [...item.sourceShas],
    }))
}

function prepareItems(
    items: IEvolutionDraftItem[]
): IEvolutionDraftItem[] {
    return items.map((item) => ({
        ...item,

        name: item.name.trim(),
        nameRu: item.nameRu.trim(),

        date: item.date.trim(),
        dateRu: item.dateRu.trim(),

        text: item.text.trim(),
        textRu: item.textRu.trim(),

        sourceShas: Array.from(
            new Set(item.sourceShas)
        ),
    }))
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Evolution action failed";
}

const EvolutionReviewModal: React.FC<EvolutionReviewModalProps> = ({
    projectId,
    githubLink,
    initialItems,
    onDraftSaved,
    onPublished,
}) => {
    const [items, setItems] = useState<IEvolutionDraftItem[]>([]);

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const [isSaving, setIsSaving] = useState(false);

    const [isPublishing, setIsPublishing] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const isEvolutionReviewModalOpen = useSelector((state: RootState) => state.uiState.isEvolutionReviewModal)

    const isBusy = isSaving || isPublishing;

    const normalizedGithubLink = useMemo(() => {
        return githubLink
            .trim()
            .replace(/\.git$/i, "")
            .replace(/\/+$/, "");
    }, [githubLink]);

    const selectedItem = useMemo(() => {
        return (
            items.find((item) => {
                return item.id === selectedItemId;
            }) ?? null
        );
    }, [items, selectedItemId]);

    useEffect(() => {
        if (isEvolutionReviewModalOpen) {
            const nextItems = cloneItems(initialItems);

            setItems(nextItems);

            setSelectedItemId(nextItems[0]?.id ?? null);

            setError(null);
        }
    }, [open, initialItems]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);


    function updateItem(id: string, patch: Partial<IEvolutionDraftItem>): void {
        setItems((currentItems) => {
            return currentItems.map((item) => {
                if (item.id !== id) {
                    return item;
                }

                return {
                    ...item,
                    ...patch,
                };
            });
        });
    }

    function addItem(): void {
        const newItem: IEvolutionDraftItem = {
            id: crypto.randomUUID(),

            name: '',
            nameRu: '',

            date: '',
            dateRu: '',

            text: '',
            textRu: '',

            sourceShas: [],
        }

        setItems((currentItems) => {
            return [...currentItems, newItem];
        });

        setSelectedItemId(newItem.id);

        setError(null);
    }

    function deleteItem(id: string): void {
        const currentIndex = items.findIndex((item) => {
            return item.id === id;
        });

        const nextItems = items.filter((item) => {
            return item.id !== id;
        });

        setItems(nextItems);

        if (selectedItemId === id) {
            const nextSelected =
                nextItems[currentIndex] ?? nextItems[currentIndex - 1] ?? null;

            setSelectedItemId(nextSelected?.id ?? null);
        }

        setError(null);
    }

    function moveItem(id: string, direction: -1 | 1): void {
        const currentIndex = items.findIndex((item) => {
            return item.id === id;
        });

        const targetIndex = currentIndex + direction;

        if (
            currentIndex < 0 ||
            targetIndex < 0 ||
            targetIndex >= items.length
        ) {
            return;
        }

        const nextItems = [...items];

        const [movedItem] = nextItems.splice(currentIndex, 1);

        if (!movedItem) {
            return;
        }

        nextItems.splice(targetIndex, 0, movedItem);

        setItems(nextItems);
    }

    function validateItems(): string | null {
        if (items.length === 0) {
            return 'At least one milestone is required'
        }

        if (items.length > 20) {
            return 'Evolution cannot contain more than 20 milestones'
        }

        for (
            let index = 0;
            index < items.length;
            index += 1
        ) {
            const item = items[index]
            const position = index + 1

            const fields = [
                {
                    value: item.name,
                    label: 'English title',
                    min: 3,
                    max: 70,
                },
                {
                    value: item.nameRu,
                    label: 'Russian title',
                    min: 3,
                    max: 70,
                },
                {
                    value: item.date,
                    label: 'English date',
                    min: 1,
                    max: 40,
                },
                {
                    value: item.dateRu,
                    label: 'Russian date',
                    min: 1,
                    max: 40,
                },
                {
                    value: item.text,
                    label: 'English description',
                    min: 10,
                    max: 300,
                },
                {
                    value: item.textRu,
                    label: 'Russian description',
                    min: 10,
                    max: 300,
                },
            ]

            for (const field of fields) {
                const length = field.value.trim().length

                if (length < field.min) {
                    return [
                        `Milestone ${position}:`,
                        `${field.label} must contain`,
                        `at least ${field.min} characters`,
                    ].join(' ')
                }

                if (length > field.max) {
                    return [
                        `Milestone ${position}:`,
                        `${field.label} cannot exceed`,
                        `${field.max} characters`,
                    ].join(' ')
                }
            }
        }

        return null
    }

    async function handleSave(): Promise<void> {
        const validationError = validateItems();

        if (validationError) {
            setError(validationError);

            return;
        }

        const preparedItems = prepareItems(items);

        setError(null);
        setIsSaving(true);

        try {
            const response = await saveEvolutionDraft(projectId, preparedItems);

            if (!response.success) {
                setError(response.error);

                return;
            }

            setItems(cloneItems(response.data));

            onDraftSaved(response.data);
        } catch (saveError) {
            setError(getErrorMessage(saveError));
        } finally {
            setIsSaving(false);
        }
    }

    async function handlePublish(): Promise<void> {
        const validationError = validateItems();

        if (validationError) {
            setError(validationError);

            return;
        }

        const preparedItems = prepareItems(items);

        setError(null);
        setIsPublishing(true);

        try {
            const response = await publishEvolution(projectId, preparedItems);

            if (!response.success) {
                setError(response.error);

                return;
            }

            onPublished(response.data.publishedCount);
        } catch (publishError) {
            setError(getErrorMessage(publishError));
        } finally {
            setIsPublishing(false);
        }
    }


    return (
        <ModalWrapper
            drag={false}
            tooltipVisible={false}
            additionalClass={styles.modalWrapper}

            modalName={'evolutionReviewModal'}

            title='Review'
            subTitle='Review and edit the generated timeline before publishing'

            tooltipMax={9}
            tooltipText='Maximum 9 technologies allowed'
        >
            <div className={styles.body}>
                <div className={styles.editorColumn}>
                    <div className={styles.toolbar}>
                        <div>
                            <h3>Draft milestones</h3>

                            <span>{items.length} items</span>
                        </div>

                        <Button 
                            iconPosition='noIcon'
                            behavior='default'
                            variant='black'
                            additionalClass={styles.addButton}
                            text='Add milestone'
                            onClick={addItem}
                        />
                    </div>

                    {items.length === 0 ? (
                        <div className={styles.emptyDraft}>
                            <p>The draft is empty.</p>
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {items.map((item, index) => {
                                const isSelected =
                                    item.id === selectedItemId;

                                return (
                                    <article
                                        key={item.id}
                                        className={
                                            isSelected
                                                ? `${styles.card} ${styles.selectedCard}`
                                                : styles.card
                                        }
                                        onClick={() => {
                                            setSelectedItemId(item.id);
                                        }}
                                    >
                                        <div className={styles.cardHeader}>
                                            <div
                                                className={
                                                    styles.cardPosition
                                                }
                                            >
                                                <span>{index + 1}</span>

                                                <strong>
                                                    {item.name.trim() ||
                                                        "Untitled milestone"}
                                                </strong>
                                            </div>

                                            <div
                                                className={
                                                    styles.cardActions
                                                }
                                            >
                                                <Button 
                                                    iconPosition='noIcon'
                                                    behavior={isBusy ||
                                                        index === 0 ? 'disabled' : 'default'}
                                                    variant='black'
                                                    additionalClass={styles.itemActionBtn}
                                                    text='Up'
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        moveItem(
                                                            item.id,
                                                            -1,
                                                        );
                                                    }}
                                                />

                                                <Button 
                                                    iconPosition='noIcon'
                                                    behavior={isBusy ||
                                                        index ===
                                                            items.length - 1 ? 'disabled' : 'default'}
                                                    variant='black'
                                                    additionalClass={styles.itemActionBtn}
                                                    text='Down'
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        moveItem(
                                                            item.id,
                                                            1,
                                                        );
                                                    }}
                                                />

                                                <Button 
                                                    iconPosition='noIcon'
                                                    behavior={isBusy ? 'disabled' : 'default'}
                                                    variant='black'
                                                    additionalClass={`${styles.itemActionBtn} ${styles.deleteButton}`}
                                                    text='Delete'
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        deleteItem(item.id);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.localizedFields}>
                                            <div className={styles.languageColumn}>
                                                <span className={styles.languageLabel}>
                                                    English
                                                </span>

                                                <Input
                                                    name={`name-${item.id}`}
                                                    placeholder='Milestone name...'
                                                    value={item.name}
                                                    variant='admin'
                                                    iconPosition='noIcon'
                                                    adminLabel='withLabel'
                                                    additionalClass={styles.input}
                                                    label='Name'
                                                    readonly={isBusy}
                                                    maxLen={70}
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            name: event.target.value,
                                                        })
                                                    }}
                                                />

                                                <Input
                                                    name={`date-${item.id}`}
                                                    placeholder='Date...'
                                                    value={item.date}
                                                    variant='admin'
                                                    iconPosition='noIcon'
                                                    adminLabel='withLabel'
                                                    additionalClass={styles.input}
                                                    label='Date'
                                                    readonly={isBusy}
                                                    maxLen={40}
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            date: event.target.value,
                                                        })
                                                    }}
                                                />

                                                <Input
                                                    name={`text-${item.id}`}
                                                    placeholder='Description...'
                                                    value={item.text}
                                                    type='textarea'
                                                    counter={true}
                                                    maxCounter={300}
                                                    variant='admin'
                                                    iconPosition='noIcon'
                                                    adminLabel='withLabel'
                                                    additionalClass={styles.input}
                                                    readonly={isBusy}
                                                    maxLen={300}
                                                    label='Description'
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            text: event.target.value,
                                                        })
                                                    }}
                                                />
                                            </div>

                                            <div className={styles.languageColumn}>
                                                <span className={styles.languageLabel}>
                                                    Russian
                                                </span>

                                                <Input
                                                    name={`name-ru-${item.id}`}
                                                    placeholder='Milestone name...'
                                                    value={item.nameRu}
                                                    variant='admin'
                                                    iconPosition='noIcon'
                                                    adminLabel='withLabel'
                                                    additionalClass={styles.input}
                                                    label='Name'
                                                    readonly={isBusy}
                                                    maxLen={70}
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            nameRu: event.target.value,
                                                        })
                                                    }}
                                                />

                                                <Input
                                                    name={`date-ru-${item.id}`}
                                                    placeholder='Date...'
                                                    value={item.dateRu}
                                                    variant='admin'
                                                    iconPosition='noIcon'
                                                    adminLabel='withLabel'
                                                    additionalClass={styles.input}
                                                    label='Date'
                                                    readonly={isBusy}
                                                    maxLen={40}
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            dateRu: event.target.value,
                                                        })
                                                    }}
                                                />

                                                <Input
                                                    name={`text-ru-${item.id}`}
                                                    placeholder='Description...'
                                                    value={item.textRu}
                                                    type='textarea'
                                                    counter={true}
                                                    maxCounter={300}
                                                    variant='admin'
                                                    iconPosition='noIcon'
                                                    adminLabel='withLabel'
                                                    additionalClass={styles.input}
                                                    readonly={isBusy}
                                                    maxLen={300}
                                                    label='Description'
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            textRu: event.target.value,
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                            
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>

                <aside className={styles.sourceColumn}>
                    
                    
                    <div className={styles.columnWrapper}>
                        <h3>Source commits</h3>
                    
                        {!selectedItem ? (
                            <p className={styles.sourceEmpty}>
                                Select a milestone to view its source commits.
                            </p>
                        ) : selectedItem.sourceShas.length === 0 ? (
                            <div className={styles.sourceEmpty}>
                                <strong>Manual milestone</strong>

                                <p>
                                    This item was added manually and has no
                                    linked commits.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className={styles.sourceDescription}>
                                    {selectedItem.sourceShas.length} commits
                                    were used to create this milestone.
                                </p>

                                <div className={styles.sourceList}>
                                    {selectedItem.sourceShas.map((sha) => (
                                        <a
                                            key={sha}
                                            href={
                                                normalizedGithubLink
                                                    ? `${normalizedGithubLink}/commit/${sha}`
                                                    : undefined
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className={styles.sourceItem}
                                        >
                                            <code>{sha.slice(0, 7)}</code>

                                            <span>Open</span>
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </aside>
            </div>

            <footer className={styles.footer}>
                <div className={styles.footerMessage}>
                    {error && (
                        <p className={styles.error} role="alert">
                            {error}
                        </p>
                    )}

                    {!error && (
                        <p>Saving and publishing do not call GigaChat.</p>
                    )}
                </div>

                <div className={styles.footerActions}>
                    <Button 
                        iconPosition='noIcon'
                        behavior={isBusy ? 'disabled' : 'default'}
                        variant='black'
                        additionalClass={styles.saveButton}
                        text={isSaving ? "Saving..." : "Save draft"}
                        onClick={() => {
                            void handleSave();
                        }}
                    />

                    <Button 
                        iconPosition='noIcon'
                        behavior={isBusy || items.length === 0 ? 'disabled' : 'default'}
                        variant='secondary'
                        additionalClass={styles.publishButton}
                        text={isPublishing
                            ? "Publishing..."
                            : "Publish Evolution"}
                        onClick={() => {
                            void handlePublish();
                        }}
                    />
                </div>
            </footer>
        </ModalWrapper>


            
    );
};

export default EvolutionReviewModal;
