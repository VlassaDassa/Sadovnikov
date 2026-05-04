import React from 'react';

import Button from '@/components/general/button/Button';
import Icon from '@/components/icons/Icon';

import styles from './index.module.scss';
import { cssVars } from '@/styles/cssVariables';



const ProjectPreview: React.FC = () => {
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
                        <p className={styles.metadataText}>June 24</p>
                    </div>
                    
                    <span className={styles.divider} />

                    <div className={styles.metadataItem}>
                        <Icon
                            name={'time'}
                            strokeColor={cssVars.brand_600}
                            fillColor='none'
                            size={20} 
                            />
                        <p className={styles.metadataText}>3 weeks</p>
                    </div>

                    <span className={styles.divider} />

                    <div className={styles.metadataItem}>
                        <Icon 
                            name={'person'}
                            strokeColor={cssVars.brand_600}
                            fillColor={cssVars.brand_600}
                            size={20}
                        />
                        <p className={styles.metadataText}>Solo project</p>
                    </div>
                </div>

                <div className={styles.textWrapper}>
                    <div className={styles.siteNameWrapper}>
                        <h1 className={styles.name}>SpecTechnologia</h1>
                        <h2 className={styles.subname}>Corporate Website</h2>
                    </div>

                    <p className={styles.shortDescription}>
                        A modern corporate website for a technology company specializing in 
                        security systems and software solutions. Built with performance, 
                        accessibility and a clean user experience in mind
                    </p>
                </div>
                
                <div className={styles.btnWrapper}>
                    <Button
                        behavior='default'
                        iconPosition='leftIcon'
                        variant='dark'
                        text={'GitHub'}
                        icon={'github'}
                    />

                    <Button
                        behavior='default'
                        iconPosition='leftIcon'
                        variant='primary'
                        text={'Live Demo'}
                        icon={'internet'}
                    />
                </div>
            </div>

            Preview
            
        </section>
    )
}

export default ProjectPreview;

