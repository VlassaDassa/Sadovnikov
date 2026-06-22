'use client'

import React from 'react';

import SectionBackground from '@/components/admin/general/sectionBackground';
import SectionTitle from '@/components/admin/general/sectionTitle';
import Input from '@/components/shared/input';
import Icon from '@/components/shared/icons/Icon';

import { IProject } from '@/interfaces/general';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';


interface DescriptionProps {
    projects: IProject[];
    projectId: number;
    setData: React.Dispatch<React.SetStateAction<IProject[]>>;
}

const Description: React.FC<DescriptionProps> = ({ projects, projectId, setData }) => {
    const project = projects.find(proj => proj.id === projectId)

    if (!project) return

    const handleChangeDescription= (
        featureId: number,
        value: string
    ) => {
        setData(prev =>
            prev.map(project =>
                project.id === projectId
                    ? {
                        ...project,
                        description: project.description.map(item =>
                            item.id === featureId
                                ? { ...item, content: value }
                                : item
                        )
                    }
                    : project
            )
        );
    };

    if (!project) return

    return (
        <section className={styles.section}>
            <SectionTitle 
                title='DESCRIPTION'
                text='Edit the content of each section thar appears on the project page'
            />

            <SectionBackground className={styles.itemWrapper}>
                {
                    project.description.map((item) => (
                        <div className={styles.item}>
                            <div className={styles.headerWrapper}>
                                <div className={styles.iconWrapper}>
                                    <Icon 
                                        name={item.icon}
                                        size={20}
                                        strokeColor={cssVars.white}
                                        fillColor='none'
                                    />
                                </div>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                            </div>
                        
                            <Input 
                                placeholder='Text...'
                                name={item.title}
                                type='textarea'
                                value={item.content}
                                iconPosition='noIcon'
                                additionalClass={styles.texarea}
                                adminLabel='withoutLabel'
                                maxLen={300}
                                variant='admin'
                                counter={true}
                                maxCounter={300}
                                onChange={(e) => handleChangeDescription(item.id, e.target.value)}
                            />
                        </div>
                    ))
                }
            </SectionBackground>
        </section>
        
    )
}

export default Description;