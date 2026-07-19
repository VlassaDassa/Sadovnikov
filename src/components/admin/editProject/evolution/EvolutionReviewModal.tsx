"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import Input from '@/components/shared/input';
import ModalWrapper from '@/components/admin/modals/modalWrapper';
import Button from '@/components/shared/button/Button';

import { publishEvolution, saveEvolutionDraft } from "@/app/actions/evolution";
import type { IEvolutionDraftItem } from "@/interfaces/evolution";

import styles from "./EvolutionReviewModal.module.scss";





interface EvolutionReviewModalProps {
    projectId: number;
    githubLink: string;
    initialItems: IEvolutionDraftItem[];
    onDraftSaved: (items: IEvolutionDraftItem[]) => void;
    onPublished: (publishedCount: number) => void;
}

function cloneItems(items: IEvolutionDraftItem[]): IEvolutionDraftItem[] {
    return items.map((item) => {
        return {
            ...item,
            sourceShas: [...item.sourceShas],
        };
    });
}

function prepareItems(items: IEvolutionDraftItem[]): IEvolutionDraftItem[] {
    return items.map((item) => {
        return {
            ...item,
            name: item.name.trim(),
            date: item.date.trim(),
            text: item.text.trim(),
            sourceShas: Array.from(new Set(item.sourceShas)),
        };
    });
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

    const wasOpenRef = useRef(false);

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
        if (open && !wasOpenRef.current) {
            const nextItems = cloneItems(initialItems);

            setItems(nextItems);

            setSelectedItemId(nextItems[0]?.id ?? null);

            setError(null);
        }

        wasOpenRef.current = open;
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
            name: "",
            date: "",
            text: "",
            sourceShas: [],
        };

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
            return "At least one milestone is required";
        }

        if (items.length > 20) {
            return "Evolution cannot contain more than 20 milestones";
        }

        for (let index = 0; index < items.length; index += 1) {
            const item = items[index];

            const position = index + 1;

            if (item.name.trim().length < 3) {
                return `Milestone ${position}: title must contain at least 3 characters`;
            }

            if (item.name.trim().length > 70) {
                return `Milestone ${position}: title cannot exceed 70 characters`;
            }

            if (item.date.trim().length === 0) {
                return `Milestone ${position}: date is required`;
            }

            if (item.date.trim().length > 40) {
                return `Milestone ${position}: date cannot exceed 40 characters`;
            }

            if (item.text.trim().length < 10) {
                return `Milestone ${position}: description must contain at least 10 characters`;
            }

            if (item.text.trim().length > 240) {
                return `Milestone ${position}: description cannot exceed 240 characters`;
            }
        }

        return null;
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

            modalName={'EvolutionReviewModal'}

            title='Review'
            subTitle='Review and manual edit milestones'

            tooltipMax={9}
            tooltipText='Maximum 9 technologies allowed'
        >
                <header className={styles.header}>
                    <div>
                        <h2
                            id="evolution-review-title"
                            className={styles.title}
                        >
                            Review Evolution
                        </h2>

                        <p className={styles.subtitle}>
                            Review and edit the generated timeline before
                            publishing
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.closeButton}
                        disabled={isBusy}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </header>

                <div className={styles.body}>
                    <div className={styles.editorColumn}>
                        <div className={styles.toolbar}>
                            <div>
                                <h3>Draft milestones</h3>

                                <span>{items.length} items</span>
                            </div>

                            <button
                                type="button"
                                className={styles.addButton}
                                disabled={isBusy}
                                onClick={addItem}
                            >
                                Add milestone
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className={styles.emptyDraft}>
                                <p>The draft is empty.</p>

                                <button
                                    type="button"
                                    disabled={isBusy}
                                    onClick={addItem}
                                >
                                    Add first milestone
                                </button>
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
                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isBusy ||
                                                            index === 0
                                                        }
                                                        onClick={(event) => {
                                                            event.stopPropagation();

                                                            moveItem(
                                                                item.id,
                                                                -1,
                                                            );
                                                        }}
                                                    >
                                                        Up
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            isBusy ||
                                                            index ===
                                                                items.length - 1
                                                        }
                                                        onClick={(event) => {
                                                            event.stopPropagation();

                                                            moveItem(
                                                                item.id,
                                                                1,
                                                            );
                                                        }}
                                                    >
                                                        Down
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.deleteButton
                                                        }
                                                        disabled={isBusy}
                                                        onClick={(event) => {
                                                            event.stopPropagation();

                                                            deleteItem(item.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>

                                            <label className={styles.field}>
                                                <span>Name</span>

                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    maxLength={70}
                                                    disabled={isBusy}
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            name: event.target
                                                                .value,
                                                        });
                                                    }}
                                                />

                                                <small>
                                                    {item.name.length}
                                                    /70
                                                </small>
                                            </label>

                                            <label className={styles.field}>
                                                <span>Date</span>

                                                <input
                                                    type="text"
                                                    value={item.date}
                                                    placeholder="March 2026"
                                                    maxLength={40}
                                                    disabled={isBusy}
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            date: event.target
                                                                .value,
                                                        });
                                                    }}
                                                />
                                            </label>

                                            <label className={styles.field}>
                                                <span>Description</span>

                                                <textarea
                                                    value={item.text}
                                                    rows={4}
                                                    maxLength={240}
                                                    disabled={isBusy}
                                                    onChange={(event) => {
                                                        updateItem(item.id, {
                                                            text: event.target
                                                                .value,
                                                        });
                                                    }}
                                                />

                                                <small>
                                                    {item.text.length}
                                                    /240
                                                </small>
                                            </label>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <aside className={styles.sourceColumn}>
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
                        <button
                            type="button"
                            className={styles.cancelButton}
                            disabled={isBusy}
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            className={styles.saveButton}
                            disabled={isBusy}
                            onClick={() => {
                                void handleSave();
                            }}
                        >
                            {isSaving ? "Saving..." : "Save draft"}
                        </button>

                        <button
                            type="button"
                            className={styles.publishButton}
                            disabled={isBusy || items.length === 0}
                            onClick={() => {
                                void handlePublish();
                            }}
                        >
                            {isPublishing
                                ? "Publishing..."
                                : "Publish Evolution"}
                        </button>
                    </div>
                </footer>

        </ModalWrapper>


            
    );
};

export default EvolutionReviewModal;
