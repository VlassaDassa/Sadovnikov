import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import SectionBackground from '@/components/admin/general/sectionBackground';
import Input from '@/components/shared/input';
import AdaptiveImage from '@/components/shared/AdaptiveImage';
import Button from '@/components/shared/button/Button';

import { IProject } from '@/interfaces/general';

import styles from './index.module.scss';


interface GeneralDataProps {
    projects: IProject[],
    projectId: number,
    setData: Dispatch<SetStateAction<IProject[]>>
}


const Inputs: React.FC<GeneralDataProps> = ({ projects, setData, projectId }) => {
    const project = projects.find(p => p.id === projectId);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newName = e.target.value;
        
        if (newName.length <= 20) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, name: newName}
                    : item
                ) 
            )
        }
    }

    const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newCategory = e.target.value;
        
        if (newCategory.length <= 20) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, category: newCategory}
                    : item
                ) 
            )
        }
    }

    const handleChangePreviewDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newPreviewDescription = e.target.value;
        
        if (newPreviewDescription.length <= 300) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, previewDescription: newPreviewDescription}
                    : item
                ) 
            )
        }
    }

    const handleChangeDemoLink = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newDemoLink = e.target.value;
        
        setData(
            prev => prev.map((item) => item.id === projectId
                ? {...item, demoLink: newDemoLink}
                : item
            ) 
        )
    }

    const handleChangeGitHubLink = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newGitHubLink = e.target.value;
        
        setData(
            prev => prev.map((item) => item.id === projectId
                ? {...item, gitHubLink: newGitHubLink}
                : item
            ) 
        )
    }

    const handleChangeDevelopmentTime = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newDevelopmentTime = e.target.value;
        
        if (newDevelopmentTime.length <= 20) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, developmentTime: newDevelopmentTime}
                    : item
                ) 
            )
        }
    }

    const handleChangeTeamType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newNumberTeam = Number(e.target.value);
        let teamType = 'solo'

        if (newNumberTeam === 2) {
            teamType = 'duo'
        }
        else if (newNumberTeam >= 3) {
            teamType = 'team'
        }
        
        setData(
            prev => prev.map((item) => item.id === projectId
                ? {...item, numberTeam: newNumberTeam, teamType: teamType}
                : item
            ) 
        )
    }

    const handleChangeDate = (date: string) => {
        if (date) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, date: date}
                    : item
                ) 
            )
        }
    };

    return (
        <div className={styles.inputs}>
            <Input 
                name='title'
                placeholder='Text...'
                value={project?.name}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Project title'
                onChange={handleChangeName}
            />

            <Input 
                name='category'
                placeholder='Text...'
                value={project?.category}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Category'
                onChange={handleChangeCategory}
            />

            <Input 
                name='projectPreviewDescription'
                additionalClass={styles.textarea}
                type='textarea'
                placeholder='Text...'
                variant='admin'
                value={project?.previewDescription}
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Preview description'
                counter={true}
                maxCounter={300}
                onChange={handleChangePreviewDescription}
            />

            <Input 
                name='link(demo)'
                placeholder='Link...'
                value={project?.demoLink}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Link (Demo)'
                onChange={handleChangeDemoLink}
            />

            <Input 
                name='link(github)'
                value={project?.gitHubLink}
                placeholder='Text...'
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Link (GitHub)'
                onChange={handleChangeGitHubLink}
            />

            <Input 
                name='developmentTime'
                placeholder='Time...'
                value={project?.developmentTime}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Development time'
                onChange={handleChangeDevelopmentTime}
            />

            <Input 
                name='teamType'
                value={project?.numberTeam}
                placeholder='Number...'
                variant='admin'
                type='number'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Number of development'
                onChange={handleChangeTeamType}
            />

            <Input 
                name='date'
                datePicker={true}
                datePickerDay={true}
                value={project?.date}
                placeholder='Date...'
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Date'
                datePickerChange={handleChangeDate}
            />
        </div>
    )
}


const GeneralData: React.FC<GeneralDataProps> = ({ projects, setData, projectId }) => {
    const project = projects.find(p => p.id === projectId);

    const [curImage, setCurImage] = useState<number>(project?.images.find((item) => item.main)?.id || 1)

    const handleMainClick = (id: number) => {
        setData(prev =>
            prev.map((project) => {
                if (project.id !== projectId) return project;
                
                const targetImage = project.images.find(img => img.id === id);
                if (!targetImage) return project;
                
                const updatedImages = project.images.map(img => ({
                    ...img,
                    main: img.id === id
                }));
                
                return {
                    ...project,
                    images: updatedImages,
                };
            })
        );
    };

    useEffect(() => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            const imageExists = project.images.some(img => img.id === curImage);
            if (!imageExists && project.images.length > 0) {
                setCurImage(project.images[0].id);
            }
        }
    }, [projects, projectId, curImage]);

    const handleDeleteImage = (id: number) => {
        setData(prev =>
            prev.map(project => {
                if (project.id !== projectId) return project;
                
                const updatedImages = project.images.filter(img => img.id !== id);
                
                const wasMainDeleted = project.images.find(img => img.id === id)?.main;
                
                const finalImages = wasMainDeleted && updatedImages.length > 0
                    ? updatedImages.map((img, index) => ({
                        ...img,
                        main: index === 0
                    }))
                    : updatedImages;
                
                return {
                    ...project,
                    images: finalImages,
                };
            })
        );
    };
            
    const currentImage = project?.images.find(img => img.id === curImage);

    return (
        <SectionBackground className={styles.section}>
            <Inputs 
                projects={projects}
                setData={setData}
                projectId={projectId}
            />

            <div className={styles.images}>
                <div className={styles.imagesHeader}>
                    <h3 className={styles.imagesTitle}>Main Preview Image</h3>
                    <p className={styles.imagesSubTitle}>(1440x1024 resolution)</p>
                </div>

                {
                    
                    project &&
                    <>
                        <div className={styles.imageWrapper}>
                            {currentImage && (
                                <AdaptiveImage 
                                    src={currentImage.image}
                                    alt='Main image'
                                ariaHidden={false}
                                wrapClass={styles.mainImgWrapper}
                                imgClass={styles.mainImg}
                                />
                            )}

                            <div className={styles.innerShadow}></div>
                        </div>

                        <div className={styles.pgnWrapper}>
                            {
                                project.images.map((img, index) => (
                                    <div className={styles.pgnImageWrapper} key={index} onClick={() => setCurImage(img.id)}>
                                        <AdaptiveImage 
                                            src={img.image}
                                            alt='Project image'
                                            ariaHidden={false}
                                            wrapClass={styles.pgnImage}
                                        />

                                        <div 
                                            className={`${styles.pgnInnerShadow} ${img.id === curImage && styles.curInnerShadow}`} 
                                        />

                                        {
                                            img.main && <p className={styles.mainLabel}>Main</p>
                                        }

                                        <Button 
                                            behavior="default"
                                            iconPosition="only"
                                            variant="black"
                                            additionalClass={styles.deleteImage}
                                            icon="trash"
                                            tooltip={{
                                                text: 'Delete image',
                                                type: 'lvl1',
                                                fakeWidth: 100,
                                                placement: 'bottom'
                                            }}
                                            onClick={(e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                handleDeleteImage(img.id);
                                            }}
                                        />

                                        <Button 
                                            behavior="default"
                                            iconPosition="noIcon"
                                            variant="black"
                                            text='Main'
                                            additionalClass={styles.mainImgBtn}
                                            onClick={(e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                handleMainClick(img.id);
                                            }}
                                        />
                                    </div>
                                ))
                            }

                            {project.images.length < 4 && (
                                <Button 
                                    behavior="default"
                                    iconPosition="only"
                                    variant="black"
                                    additionalClass={styles.addImageBtn}
                                    icon="plus"
                                    tooltip={{
                                        text: 'Add image',
                                        type: 'lvl1',
                                        fakeWidth: 100,
                                        placement: 'bottom'
                                    }}
                                />
                            )}
                        </div>
                    </>
                }
            </div>
        </SectionBackground> 
    )
}

export default GeneralData;