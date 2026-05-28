import React from 'react';

import SectionBackground from '../general/sectionBackground';
import DashboardTitle from '../general/dashboardTitle';
import Button from '@/components/shared/button/Button';

import styles from './index.module.scss';



const QuickEdit: React.FC = () => {
    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <div className={styles.title}>
                    <DashboardTitle additionalClass={styles.titleText} text='QUICK EDIT'/>
                    <p className={styles.subTitle}>On Homepage</p>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.item}>
                        <div className={styles.content}>
                            <div className={styles.itemWrapper}>
                                <h3 className={styles.header}>Edit <span className={styles.sectionName}>'Skills'</span></h3>
                                <p className={styles.description}>Manage and recorded up to 4 skills</p>
                            </div>
                            <Button 
                                behavior='default'
                                iconPosition='only'
                                variant='primary'
                                icon='pen'
                                additionalClass={styles.btn}
                            />
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.content}>
                            <div className={styles.itemWrapper}>
                                <h3 className={styles.header}>Edit <span className={styles.sectionName}>'My Stack'</span></h3>
                                <p className={styles.description}>Add, remove and organize technology</p>
                            </div>
                            <Button 
                                behavior='default'
                                iconPosition='only'
                                variant='primary'
                                icon='pen'
                                additionalClass={styles.btn}
                            />
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.content}>
                            <div className={styles.itemWrapper}>
                                <h3 className={styles.header}>Edit <span className={styles.sectionName}>'Footer'</span></h3>
                                <p className={styles.description}>Update contact info, social links and more</p>
                            </div>
                            <Button 
                                behavior='default'
                                iconPosition='only'
                                variant='primary'
                                icon='pen'
                                additionalClass={styles.btn}
                            />
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.content}>
                            <div className={styles.itemWrapper}>
                                <h3 className={styles.header}>Edit <span className={styles.sectionName}>'About Me'</span></h3>
                                <p className={styles.description}>Edit your bio, story and experience</p>
                            </div>
                            <Button 
                                behavior='default'
                                iconPosition='only'
                                variant='primary'
                                icon='pen'
                                additionalClass={styles.btn}
                            />
                        </div>
                    </div>
                </div>
                


            </SectionBackground>
        </section>
    )   
}

export default QuickEdit;