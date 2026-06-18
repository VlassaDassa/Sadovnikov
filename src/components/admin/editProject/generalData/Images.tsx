'use client';

import React from 'react';
import AdaptiveImage from '@/components/shared/AdaptiveImage';
import Button from '@/components/shared/button/Button';
import { IProject } from '@/interfaces/general';

import styles from './index.module.scss';




interface ImagesProps {
    project: IProject;
    curImage: number;
    setCurImage: (id: number) => void;
    currentImage: { id: number; image: string; main: boolean } | undefined;
    handleMainClick: (id: number) => void;
    handleDeleteImage: (id: number) => void;
    openFilePicker: () => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;
}

const Images: React.FC<ImagesProps> = ({
    project,
    curImage,
    setCurImage,
    currentImage,
    handleMainClick,
    handleDeleteImage,
    openFilePicker,
    fileInputRef,
    handleFileUpload,
    isLoading,
}) => {
    return (
        <div className={styles.images}>
            <div className={styles.imagesHeader}>
                <h3 className={styles.imagesTitle}>Main Preview Image</h3>
                <p className={styles.imagesSubTitle}>(1440x1024 resolution)</p>
            </div>

            <div className={styles.imageWrapper}>
                {currentImage && (
                    <AdaptiveImage
                        src={currentImage.image}
                        alt="Main image"
                        wrapClass={styles.mainImgWrapper}
                        imgClass={styles.mainImg}
                    />
                )}
                <div className={styles.innerShadow} />
            </div>

            <div className={styles.pgnWrapper}>
                {project.images.map((img) => (
                    <div
                        key={img.id}
                        className={styles.pgnImageWrapper}
                        onClick={() => setCurImage(img.id)}
                    >
                        <AdaptiveImage
                            src={img.image}
                            alt="Project image"
                            wrapClass={styles.wrapperPgnImage}
                            imgClass={styles.pgnImage}
                        />

                        <div
                            className={`${styles.pgnInnerShadow} ${img.id === curImage && styles.curInnerShadow}`}
                        />

                        <Button
                            behavior="default"
                            iconPosition="only"
                            variant="black"
                            additionalClass={styles.deleteImage}
                            icon="trash"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage(img.id);
                            }}
                        />
                        <Button
                            behavior={img.main ? 'disabled' : 'default'}
                            iconPosition="noIcon"
                            variant="black"
                            text="Main"
                            additionalClass={styles.mainImgBtn}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMainClick(img.id);
                            }}
                        />
                    </div>
                ))}

                {project.images.length < 4 && (
                    <>
                        <Button
                            behavior={isLoading ? 'loading' : 'default'}
                            iconPosition="only"
                            variant="black"
                            additionalClass={styles.addImageBtn}
                            icon="plus"
                            onClick={openFilePicker}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Images;