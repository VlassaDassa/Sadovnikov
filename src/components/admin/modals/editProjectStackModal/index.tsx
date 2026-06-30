import React, {  Dispatch, SetStateAction, useRef, useEffect } from 'react';

import Input from '@/components/shared/input';
import IconUploader from '@/components/admin/general/iconUploader';
import ModalWrapper from '@/components/admin/modals/modalWrapper';
import Button from '@/components/shared/button/Button';

import type { EditProjectProps, IProject, IProjectStack } from '@/interfaces/general';

import styles from './index.module.scss';




interface StackItemProps {
    projectId: number,
    item: IProjectStack,
    setData: Dispatch<SetStateAction<IProject[]>>
}

const StackItem: React.FC<StackItemProps> = ({ projectId, item, setData }) => {
    
    const deleteStackItem = (projectId: number, stackId: number) => {
        setData(prev =>
            prev.map(project => {
                if (project.id !== projectId) return project;
                
                return {
                    ...project,
                    stack: project.stack.filter(item => item.id !== stackId)
                };
            })
        );
    };

    const handleChangeStack = (
        stackId: number,
        field: string,
        value: string
    ) => {
        setData(prev =>
            prev.map(project =>
                project.id === projectId
                    ? {
                        ...project,
                        stack: project.stack.map(el =>
                            el.id === stackId
                                ? { ...el, [field]: value }
                                : el
                        )
                    }
                    : project
            )
        );
    };

    const handleChangeTooltip = (
        stackId: number,
        field: 'title' | 'text',
        value: string
    ) => {
        setData(prev =>
            prev.map(project => {
                if (project.id !== projectId) return project;
                
                return {
                    ...project,
                    stack: project.stack.map(el =>
                        el.id === stackId
                            ? {
                                ...el,
                                tooltip: el.tooltip
                                    ? { ...el.tooltip, [field]: value }
                                    : { id: Date.now(), title: '', text: '', [field]: value },
                            }
                            : el
                    )
                };
            })
        );
    };


    const handleIconUpload = (path: string, stackId: number) => {
        setData(prev =>
            prev.map(project => {
                if (project.id !== projectId) return project;
                
                return {
                    ...project,
                    stack: project.stack.map(el =>
                        el.id === stackId
                            ? { ...el, icon: path }
                            : el
                    )
                };
            })
        );
    };

    return (
        <div 
            className={`${styles.item} modalElementBg`}
        >
            <div className={styles.inputs}>
                <IconUploader 
                    additionalClass={styles.iconBtnWrapper}
                    icon={item.icon}
                    onIconUpload={(path: string) => handleIconUpload(path, item.id)}
                />

                <Input 
                    name={item.name}
                    placeholder='Text...'
                    additionalClass={styles.input}
                    type='text'
                    iconPosition='noIcon'
                    maxLen={20}
                    value={item.name}
                    variant='admin'
                    adminLabel='withoutLabel'
                    onChange={(e) => handleChangeStack(item.id, 'name', e.target.value)}
                />

                <Input 
                    name={item.name + '_title'}
                    placeholder='Text...'
                    additionalClass={styles.input}
                    type='text'
                    iconPosition='noIcon'
                    value={item?.tooltip?.title}
                    variant='admin'
                    adminLabel='withLabel'
                    label='Title'
                    onChange={(e) => handleChangeTooltip(item.id, 'title', e.target.value)}
                />

                <Input 
                    name={item.name + '_description'}
                    placeholder='Text...'
                    additionalClass={styles.textarea}
                    type='textarea'
                    iconPosition='noIcon'
                    value={item?.tooltip?.text}
                    variant='admin'
                    adminLabel='withLabel'
                    label='Description'
                    counter={true}
                    maxCounter={400}
                    maxLen={400}
                    onChange={(e) => handleChangeTooltip(item.id, 'text', e.target.value)}
                />

                
            </div>

            <Button
                variant="black"
                behavior="default"
                iconPosition="only"
                icon="trash"
                onClick={() => deleteStackItem(projectId, item.id)}
                additionalClass={styles.deleteBtn}
            />
        </div>
    )
}



const EditProjectStackModal: React.FC<EditProjectProps> = ({ projectId, projects, setData }) => {
    const project = projects.find(proj => proj.id === projectId)
    const defaultIcon = '/images/mockImages/React.svg'
    const containerRef = useRef<HTMLDivElement>(null);

    if (!project) return

    const disableBtn = () => {
        if (project.stack.length >= 6) {
            return 'disabled'
        }

        return 'default'
    }

    const addStackItem = (projectId: number) => {
        setData(prev =>
            prev.map(project => {
                if (project.id !== projectId) return project;
                
                const newItem = {
                    id: Date.now(),
                    name: '',
                    icon: defaultIcon, 
                    tooltip: {
                        id: Date.now() + 1,
                        title: 'Why was this technology chosen?',
                        text: ''
                    }
                };
                
                return {
                    ...project,
                    stack: [...project.stack, newItem]
                };
            })
        );
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [project.stack.length])


    return (
        <ModalWrapper
            drag={false}
            tooltipVisible={true}
            tooltipMax={6}
            items={project.stack}
            
            tooltipText='Maximum 6 technologies allowed'
            disableBtn={disableBtn}
            addItem={() => addStackItem(projectId)}

            button={true}

            modalName='editProjectStack'

            title='Edit Stack'
            subTitle='Manage your stack in  project'
            ref={containerRef}
        >
            <>
                {
                    project?.stack.map((item) => (
                        <StackItem 
                            key={item.id}
                            projectId={projectId}
                            item={item}
                            setData={setData}
                        />
                    ))
                }
            </>
        </ModalWrapper>
    )
}

export default EditProjectStackModal;