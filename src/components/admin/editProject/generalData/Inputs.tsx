import React from 'react';

import Input from '@/components/shared/input';

import { GeneralDataProps } from '@/interfaces/general';

import styles from './index.module.scss';


const Inputs: React.FC<GeneralDataProps> = ({ projects, setData, projectId }) => {
    const project = projects.find(p => p.id === projectId);

    if (!project) return

    const handleChangeFeature = <T extends keyof typeof project>(
        projectId: number,
        field: T,
        value: string
    ) => {
        setData(
            prev => prev.map((item) => item.id === projectId
                ? {...item, [field]: value}
                : item
            ) 
        )
    };

    const handleChangeTeamType = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newNumberTeam = Number(e.target.value);
        let teamType = 'solo'

        if (newNumberTeam === 2) {
            teamType = 'duo'
        }
        else if (newNumberTeam >= 3) {
            teamType = 'team'
        }
        
        setData(
            prev => prev.map((item) => item.id === projectId
                ? {...item, numberTeam: newNumberTeam, teamType: teamType}
                : item
            ) 
        )
    }

    const handleChangeDate = (date: string) => {
        if (date) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, date: date}
                    : item
                ) 
            )
        }
    };

    return (
        <div className={styles.inputs}>
            <Input 
                name='title'
                placeholder='Text...'
                value={project?.name}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Project title'
                maxLen={30}
                onChange={(e) => handleChangeFeature(projectId, 'name', e.target.value)}
            />

            <Input 
                name='category'
                placeholder='Text...'
                value={project?.category}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Category'
                maxLen={20}
                onChange={(e) => handleChangeFeature(projectId, 'category', e.target.value)}
            />

            <Input 
                name='projectPreviewDescription'
                additionalClass={styles.textarea}
                type='textarea'
                placeholder='Text...'
                variant='admin'
                value={project?.previewDescription}
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Preview description'
                counter={true}
                maxCounter={300}
                maxLen={300}
                onChange={(e) => handleChangeFeature(projectId, 'previewDescription', e.target.value)}
            />

            <Input 
                name='link(demo)'
                placeholder='Link...'
                value={project?.demoLink}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Link (Demo)'
                onChange={(e) => handleChangeFeature(projectId, 'demoLink', e.target.value)}
                
            />

            <Input 
                name='link(github)'
                value={project?.gitHubLink}
                placeholder='Text...'
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Link (GitHub)'
                onChange={(e) => handleChangeFeature(projectId, 'gitHubLink', e.target.value)}
            />

            <Input 
                name='developmentTime'
                placeholder='Time...'
                value={project?.developmentTime}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Development time'
                maxLen={20}
                onChange={(e) => handleChangeFeature(projectId, 'developmentTime', e.target.value)}
            />

            <Input 
                name='teamType'
                value={project?.numberTeam}
                placeholder='Number...'
                variant='admin'
                type='number'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Number of development'
                onChange={handleChangeTeamType}
            />

            <Input 
                name='date'
                datePicker={true}
                datePickerDay={true}
                value={project?.date}
                placeholder='Date...'
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Date'
                datePickerChange={handleChangeDate}
            />
        </div>
    )
}

export default Inputs