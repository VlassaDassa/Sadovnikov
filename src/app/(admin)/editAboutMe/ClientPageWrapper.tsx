'use client'

import React from "react";
import dynamic from 'next/dynamic';

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import BasicInformation from "@/components/admin/editAboutMe/basicInformation";
import ShortBio from "@/components/admin/editAboutMe/shortBio";
const WorkExperience = dynamic(() => import('@/components/admin/editAboutMe/workExperience'), { ssr: false });

import styles from './index.module.scss';



const ClientPageWrapper: React.FC = () => {
    return (
        <main className={`${styles.main} container`}>
            <AdminPageTitle 
                title={'Edit section “About Me”'}
                text={'Update your information and experience'}
                icon={'person'}
            />

            <BasicInformation />
            <WorkExperience />
            <ShortBio />
            
        </main>
    )    
    
}

export default ClientPageWrapper;