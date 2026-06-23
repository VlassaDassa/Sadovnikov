'use client';

import React from 'react';

import SectionBackground from '@/components/admin/general/sectionBackground';
import Inputs from './Inputs';
import Images from './Images';

import { useImageUpload } from './hooks/useImageUpload';
import { useImageManagement } from './hooks/useImageManagement';
import { EditProjectProps } from '@/interfaces/general';

import styles from './index.module.scss';






const GeneralData: React.FC<EditProjectProps> = ({ projects, setData, projectId }) => {
    const project = projects.find(p => p.id === projectId);
    const { curImage, setCurImage, currentImage, handleMainClick, handleDeleteImage } =
        useImageManagement(projectId, projects, setData);
    const { fileInputRef, handleFileUpload, openFilePicker, isLoading } = useImageUpload(projectId, setData);

    if (!project) return null;

    return (
        <SectionBackground className={styles.section}>
            <Inputs projects={projects} setData={setData} projectId={projectId} />

            <Images
                project={project}
                curImage={curImage}
                setCurImage={setCurImage}
                currentImage={currentImage}
                handleMainClick={handleMainClick}
                handleDeleteImage={handleDeleteImage}
                openFilePicker={openFilePicker}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
                isLoading={isLoading}
            />
        </SectionBackground>
    );
};

export default GeneralData;