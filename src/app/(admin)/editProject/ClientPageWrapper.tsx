'use client'

import React from "react";

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import GeneralData from "@/components/admin/editProject/generalData";

import styles from './index.module.scss';



const ClientPageWrapper: React.FC = () => {
    return (
        <main className={`${styles.main}`}>
            <div className="container">
                <AdminPageTitle 
                    title='Edit Project'
                    text='Edit and update all project content'
                    icon='settings'
                />

                <GeneralData />
            </div>
        </main>
    )    
    
}

export default ClientPageWrapper;