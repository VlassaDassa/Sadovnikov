import React, {
    Dispatch,
    ForwardedRef,
    SetStateAction,
    forwardRef,
} from "react";
import { useDispatch } from "react-redux";
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ModalBackground from "@/components/admin/modals/modalBackground";
import Button from "@/components/shared/button/Button";

import ModalHeader from "../modalHeader";
import ModalTooltip from "../modalTooltip";

import { closeModals } from "@/lib/modals";
import { closeOverlay } from "@/store/slices/uiSlice";

import styles from "./index.module.scss";

interface SortableItem {
    id: UniqueIdentifier;
}

interface ModalWrapperProps<T extends SortableItem> {
    drag: boolean;
    tooltipVisible: boolean;
    tooltipMax?: number;

    modalName: string;

    tooltipText?: string;
    title: string;
    subTitle: string;
    additionalClass?: string;

    button?: boolean;

    disableBtn?: () => "default" | "loading" | "disabled";

    addItem?: () => void;

    items?: T[];

    setItems?: Dispatch<SetStateAction<T[]>>;

    children: React.ReactNode;
}

const ModalWrapperInner = <T extends SortableItem>(
    {
        drag,
        tooltipVisible,
        tooltipMax,
        modalName,
        additionalClass,
        title,
        subTitle,
        tooltipText = "Manage items",
        button = false,
        children,
        disableBtn = () => "default",
        addItem = () => {},
        items = [],
        setItems,
    }: ModalWrapperProps<T>,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const dispatch = useDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || !setItems || active.id === over.id) {
            return;
        }

        setItems((currentItems) => {
            const oldIndex = currentItems.findIndex(
                (item) => item.id === active.id,
            );
            const newIndex = currentItems.findIndex(
                (item) => item.id === over.id,
            );

            if (oldIndex === -1 || newIndex === -1) {
                return currentItems;
            }

            return arrayMove(currentItems, oldIndex, newIndex);
        });
    };

    let content = (
        <div className={styles.content}>
            {tooltipVisible && (
                <ModalTooltip
                    text={tooltipText}
                    counter={items.length}
                    max={tooltipMax}
                />
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {children}
                </SortableContext>
            </DndContext>

            <Button
                variant="black"
                behavior={disableBtn()}
                iconPosition="noIcon"
                text="Add Item"
                additionalClass={styles.addBtn}
                onClick={addItem}
            />
        </div>
    );

    if (!drag) {
        content = (
            <div className={styles.content}>
                {tooltipVisible && (
                    <ModalTooltip
                        text={tooltipText}
                        counter={items.length}
                        max={tooltipMax}
                    />
                )}

                {children}

                {button && (
                    <Button
                        variant="black"
                        behavior={disableBtn()}
                        iconPosition="noIcon"
                        text="Add Item"
                        additionalClass={styles.addBtn}
                        onClick={addItem}
                    />
                )}
            </div>
        );
    }

    return (
        <ModalBackground
            className={`${styles.modalBackground} ${
                !drag ? styles.modalBackgroundNoDrag : ""
            } ${additionalClass ?? ""}`}
            ref={ref}
        >
            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="close"
                onClick={async () => {
                    await closeModals(dispatch, modalName);

                    dispatch(closeOverlay());
                }}
                additionalClass={styles.closeButton}
            />

            <ModalHeader title={title} subTitle={subTitle} icon="arrow" />

            {content}
        </ModalBackground>
    );
};

const ModalWrapper = forwardRef(ModalWrapperInner) as <T extends SortableItem>(
    props: ModalWrapperProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

export default ModalWrapper;
