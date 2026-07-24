import React, { useState } from "react";

import SectionBackground from "../../general/sectionBackground";
import DashboardTitle from "../../general/dashboardTitle";
import Input from "@/components/shared/input";

import { AboutMe } from "@/interfaces/general";

import styles from './index.module.scss';



interface BasicInformationProps {
    data: AboutMe,
    setData: React.Dispatch<React.SetStateAction<AboutMe>>,
    setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
}


const BasicInformation: React.FC<BasicInformationProps> = ({ data, setData, setIsSaving }) => {
    const handleChange = (field: keyof AboutMe, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsSaving(true);
        const value = e.target.value;

        if (field === 'birth') {
            const num = Number(value);
            setData(prev => ({ ...prev, birth: isNaN(num) ? 0 : num }));
            return;
        }
        
        setData(prev => ({ ...prev, [field]: value }));
    };


    return (
        <SectionBackground className={`${styles.section}`} section={true}>
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

                    <div className={styles.inputGroup}>
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
                            name='place_birthRu'
                            placeholder='Text on russian...'
                            value={data.placeBirthRu}
                            variant='admin'
                            iconPosition='noIcon'
                            adminLabel='withoutLabel'
                            onChange={(e) => handleChange('placeBirthRu', e)}
                        />
                    </div>
                    
                    
                    <div className={styles.inputGroup}>
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
                            name='locationRu'
                            placeholder='Text on russian...'
                            value={data.locationRu}
                            variant='admin'
                            iconPosition='noIcon'
                            adminLabel='withoutLabel'
                            onChange={(e) => handleChange('locationRu', e)}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
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

                        <Input 
                            name='educationRu'
                            placeholder='Text on russian...'
                            value={data.educationRu}
                            variant='admin'
                            iconPosition='noIcon'
                            adminLabel='withoutLabel'
                            onChange={(e) => handleChange('educationRu', e)}
                        />

                    </div>
                    
                </form>
        </SectionBackground>
    )
}

export default BasicInformation;