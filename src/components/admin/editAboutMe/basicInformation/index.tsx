import React, { useState } from "react";

import SectionBackground from "../../general/sectionBackground";
import DashboardTitle from "../../general/dashboardTitle";
import Input from "@/components/shared/input";

import { AboutMe } from "@/interfaces/general";
import { aboutMe as initialData } from "@/mockData/aboutMe";

import styles from './index.module.scss';


const BasicInformation: React.FC = () => {
    const [data, setData] = useState<AboutMe>(initialData)


    return (
        <SectionBackground className={styles.section} section={true}>
            <DashboardTitle 
                text='Basic information'
                additionalClass={styles.sectionTitle}
            />

                <form className={styles.inputs}>
                    <Input 
                        name='birth'
                        placeholder='Year...'
                        value={data.birth}
                        variant='admin'
                        iconPosition='noIcon'
                        adminLabel='withLabel'
                        label="Year of birth"
                    />

                    <Input 
                        name='place_birth'
                        placeholder='Text...'
                        value={data.placeBirth}
                        variant='admin'
                        iconPosition='noIcon'
                        adminLabel='withLabel'
                        label="Place of birth"
                    />

                    <Input 
                        name='location'
                        placeholder='Text...'
                        value={data.location}
                        variant='admin'
                        iconPosition='noIcon'
                        adminLabel='withLabel'
                        label="Location"
                    />

                    <Input 
                        name='education'
                        placeholder='Text...'
                        value={data.education}
                        variant='admin'
                        iconPosition='noIcon'
                        adminLabel='withLabel'
                        label="Education"
                    />
                </form>
        </SectionBackground>
    )
}

export default BasicInformation;