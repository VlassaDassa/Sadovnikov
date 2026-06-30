import React, { useState } from 'react';

import SectionTitle from '@/components/admin/general/sectionTitle';
import Input from '@/components/shared/input';

import { AboutMe } from '@/interfaces/general';

import styles from './index.module.scss';



interface ShortBioProps {
    aboutMe: AboutMe
}

const ShortBio: React.FC<ShortBioProps> = ({ aboutMe }) => {
    const [data, setData] = useState<string>(aboutMe['shortBio'])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.value)
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
                value={data}
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