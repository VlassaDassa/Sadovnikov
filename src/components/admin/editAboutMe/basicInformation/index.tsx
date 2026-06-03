import React, { useState } from "react";

import SectionBackground from "../../general/sectionBackground";
import DashboardTitle from "../../general/dashboardTitle";
import Input from "@/components/shared/input";

import { AboutMe } from "@/interfaces/general";
import { aboutMe as initialData } from "@/mockData/aboutMe";

import styles from './index.module.scss';


const BasicInformation: React.FC = () => {
    const [data, setData] = useState<AboutMe>(initialData)

    const handleChange = (field: keyof AboutMe, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(prev => ({...prev, [field]: e.target.value}))
    }


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
                        onChange={(e) => handleChange('birth', e)}
                    />

                    <Input 
                        name='place_birth'
                        placeholder='Text...'
                        value={data.placeBirth}
                        variant='admin'
                        iconPosition='noIcon'
                        adminLabel='withLabel'
                        label="Place of birth"
                        onChange={(e) => handleChange('placeBirth', e)}
                    />

                    <Input 
                        name='location'
                        placeholder='Text...'
                        value={data.location}
                        variant='admin'
                        iconPosition='noIcon'
                        adminLabel='withLabel'
                        label="Location"
                        onChange={(e) => handleChange('location', e)}
                    />

                    <Input 
                        name='education'
                        placeholder='Text...'
                        value={data.education}
                        variant='admin'
                        iconPosition='noIcon'
                        adminLabel='withLabel'
                        label="Education"
                        onChange={(e) => handleChange('education', e)}
                    />
                </form>
        </SectionBackground>
    )
}

export default BasicInformation;