"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import BasicInformation from "@/components/admin/editAboutMe/basicInformation";
import ShortBio from "@/components/admin/editAboutMe/shortBio";
import AnimatedSection from "@/components/shared/AnimatedScroll";
import SavingIndicator from "@/components/shared/SavingIndicator";

import { updateAboutMe } from "@/app/actions/aboutMe";
import { useDebounce } from "@/hooks/useDebounce";
import type { AboutMe } from "@/interfaces/general";
import { showMessage } from "@/lib/showMessage";
import { RootState } from "@/store";

import styles from "./index.module.scss";

const SelectPeriod = dynamic(
    () => import("@/components/admin/modals/selectPeriod"),
    {
        ssr: false,
    },
);

const WorkExperience = dynamic(
    () => import("@/components/admin/editAboutMe/workExperience"),
    {
        ssr: false,
    },
);

interface ClientPageWrapperProps {
    aboutMe: AboutMe;
}

const ClientPageWrapper: React.FC<ClientPageWrapperProps> = ({ aboutMe }) => {
    const [data, setData] = useState<AboutMe>(aboutMe);

    const [isSaving, setIsSaving] = useState(false);

    const dispatch = useDispatch();

    const lastSavedDataRef = useRef(JSON.stringify(aboutMe));

    const isSelectPeriodModalOpen = useSelector(
        (state: RootState) => state.uiState.isSelectPeriodModalOpen,
    );

    const debouncedData = useDebounce(data, 1000);

    const saveAboutMe = useCallback(
        async (dataToSave: AboutMe) => {
            const serializedData = JSON.stringify(dataToSave);

            if (serializedData === lastSavedDataRef.current) {
                return;
            }

            try {
                const response = await updateAboutMe(dataToSave);

                if (!response.success) {
                    showMessage("error", "Error saving aboutMe", dispatch);

                    return;
                }

                lastSavedDataRef.current = serializedData;
            } catch {
                showMessage("error", "Error saving aboutMe", dispatch);
            } finally {
                setIsSaving(false);
            }
        },
        [dispatch],
    );

    useEffect(() => {
        void saveAboutMe(debouncedData);
    }, [debouncedData, saveAboutMe]);

    const modals = (
        <>
            {isSelectPeriodModalOpen && (
                <SelectPeriod data={data} setData={setData} />
            )}
        </>
    );

    return (
        <main className={styles.main}>
            {modals}

            <SavingIndicator isSaving={isSaving} />

            <div className="container">
                <AnimatedSection animation="fade-up">
                    <AdminPageTitle
                        title="Edit section “About Me”"
                        text="Update your information and experience"
                        icon="person"
                    />
                </AnimatedSection>

                <AnimatedSection animation="fade-left">
                    <BasicInformation
                        data={data}
                        setData={setData}
                        setIsSaving={setIsSaving}
                    />
                </AnimatedSection>

                <AnimatedSection animation="fade-right">
                    <WorkExperience
                        data={data}
                        setData={setData}
                        setIsSaving={setIsSaving}
                    />
                </AnimatedSection>

                <AnimatedSection animation="fade-down">
                    <ShortBio
                        data={data}
                        setData={setData}
                        setIsSaving={setIsSaving}
                    />
                </AnimatedSection>
            </div>
        </main>
    );
};

export default ClientPageWrapper;
