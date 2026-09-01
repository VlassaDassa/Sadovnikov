import React from 'react';

import Input from '@/components/shared/input';

import { EditProjectProps, IProject } from '@/interfaces/general';

import styles from './index.module.scss';


const Inputs: React.FC<EditProjectProps> = ({ project, setData }) => {

    if (!project) return

    const handleChangeGeneralData = <T extends keyof typeof project>(
        field: T,
        value: string
    ) => {
        setData((prev: IProject) => ({
            ...prev,
            [field]: value,
        }));

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

    }

    const handleChangeDate = (date: string) => {
        if (date) {
            setData((prev: IProject) => ({
                ...prev,
                date: date,
            }));
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
            
            <div className={`${styles.inputsGroup} ${styles.inputsGroupTextArea}`}>
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
                    name='projectPreviewDescriptionRu'
                    additionalClass={styles.textarea}
                    type='textarea'
                    placeholder='Text on russian...'
                    variant='admin'
                    value={project?.previewDescriptionRu}
                    iconPosition='noIcon'
                    adminLabel='withoutLabel'
                    counter={true}
                    maxCounter={300}
                    maxLen={300}
                    onChange={(e) => handleChangeGeneralData('previewDescriptionRu', e.target.value)}
                />
            </div>

            <Input 
                name='projectShortDescription'
                additionalClass={styles.textarea}
                type='text'
                placeholder='Text...'
                variant='admin'
                value={project?.shortDescription}
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Short description (for project card)'
                maxLen={50}
                onChange={(e) => handleChangeGeneralData('shortDescription', e.target.value)}
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

            <div className={styles.inputsGroup}>
                <Input 
                    name='developmentTime'
                    placeholder='Time...'
                    value={project?.developmentTime}
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withLabel'
                    label='Development time'
                    maxLen={10}
                    onChange={(e) => handleChangeGeneralData('developmentTime', e.target.value)}
                />

                <Input 
                    name='developmentTimeRu'
                    placeholder='Text on russian...'
                    value={project?.developmentTimeRu}
                    variant='admin'
                    iconPosition='noIcon'
                    adminLabel='withoutLabel'
                    maxLen={20}
                    onChange={(e) => handleChangeGeneralData('developmentTimeRu', e.target.value)}
                />
            </div>
            

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
                placeholder='Date (DD-MM-YEAR)'
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Date'
                readonly={true}
                datePickerChange={handleChangeDate}
            />
        </div>
    )
}

export default Inputs
