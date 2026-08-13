"use client";

import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "@/components/shared/button/Button";
import Input from "@/components/shared/input";
import SavingIndicator from "@/components/shared/SavingIndicator";

import DragHandler from "../dragHandler";
import ModalWrapper from "../modalWrapper";

import { updateStack } from "@/app/actions/stack";
import { useDebounce } from "@/hooks/useDebounce";
import { Stack } from "@/interfaces/general";
import { registerBeforeClose, unregisterBeforeClose } from "@/lib/modals";

import styles from "./index.module.scss";

const MODAL_NAME = "editMyStack";

interface StackItemProps {
    stackItem: Stack;
    setStack: Dispatch<SetStateAction<Stack[]>>;
    setIsSaving: Dispatch<SetStateAction<boolean>>;
}

const StackItem: React.FC<StackItemProps> = ({
    stackItem,
    setStack,
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
        id: stackItem.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const deleteItem = (id: number) => {
        setIsSaving(true);

        setStack((previous) => previous.filter((item) => item.id !== id));
    };

    const handleChangeName = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newName = event.target.value;

        if (newName.length > 20) {
            return;
        }

        setStack((previous) =>
            previous.map((item) =>
                item.id === stackItem.id
                    ? {
                          ...item,
                          name: newName,
                      }
                    : item,
            ),
        );

        setIsSaving(true);
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`${styles.stackItem} modalElementBg`}
        >
            <DragHandler variant="big" />

            <Input
                name={stackItem.name}
                placeholder="Text..."
                value={stackItem.name}
                variant="admin"
                iconPosition="noIcon"
                adminLabel="withoutLabel"
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
    );
};

interface EditMyStackModalProps {
    initialStack: Stack[];
}

const EditMyStackModal: React.FC<EditMyStackModalProps> = ({
    initialStack,
}) => {
    const [stack, setStack] = useState<Stack[]>(initialStack);

    const [isSaving, setIsSaving] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const debouncedStack = useDebounce(stack, 1000);

    const saveStack = useCallback(
        async (stackToSave: Stack[]) => {
            const hasChanged =
                JSON.stringify(stackToSave) !== JSON.stringify(initialStack);

            if (!hasChanged) {
                return;
            }

            try {
                await updateStack(stackToSave);
            } catch (error) {
                console.error("Failed to save stack:", error);
            } finally {
                setIsSaving(false);
            }
        },
        [initialStack],
    );

    const setStackFromDrag = useCallback<Dispatch<SetStateAction<Stack[]>>>(
        (nextStack) => {
            setIsSaving(true);
            setStack(nextStack);
        },
        [],
    );

    useEffect(() => {
        void saveStack(debouncedStack);
    }, [debouncedStack, saveStack]);

    useEffect(() => {
        const saveBeforeClose = () => {
            return saveStack(stack);
        };

        registerBeforeClose(MODAL_NAME, saveBeforeClose);

        return () => {
            unregisterBeforeClose(MODAL_NAME);
        };
    }, [stack, saveStack]);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [stack.length]);

    const addItem = () => {
        const maxId = Math.max(...stack.map((stackItem) => stackItem.id), 0);

        const newStack: Stack = {
            id: maxId + 1,
            name: "",
        };

        setIsSaving(true);

        setStack((previous) => [...previous, newStack]);
    };

    const disableBtn = () => {
        if (stack.length >= 9) {
            return "disabled";
        }

        return "default";
    };

    return (
        <ModalWrapper
            drag={true}
            tooltipVisible={true}
            disableBtn={disableBtn}
            addItem={addItem}
            items={stack}
            setItems={setStackFromDrag}
            ref={containerRef}
            modalName={MODAL_NAME}
            title="Edit Stack"
            subTitle="Manage your homepage stack section"
            tooltipMax={9}
            tooltipText="Maximum 9 technologies allowed"
        >
            <SavingIndicator isSaving={isSaving} />

            {stack.map((stackItem) => (
                <StackItem
                    key={stackItem.id}
                    stackItem={stackItem}
                    setStack={setStack}
                    setIsSaving={setIsSaving}
                />
            ))}
        </ModalWrapper>
    );
};

export default EditMyStackModal;
