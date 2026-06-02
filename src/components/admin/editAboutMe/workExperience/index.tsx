import React from 'react';

import SectionBackground from "@/components/admin/general/sectionBackground";
import SectionTitle from '@/components/admin/general/sectionTitle';

import { aboutMe } from '@/mockData/aboutMe';

import styles from './index.module.scss';



// interface ItemProps {
//     item: 
// }

const Item: React.FC = () => {
    return (
        <div className={styles.item}>

        </div>
    )
}



const WorkExperience: React.FC = () => {
    return (
        <section className={styles.section}>
            <SectionTitle 
                text='Add, edit or reorder your work experience'
                title='WORK EXPERIENCE'
                counter={true}
                count={3}
            />

            <SectionBackground className={styles.sectionBg}>
                ''
            </SectionBackground>
        </section>
    )
}

export default WorkExperience;