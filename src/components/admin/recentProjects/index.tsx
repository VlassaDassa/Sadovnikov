import React from "react";

import DashboardTitle from "../general/dashboardTitle";
import SectionBackground from "../general/sectionBackground";

import styles from './index.module.scss';


const RecentProjects: React.FC = () => {
    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <div className={styles.title}>
                    <DashboardTitle text='RECENT PROJECTS' additionalClass={styles.titleText} /> 
                    <p className={styles.subtitle}>Quick access to your projects management</p>
                </div>
                               
            </SectionBackground>
        </section>
    )
}

export default RecentProjects;