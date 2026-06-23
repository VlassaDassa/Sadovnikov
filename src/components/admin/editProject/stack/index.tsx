import React from 'react';

import SectionBackground from '@/components/admin/general/sectionBackground';
import SectionTitle from '@/components/admin/general/sectionTitle';
import AdaptiveImage from '@/components/shared/AdaptiveImage';
import Button from '@/components/shared/button/Button';

import { EditProjectProps } from '@/interfaces/general';

import styles from './index.module.scss';





const Stack: React.FC<EditProjectProps> = ({ projects, projectId, setData }) => {
    const project = projects.find(proj => proj.id === projectId)

    return (
        <section className={styles.section}>
            <SectionTitle 
                title='STACK'
                text='Add and manage technologies used in the project'
            />

            <SectionBackground className={styles.sectionBg}>
                {
                    project?.stack.map((item) => (
                        <SectionBackground key={item.id} className={styles.itemWrapper}>
                            <div className={styles.itemIconWrapper}>    
                                <AdaptiveImage 
                                    src={item.icon}
                                    alt={item.name}
                                    wrapClass={styles.itemIcon}
                                />
                            </div>
                            <p className={styles.itemText}>{item.name}</p>
                        </SectionBackground>
                    ))
                }

                <Button 
                    behavior='default'
                    iconPosition='only'
                    icon='plus'
                    variant='black'
                    additionalClass={styles.addBtn}
                />
            </SectionBackground>
        </section>
    )
}

export default Stack;