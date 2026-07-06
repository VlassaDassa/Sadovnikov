import React from 'react';

import Input from '@/components/shared/input';

import { EditProjectProps, IProject } from '@/interfaces/general';

import styles from './index.module.scss';


const Inputs: React.FC<EditProjectProps> = ({ project, setData, setIsSaving }) => {

    if (!project) return

    const handleChangeGeneralData = <T extends keyof typeof project>(
        field: T,
        value: string
    ) => {
        setData((prev: IProject) => ({
            ...prev,
            [field]: value,
        }));

        setIsSaving(true)
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
        
        setData((prev: IProject) => ({
            ...prev,
            numberTeam: newNumberTeam,
            teamType: teamType,
        }));

        setIsSaving(true)
    }

    const handleChangeDate = (date: string) => {
        if (date) {
            setData((prev: IProject) => ({
                ...prev,
                date: date,
            }));
        }

        setIsSaving(true)
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
                onChange={(e) => handleChangeGeneralData('name', e.target.value)}
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
                onChange={(e) => handleChangeGeneralData('category', e.target.value)}
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
                onChange={(e) => handleChangeGeneralData('previewDescription', e.target.value)}
            />

            <Input 
                name='link(demo)'
                placeholder='Link...'
                value={project?.demoLink}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Link (Demo)'
                onChange={(e) => handleChangeGeneralData('demoLink', e.target.value)}
                
            />

            <Input 
                name='link(github)'
                value={project?.gitHubLink}
                placeholder='Text...'
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Link (GitHub)'
                onChange={(e) => handleChangeGeneralData('gitHubLink', e.target.value)}
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
                onChange={(e) => handleChangeGeneralData('developmentTime', e.target.value)}
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