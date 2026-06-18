import React from 'react';

import Input from '@/components/shared/input';

import { GeneralDataProps } from '@/interfaces/general';

import styles from './index.module.scss';


const Inputs: React.FC<GeneralDataProps> = ({ projects, setData, projectId }) => {
    const project = projects.find(p => p.id === projectId);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newName = e.target.value;
        
        if (newName.length <= 20) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, name: newName}
                    : item
                ) 
            )
        }
    }

    const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newCategory = e.target.value;
        
        if (newCategory.length <= 20) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, category: newCategory}
                    : item
                ) 
            )
        }
    }

    const handleChangePreviewDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newPreviewDescription = e.target.value;
        
        if (newPreviewDescription.length <= 300) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, previewDescription: newPreviewDescription}
                    : item
                ) 
            )
        }
    }

    const handleChangeDemoLink = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newDemoLink = e.target.value;
        
        setData(
            prev => prev.map((item) => item.id === projectId
                ? {...item, demoLink: newDemoLink}
                : item
            ) 
        )
    }

    const handleChangeGitHubLink = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newGitHubLink = e.target.value;
        
        setData(
            prev => prev.map((item) => item.id === projectId
                ? {...item, gitHubLink: newGitHubLink}
                : item
            ) 
        )
    }

    const handleChangeDevelopmentTime = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const newDevelopmentTime = e.target.value;
        
        if (newDevelopmentTime.length <= 20) {
            setData(
                prev => prev.map((item) => item.id === projectId
                    ? {...item, developmentTime: newDevelopmentTime}
                    : item
                ) 
            )
        }
    }

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
                onChange={handleChangeName}
            />

            <Input 
                name='category'
                placeholder='Text...'
                value={project?.category}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Category'
                onChange={handleChangeCategory}
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
                onChange={handleChangePreviewDescription}
            />

            <Input 
                name='link(demo)'
                placeholder='Link...'
                value={project?.demoLink}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Link (Demo)'
                onChange={handleChangeDemoLink}
            />

            <Input 
                name='link(github)'
                value={project?.gitHubLink}
                placeholder='Text...'
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Link (GitHub)'
                onChange={handleChangeGitHubLink}
            />

            <Input 
                name='developmentTime'
                placeholder='Time...'
                value={project?.developmentTime}
                variant='admin'
                iconPosition='noIcon'
                adminLabel='withLabel'
                label='Development time'
                onChange={handleChangeDevelopmentTime}
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