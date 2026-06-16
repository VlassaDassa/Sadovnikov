import React from 'react';

import SectionBackground from '@/components/admin/general/sectionBackground';
import Input from '@/components/shared/input';

import styles from './index.module.scss';



const GeneralData: React.FC = () => {
    return (
        <SectionBackground className={styles.section}>

            <div className={styles.inputs}>
                <Input 
                    name='title'
                    placeholder='Text...'
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Project title'
                />

                <Input 
                    name='subtitle'
                    placeholder='Text...'
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Subtitle'
                />

                <Input 
                    name='description'
                    type='textarea'
                    placeholder='Text...'
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Description'
                    counter={true}
                    maxCounter={500}
                />
                
                <Input 
                    name='projectPreviewDescription'
                    type='textarea'
                    placeholder='Text...'
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Preview description'
                    counter={true}
                    maxCounter={300}
                />

                <Input 
                    name='link(demo)'
                    placeholder='Link...'
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Link (Demo)'
                />

                <Input 
                    name='link(github)'
                    placeholder='Text...'
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Link (GitHub)'
                />

                <Input 
                    name='developmentTime'
                    placeholder='Time...'
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Development time'
                />

                <Input 
                    name='teamType'
                    placeholder='Number...'
                    variant='admin'
                    type='number'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Number of development'
                />

                <Input 
                    name='category'
                    placeholder='Text...'
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Category'
                />
            </div>


        </SectionBackground>
    )
}

export default GeneralData;