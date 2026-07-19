'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
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
import SavingIndicator from '@/components/shared/SavingIndicator';
import Evolution from '@/components/admin/editProject/evolution';

import { IProject } from "@/interfaces/general";
import { useDebounce } from '@/hooks/useDebounce';
import { updateProject, deleteProject } from '@/app/actions/project';
import { showMessage } from '@/lib/showMessage';
import type {
    IEvolutionDraftItem,
} from '@/interfaces/evolution';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';


interface ClientPageWrapperProps {
    project: IProject;

    initialEvolutionDraft:
        IEvolutionDraftItem[];

    initialEvolutionGeneratedAt:
        string | null;
}


const ClientPageWrapper:
    React.FC<
        ClientPageWrapperProps
    > = ({
        project,
        initialEvolutionDraft,
        initialEvolutionGeneratedAt,
    }) => {
    const [data, setData] = useState<IProject>(project)
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const isEditProjectStackModalOpen = useSelector((state: RootState) => state.uiState.isEditProjectStackModalOpen)
    const router = useRouter()
    const dispatch = useDispatch()


    const debouncedData = useDebounce(data, 1000)

    const saveProject = async () => {
        const hasChanged = JSON.stringify(data) !== JSON.stringify(project)
        if (!hasChanged) return

        setIsSaving(true)

        try {
            const response = await updateProject(data)
            if (response.success) {
                console.log('✅ Project updated successfully')
            }
            else {
                showMessage('error', 'Error saving project', dispatch)
                console.error('❌ Error saving project', response.error)
            }

        } catch (error) {
            showMessage('error', 'Error saving project', dispatch)
            console.error('❌ Error saving project: ', error)
        }
        finally {
            setIsSaving(false)
        }
    }

    useEffect(() => {
        saveProject()
    }, [debouncedData])

        
    const deleteProjectHandle = async () => {
        try {
            const response = await deleteProject(data.id)

            if (response.success) {
                showMessage('info', 'Project has been deleted', dispatch)
                router.push(`/admin`);
            }
            else {
                showMessage('error', 'Error deleting project', dispatch)
                console.log('❌ Error deleting project: ',response.error)
            }
        } catch (error) {
            showMessage('error', 'Error deleting project', dispatch)
            console.log('❌ Error deleting project: ', error)
        }
    };

    const modals = (
        <>
            {isEditProjectStackModalOpen && <EditProjectStackModal project={data} setData={setData} setIsSaving={setIsSaving} />}
        </>
    )

    return (
        <main className={`${styles.main}`}>
            { modals }

            <div className="container">
                <SavingIndicator isSaving={isSaving} />

                <AnimatedSection animation='fade-up'>
                    <AdminPageTitle 
                        title='Edit Project'
                        text='Edit and update all project content'
                        icon='settings'
                    />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <GeneralData project={data} setData={setData} setIsSaving={setIsSaving} />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <Stack project={data} setData={setData} setIsSaving={setIsSaving} />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <KeyFeatures project={data} setData={setData} setIsSaving={setIsSaving} />
                </AnimatedSection>

                <AnimatedSection animation='fade-down'>
                    <Description project={data} setData={setData} setIsSaving={setIsSaving} />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <Metrics project={data} setData={setData} setIsSaving={setIsSaving} />
                </AnimatedSection>

                <AnimatedSection animation="fade-right">
                    <Evolution
                        projectId={
                            data.id
                        }
                        githubLink={
                            data.gitHubLink
                        }
                        initialDraft={
                            initialEvolutionDraft
                        }
                        initialGeneratedAt={
                            initialEvolutionGeneratedAt
                        }
                        initialPublishedCount={
                            data.commits?.length ??
                            0
                        }
                    />
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
                        onClick={async () => await deleteProjectHandle()}
                        noize={true}
                    />
                </AnimatedSection>
            </div>
        </main>
    )    
    
}

export default ClientPageWrapper;