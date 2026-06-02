'use client'

import React from "react";

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import BasicInformation from "@/components/admin/editAboutMe/basicInformation";
import WorkExperience from "@/components/admin/editAboutMe/workExperience";

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
            
        </main>
    )    
    
}

export default ClientPageWrapper;