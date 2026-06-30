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

import type { WorkExperience, AboutMe } from '@/interfaces/general';

import styles from './index.module.scss';



interface ClientPageWrapperProps {
    aboutMe: AboutMe
}

const ClientPageWrapper: React.FC<ClientPageWrapperProps> = ({ aboutMe }) => {
    const [data, setData] = useState<WorkExperience[]>(aboutMe['workExperience'])

    const isSelectPeriodModalOpen = useSelector((state: RootState) => state.uiState.isSelectPeriodModalOpen)

    const modals = (
        <>
            {isSelectPeriodModalOpen && <SelectPeriod data={data} setData={setData} />}
        </>
    )

    return (
        <main className={`${styles.main}`}>
            {modals}
            <div className="container">
                <AnimatedSection animation='fade-up'>
                    <AdminPageTitle 
                        title={'Edit section “About Me”'}
                        text={'Update your information and experience'}
                        icon={'person'}
                    />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <BasicInformation aboutMe={aboutMe} />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <WorkExperience data={data} setData={setData} />
                </AnimatedSection>

                <AnimatedSection animation='fade-down'>
                    <ShortBio aboutMe={aboutMe} />
                </AnimatedSection>
            </div>  
        </main>
    )    
    
}

export default ClientPageWrapper;