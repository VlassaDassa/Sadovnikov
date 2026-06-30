'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useDispatch } from 'react-redux';

import Button from '@/components/shared/button/Button';
import AdminPageTitle from "@/components/admin/general/adminPageTitle";
import GeneralData from "@/components/admin/editProject/generalData";
import Stack from '@/components/admin/editProject/stack';
import KeyFeatures from '@/components/admin/editProject/keyFeatures';
import Description from '@/components/admin/editProject/description';
import Metrics from '@/components/admin/editProject/metrics';
import EditProjectStackModal from "@/components/admin/modals/editProjectStackModal";
import AnimatedSection from '@/components/shared/AnimatedScroll';


import { IProject } from "@/interfaces/general";

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';
import { showMessage } from '@/lib/showMessage';


interface ClientPageWrapperProps {
    project: IProject
}


const ClientPageWrapper: React.FC<ClientPageWrapperProps> = ({ project }) => {
    const [data, setData] = useState<IProject>(project)
    const isEditProjectStackModalOpen = useSelector((state: RootState) => state.uiState.isEditProjectStackModalOpen)
    const router = useRouter()
    const dispatch = useDispatch()

        
    const deleteProject = () => {
        router.push(`/admin`);

        // Удаление проекта
        // setData(prev => prev.filter(project => project.id !== projectId));
        showMessage('info', 'Project has been deleted', dispatch)
    };

    const modals = (
        <>
            {isEditProjectStackModalOpen && <EditProjectStackModal project={data} setData={setData} />}
        </>
    )

    return (
        <main className={`${styles.main}`}>
            { modals }

            <div className="container">
                <AnimatedSection animation='fade-up'>
                    <AdminPageTitle 
                        title='Edit Project'
                        text='Edit and update all project content'
                        icon='settings'
                    />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <GeneralData project={data} setData={setData} />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <Stack project={data} setData={setData} />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <KeyFeatures project={data} setData={setData} />
                </AnimatedSection>

                <AnimatedSection animation='fade-down'>
                    <Description project={data} setData={setData} />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <Metrics project={data} setData={setData} />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <Button 
                        iconPosition='leftIcon'
                        behavior='default'
                        variant='black'
                        additionalClass={styles.deleteBtn}
                        text='Delete Project'
                        icon='trash'
                        colorIcon={cssVars.error_600}
                        onClick={deleteProject}
                        noize={true}
                    />
                </AnimatedSection>
            </div>
        </main>
    )    
    
}

export default ClientPageWrapper;