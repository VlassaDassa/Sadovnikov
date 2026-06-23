import React, {  Dispatch, SetStateAction } from 'react';

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

    // const handleChangText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
    //     const newText = e.target.value;
        
    //     setItems(
    //         prev => prev.map((el) => el.id === item.id 
    //             ? {...el, text: newText}
    //             : el
    //         ) 
    //     )
    // }


    const handleIconUpload = (path: string, index: number) => {
        setData(prev => prev.map((item, i) => 
            i === index ? {...item, icon: path} : item
        ))
    }

    return (
        <div 
            className={`${styles.item} modalElementBg`}
        >
            <div className={styles.inputs}>
                <Input 
                    name={item.name}
                    placeholder='Text...'
                    additionalClass={styles.input}
                    type='text'
                    iconPosition='noIcon'
                    value={item.name}
                    variant='admin'
                    adminLabel='withoutLabel'
                />

                <Input 
                    name={item.name + '_title'}
                    placeholder='Text...'
                    additionalClass={styles.input}
                    type='text'
                    iconPosition='noIcon'
                    value={item.tooltip.title}
                    variant='admin'
                    adminLabel='withLabel'
                    label='Title'
                />

                <Input 
                    name={item.name + '_description'}
                    placeholder='Text...'
                    additionalClass={styles.textarea}
                    type='textarea'
                    iconPosition='noIcon'
                    value={item.tooltip.text}
                    variant='admin'
                    adminLabel='withLabel'
                    label='Description'
                />

                <IconUploader 
                    additionalClass={styles.iconBtnWrapper}
                    icon={item.icon}
                    onIconUpload={(path: string) => handleIconUpload(path, item.id)}
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


    return (
        <ModalWrapper
            drag={false}
            tooltipVisible={true}
            disableBtn={disableBtn}
            addItem={() => addStackItem(projectId)}

            button={true}

            modalName='editProjectStack'

            title='Edit Stack'
            subTitle='Manage your stack in  project'
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