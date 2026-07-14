'use client';

import React from 'react';

import AdaptiveImage from '@/components/shared/AdaptiveImage';
import Icon from '@/components/shared/icons/Icon';

import { useKeyFeatureImageUpload } from './useKeyFeatureImageUpload';
import { IProject } from '@/interfaces/general';

import { cssVars } from '@/styles/cssVariables';
import styles from './../index.module.scss';


interface KeyFeatureImageUploadProps {
    featureId: number;
    field: 'photo' | 'icon';
    src: string;
    label: string;
    sizeInfo: string;
    setData: React.Dispatch<React.SetStateAction<IProject>>;
}

const KeyFeatureImageUpload: React.FC<KeyFeatureImageUploadProps> = ({
    featureId,
    field,
    src,
    label,
    sizeInfo,
    setData,
}) => {
    const {
        fileInputRef,
        handleFileUpload,
        openFilePicker,
        isLoading,
    } = useKeyFeatureImageUpload(featureId, field, setData);

    return (
        <div className={styles.loadImageWrapper} onClick={openFilePicker}>
            <p className={styles.inputLabel}>{label}</p>

            <AdaptiveImage 
                src={src}
                alt="Feature photo"
                wrapClass={field === 'photo' ? styles.wrapImage : styles.wrapIcon}
                imgClass={field === 'photo' ? styles.image : styles.icon}
            />

            <Icon 
                name="pen"
                fillColor={cssVars.white}
                iconClass={styles.pen}
            />

            <p className={styles.inputLabel}>{sizeInfo}</p>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                disabled={isLoading}
            />
        </div>
    );
};

export default KeyFeatureImageUpload;