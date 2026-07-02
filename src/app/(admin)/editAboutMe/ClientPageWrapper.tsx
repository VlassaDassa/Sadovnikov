'use client'

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import BasicInformation from "@/components/admin/editAboutMe/basicInformation";
import ShortBio from "@/components/admin/editAboutMe/shortBio";
import AnimatedSection from '@/components/shared/AnimatedScroll';
import SavingIndicator from "@/components/shared/SavingIndicator";

const SelectPeriod = dynamic(() => import('@/components/admin/modals/selectPeriod'), { ssr: false });
const WorkExperience = dynamic(() => import('@/components/admin/editAboutMe/workExperience'), { ssr: false });

import type { WorkExperience, AboutMe } from '@/interfaces/general';
import { updateAboutMe } from "@/app/actions/aboutMe";
import { useDebounce } from "@/hooks/useDebounce";

import styles from './index.module.scss';



interface ClientPageWrapperProps {
    aboutMe: AboutMe
}

const ClientPageWrapper: React.FC<ClientPageWrapperProps> = ({ aboutMe }) => {
    const [data, setData] = useState<AboutMe>(aboutMe)
    const [isSaving, setIsSaving] = useState(false)

    const isSelectPeriodModalOpen = useSelector((state: RootState) => state.uiState.isSelectPeriodModalOpen)

    const debouncedData = useDebounce(data, 1000)
    
    const saveAboutMe = async () => {
        const hasChanged = JSON.stringify(data) !== JSON.stringify(aboutMe)
        if (!hasChanged) return;

        setIsSaving(true)

        try {
            const response = await updateAboutMe(data)
            if (response.success) {
                console.log('✅ AboutMe updated successfully')
            }
            else {
                console.error('❌ Error saving aboutMe', response.error)
            }
        } catch (error) {
            console.error('❌ Error saving aboutMe', error)
        }
        finally {
            setIsSaving(false)
        }
    }

    useEffect(() => {
        saveAboutMe()
    }, [debouncedData])

    
    const modals = (
        <>
            {isSelectPeriodModalOpen && <SelectPeriod data={data} setData={setData} />}
        </>
    )

    return (
        <main className={`${styles.main}`}>
            {modals}
            <SavingIndicator isSaving={isSaving} />
            <div className="container">
                <AnimatedSection animation='fade-up'>
                    <AdminPageTitle 
                        title={'Edit section “About Me”'}
                        text={'Update your information and experience'}
                        icon={'person'}
                    />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <BasicInformation data={data} setData={setData} setIsSaving={setIsSaving} />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <WorkExperience data={data} setData={setData} setIsSaving={setIsSaving} />
                </AnimatedSection>

                <AnimatedSection animation='fade-down'>
                    <ShortBio setData={setData} data={data} setIsSaving={setIsSaving} />
                </AnimatedSection>
            </div>  
        </main>
    )    
    
}

export default ClientPageWrapper;