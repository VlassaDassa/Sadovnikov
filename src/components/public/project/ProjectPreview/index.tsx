import React from 'react';
import { useTranslations } from 'next-intl';

import Button from '@/components/shared/button/Button';
import Icon from '@/components/shared/icons/Icon';
import Slider from '../Slider';

import type { IProjectPreviewData } from '@/interfaces/general';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';


interface ProjectPreviewProps {
    data: IProjectPreviewData
}


const ProjectPreview: React.FC<ProjectPreviewProps> = ({ data }) => {
    const t = useTranslations('TeamType');

    const teamTypeIcon = ( data.teamType === 'solo' ? 'person' : data.teamType === 'duo' ? 'twoPerson' : 'manyPerson' )
    const localeTeamType = t(data.teamType)

    return (
        <section className={`${styles.projectPreview} container`}>

            <div className={styles.textContent}>
                <div className={styles.metadata}>
                    <div className={styles.metadataItem}>
                        <Icon 
                            name={'calendar'}
                            strokeColor={cssVars.brand_600}
                            fillColor='none'
                            size={20}
                            />
                        <p className={styles.metadataText}>{data.date}</p>
                    </div>
                    
                    <span className={styles.divider} />

                    <div className={styles.metadataItem}>
                        <Icon
                            name={'time'}
                            strokeColor={cssVars.brand_600}
                            fillColor='none'
                            size={20} 
                            />
                        <p className={styles.metadataText}>{data.developmentTime}</p>
                    </div>

                    <span className={styles.divider} />

                    <div className={styles.metadataItem}>
                        <Icon 
                            name={teamTypeIcon}
                            strokeColor={cssVars.brand_600}
                            fillColor={cssVars.brand_600}
                            size={20}
                        />
                        <p className={styles.metadataText}>{localeTeamType}</p>
                    </div>
                </div>

                <div className={styles.textWrapper}>
                    <div className={styles.siteNameWrapper}>
                        <h1 className={styles.name}>{data.name}</h1>
                        <h2 className={styles.subname}>{data.category}</h2>
                    </div>

                    <p className={styles.shortDescription}>
                        {data.previewDescription}
                    </p>
                </div>
                
                <div className={styles.btnWrapper}>
                    <a href={data.gitHubLink} target='_blank'>
                        <Button
                            behavior='default'
                            iconPosition='leftIcon'
                            variant='dark'
                            text={'GitHub'}
                            icon={'github'}
                        />
                    </a>
                    
                    <a href={data.demoLink} target='_blank'>
                        <Button
                            behavior='default'
                            iconPosition='leftIcon'
                            variant='primary'
                            text={'Live Demo'}
                            icon={'internet'}
                        />
                    </a>
                    
                </div>
            </div>
            
            <Slider images={data.images} />
        </section>
    )
}

export default ProjectPreview;

