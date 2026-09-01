"use client";

import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useSelector } from "react-redux";

import Button from "@/components/shared/button/Button";
import Input from "@/components/shared/input";
import SavingIndicator from "@/components/shared/SavingIndicator";
import SkillLevel from "@/components/shared/SkillLevel";

import DragHandler from "../dragHandler";
import ModalWrapper from "../modalWrapper";

import { updateSkills } from "@/app/actions/skills";
import { useDebounce } from "@/hooks/useDebounce";
import { Skill } from "@/interfaces/general";
import { registerBeforeClose, unregisterBeforeClose } from "@/lib/modals";
import { RootState } from "@/store";

import styles from "./index.module.scss";

const MODAL_NAME = "editSkills";

interface SkillItemProps {
    skill: Skill;
    setSkills: Dispatch<SetStateAction<Skill[]>>;
    setIsSaving: Dispatch<SetStateAction<boolean>>;
}

const SkillItem: React.FC<SkillItemProps> = ({
    skill,
    setSkills,
    setIsSaving,
}) => {
    const windowWidth = useSelector(
        (state: RootState) => state.breakpoint.windowWidth,
    );

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: skill.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const deleteItem = (id: number) => {
        setSkills((previous) => previous.filter((item) => item.id !== id));

        setIsSaving(true);
    };

    const incrementScore = (id: number) => {
        setSkills((previous) =>
            previous.map((item) =>
                item.id === id && item.score < 10
                    ? {
                          ...item,
                          score: item.score + 1,
                      }
                    : item,
            ),
        );

        setIsSaving(true);
    };

    const decrementScore = (id: number) => {
        setSkills((previous) =>
            previous.map((item) =>
                item.id === id && item.score > 0
                    ? {
                          ...item,
                          score: item.score - 1,
                      }
                    : item,
            ),
        );

        setIsSaving(true);
    };

    const handleChangeName = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newName = event.target.value;

        if (newName.length > 20) {
            return;
        }

        setSkills((previous) =>
            previous.map((item) =>
                item.id === skill.id
                    ? {
                          ...item,
                          name: newName,
                      }
                    : item,
            ),
        );

        setIsSaving(true);
    };

    const secondLine = (
        <div className={styles.secondLineWrapper}>
            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="mathMinus"
                additionalClass={styles.deleteBtn}
                onClick={() => decrementScore(skill.id)}
            />

            <SkillLevel
                score={skill.score}
                classNameWrapper={styles.skillLevel}
                classNameItem={styles.skillLevelItem}
            />

            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="mathPlus"
                additionalClass={styles.deleteBtn}
                onClick={() => incrementScore(skill.id)}
            />
        </div>
    );

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.skill} modalElementBg`}
        >
            <div className={styles.firstLineWrapper}>
                <div className={styles.inputWrapper}>
                    <DragHandler variant="big" {...attributes} {...listeners} />

                    <Input
                        name={skill.name}
                        placeholder="Text..."
                        value={skill.name}
                        variant="admin"
                        iconPosition="noIcon"
                        adminLabel="withoutLabel"
                        onChange={handleChangeName}
                    />
                </div>

                {windowWidth >= 800 && secondLine}

                <Button
                    variant="black"
                    behavior="default"
                    iconPosition="only"
                    icon="trash"
                    onClick={() => deleteItem(skill.id)}
                    additionalClass={styles.deleteBtn}
                />
            </div>

            {windowWidth <= 800 && secondLine}
        </div>
    );
};

interface EditSkillModalProps {
    initialSkills: Skill[];
}

const EditSkillModal: React.FC<EditSkillModalProps> = ({ initialSkills }) => {
    const [skills, setSkills] = useState<Skill[]>(initialSkills);

    const [isSaving, setIsSaving] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const debouncedSkills = useDebounce(skills, 1000);

    const saveSkills = useCallback(
        async (skillsToSave: Skill[]) => {
            const hasChanged =
                JSON.stringify(skillsToSave) !== JSON.stringify(initialSkills);

            if (!hasChanged) {
                return;
            }

            try {
                await updateSkills(skillsToSave);
            } catch (error) {
                console.error("Failed to save skills:", error);
            } finally {
                setIsSaving(false);
            }
        },
        [initialSkills],
    );

    const setSkillsFromDrag = useCallback<Dispatch<SetStateAction<Skill[]>>>(
        (nextSkills) => {
            setIsSaving(true);
            setSkills(nextSkills);
        },
        [],
    );

    useEffect(() => {
        void saveSkills(debouncedSkills);
    }, [debouncedSkills, saveSkills]);

    useEffect(() => {
        const saveBeforeClose = () => {
            return saveSkills(skills);
        };

        registerBeforeClose(MODAL_NAME, saveBeforeClose);

        return () => {
            unregisterBeforeClose(MODAL_NAME);
        };
    }, [skills, saveSkills]);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [skills.length]);

    const addItem = () => {
        const maxId = Math.max(...skills.map((skill) => skill.id), 0);

        const newSkill: Skill = {
            id: maxId + 1,
            name: "",
            score: 0,
        };

        setIsSaving(true);

        setSkills((previous) => [...previous, newSkill]);
    };

    const disableBtn = () => {
        if (skills.length >= 4) {
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
            items={skills}
            setItems={setSkillsFromDrag}
            ref={containerRef}
            modalName={MODAL_NAME}
            title="Edit Skills"
            subTitle="Manage your homepage skill section"
            tooltipMax={4}
            tooltipText="Maximum 4 skills allowed"
        >
            <SavingIndicator isSaving={isSaving} />

            {skills.map((skill) => (
                <SkillItem
                    key={skill.id}
                    skill={skill}
                    setSkills={setSkills}
                    setIsSaving={setIsSaving}
                />
            ))}
        </ModalWrapper>
    );
};

export default EditSkillModal;
