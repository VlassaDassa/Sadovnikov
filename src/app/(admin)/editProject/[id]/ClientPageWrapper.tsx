'use client'

import { notFound } from 'next/navigation';
import React, { useState } from 'react';

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import GeneralData from "@/components/admin/editProject/generalData";
import Stack from '@/components/admin/editProject/stack';
import KeyFeatures from '@/components/admin/editProject/keyFeatures';

import { IProject } from "@/interfaces/general";
import { projects } from '@/mockData/projects';

import styles from './index.module.scss';


interface ClientPageWrapperProps {
    projectId: number,
}


const ClientPageWrapper: React.FC<ClientPageWrapperProps> = ({ projectId }) => {
    const [data, setData] = useState<IProject[]>(projects)

    const project = projects.find(p => p.id === projectId);
        
    if (!project) {
        notFound();
    }

    return (
        <main className={`${styles.main}`}>
            <div className="container">
                <AdminPageTitle 
                    title='Edit Project'
                    text='Edit and update all project content'
                    icon='settings'
                />


                <GeneralData projects={data} projectId={projectId} setData={setData} />
                <Stack projects={data} projectId={projectId} setData={setData} />
                <KeyFeatures projects={data} projectId={projectId} setData={setData} />
            </div>
        </main>
    )    
    
}

export default ClientPageWrapper;