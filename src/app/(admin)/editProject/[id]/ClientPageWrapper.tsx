'use client'

import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useDispatch } from 'react-redux';

import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import GeneralData from "@/components/admin/editProject/generalData";
import Stack from '@/components/admin/editProject/stack';
import KeyFeatures from '@/components/admin/editProject/keyFeatures';
import Description from '@/components/admin/editProject/description';
import Metrics from '@/components/admin/editProject/metrics';
import EditProjectStackModal from "@/components/admin/modals/editProjectStackModal";
import Button from '@/components/shared/button/Button';

import { IProject } from "@/interfaces/general";
import { projects } from '@/mockData/projects';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';
import { showMessage } from '@/lib/showMessage';


interface ClientPageWrapperProps {
    projectId: number,
}


const ClientPageWrapper: React.FC<ClientPageWrapperProps> = ({ projectId }) => {
    const [data, setData] = useState<IProject[]>(projects)
    const isEditProjectStackModalOpen = useSelector((state: RootState) => state.uiState.isEditProjectStackModalOpen)
    const router = useRouter()
    const dispatch = useDispatch()

    const project = projects.find(p => p.id === projectId);
        
    if (!project) {
        notFound();
    }

    const deleteProject = () => {
        router.push(`/admin`);

        // Удаление проекта
        // setData(prev => prev.filter(project => project.id !== projectId));
        showMessage('info', 'Project has been deleted', dispatch)
    };

    const modals = (
        <>
            {isEditProjectStackModalOpen && <EditProjectStackModal projects={data} projectId={projectId} setData={setData} />}
        </>
    )

    return (
        <main className={`${styles.main}`}>
            { modals }

            <div className="container">
                <AdminPageTitle 
                    title='Edit Project'
                    text='Edit and update all project content'
                    icon='settings'
                />


                <GeneralData projects={data} projectId={projectId} setData={setData} />
                <Stack projects={data} projectId={projectId} setData={setData} />
                <KeyFeatures projects={data} projectId={projectId} setData={setData} />
                <Description projects={data} projectId={projectId} setData={setData} />
                <Metrics projects={data} projectId={projectId} setData={setData} />

                <Button 
                    iconPosition='leftIcon'
                    behavior='default'
                    variant='black'
                    additionalClass={styles.deleteBtn}
                    text='Delete Project'
                    icon='trash'
                    colorIcon={cssVars.error_600}
                    onClick={deleteProject}
                />
            </div>
        </main>
    )    
    
}

export default ClientPageWrapper;