'use client';

import React from 'react';

import SectionBackground from '@/components/admin/general/sectionBackground';
import Inputs from './Inputs';
import Images from './Images';

import { useImageUpload } from './hooks/useImageUpload';
import { useImageManagement } from './hooks/useImageManagement';
import { EditProjectProps } from '@/interfaces/general';

import styles from './index.module.scss';






const GeneralData: React.FC<EditProjectProps> = ({ project, setData, setIsSaving }) => {
    const { curImage, setCurImage, currentImage, handleMainClick, handleDeleteImage } =
        useImageManagement(project, setData);
    const { fileInputRef, handleFileUpload, openFilePicker, isLoading } = useImageUpload(setData);

    if (!project) return null;

    return (
        <SectionBackground className={styles.section}>
            <Inputs project={project} setData={setData} setIsSaving={setIsSaving} />

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