import React, { useState } from 'react';

import SectionTitle from '@/components/admin/general/sectionTitle';
import Input from '@/components/shared/input';

import { AboutMe } from '@/interfaces/general';

import styles from './index.module.scss';



interface ShortBioProps {
    data: AboutMe
    setData: React.Dispatch<React.SetStateAction<AboutMe>>,
    setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
}

const ShortBio: React.FC<ShortBioProps> = ({ data, setData, setIsSaving }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(prev => ({...prev, shortBio: e.target.value}))
        setIsSaving(true);
    }

    return (
        <section className={`${styles.section}`}>
            <SectionTitle 
                title='SHORT BIO'
                text='Write a short bio about yourself'
            />

            <Input 
                name='shortBio'
                type='textarea'
                placeholder='Text...'
                iconPosition='noIcon'
                additionalClass={styles.shortBio}
                value={data.shortBio}
                variant='admin'
                adminLabel='withoutLabel'
                noize={true}
                counter={true}
                maxLen={500}
                maxCounter={500}
                onChange={handleChange}
            />

        </section>
    )
}

export default ShortBio;