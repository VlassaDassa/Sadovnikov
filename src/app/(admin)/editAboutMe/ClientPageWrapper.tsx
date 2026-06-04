'use client'

import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import BasicInformation from "@/components/admin/editAboutMe/basicInformation";
import ShortBio from "@/components/admin/editAboutMe/shortBio";
import AnimatedSection from '@/components/shared/AnimatedScroll';

const SelectPeriod = dynamic(() => import('@/components/admin/modals/selectPeriod'), { ssr: false });
const WorkExperience = dynamic(() => import('@/components/admin/editAboutMe/workExperience'), { ssr: false });

import { aboutMe as initialData } from '@/mockData/aboutMe';
import type { WorkExperience } from '@/interfaces/general';

import styles from './index.module.scss';



const ClientPageWrapper: React.FC = () => {
    const [data, setData] = useState<WorkExperience[]>(initialData['workExperience'])

    const isSelectPeriodModalOpen = useSelector((state: RootState) => state.uiState.isSelectPeriodModalOpen)

    const modals = (
        <>
            {isSelectPeriodModalOpen && <SelectPeriod data={data} setData={setData} />}
        </>
    )

    return (
        <main className={`${styles.main} container`}>
            {modals}

            <AnimatedSection animation='fade-up'>
                <AdminPageTitle 
                    title={'Edit section “About Me”'}
                    text={'Update your information and experience'}
                    icon={'person'}
                />
            </AnimatedSection>

            <AnimatedSection animation='fade-left'>
                <BasicInformation />
            </AnimatedSection>

            <AnimatedSection animation='fade-right'>
                <WorkExperience data={data} setData={setData} />
            </AnimatedSection>

            <AnimatedSection animation='fade-down'>
                <ShortBio />
            </AnimatedSection>
        </main>
    )    
    
}

export default ClientPageWrapper;