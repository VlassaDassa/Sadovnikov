'use client'

import React from "react";
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import BasicInformation from "@/components/admin/editAboutMe/basicInformation";
import ShortBio from "@/components/admin/editAboutMe/shortBio";
import AnimatedSection from '@/components/shared/AnimatedScroll';

const SelectPeriod = dynamic(() => import('@/components/admin/modals/selectPeriod'), { ssr: false });
const WorkExperience = dynamic(() => import('@/components/admin/editAboutMe/workExperience'), { ssr: false });

import styles from './index.module.scss';



const ClientPageWrapper: React.FC = () => {
    const isSelectPeriodModalOpen = useSelector((state: RootState) => state.uiState.isSelectPeriodModalOpen)

    const modals = (
        <>
            {isSelectPeriodModalOpen && <SelectPeriod />}
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
                <WorkExperience />
            </AnimatedSection>

            <AnimatedSection animation='fade-down'>
                <ShortBio />
            </AnimatedSection>
            

            
            
            
            
        </main>
    )    
    
}

export default ClientPageWrapper;