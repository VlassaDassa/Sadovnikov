'use client'

import React from 'react';

import Button from '@/components/general/button/Button';

import styles from './index.module.scss';


const reactIcon = '/images/mockImages/React.svg';
const mongoDbIcon = '/images/mockImages/MongoDB.svg';
const nextJSIcon = '/images/mockImages/NextJS.svg';
const reduxIcon = '/images/mockImages/Redux.svg';
const sassIcon = '/images/mockImages/SASS.svg';
const typeScriptIcon = '/images/mockImages/TypeScript.svg';


interface StackItem {
    id: number,
    name: string,
    icon: string
}

interface StackItemProps {
    item: StackItem
}

const stackItems: StackItem[] = [
    {
        id: 1,
        name: 'React',
        icon: reactIcon
    },
    {
        id: 2,
        name: 'MongoDB',
        icon: mongoDbIcon
    },
    {
        id: 3,
        name: 'NextJS',
        icon: nextJSIcon
    },
    {
        id: 4,
        name: 'Redux',
        icon: reduxIcon
    },
    {
        id: 5,
        name: 'SASS',
        icon: sassIcon
    },
    {
        id: 6,
        name: 'TypeScript',
        icon: typeScriptIcon
    },
]


const StackItem: React.FC<StackItemProps> = ({ item }) => {
    

    return (
        <div className={styles.itemWrapper}>
            <div className={styles.iconWrapper}>
                <img src={item.icon} alt="" aria-hidden='true' />
            </div>

            <p className={styles.iconName}>{item.name}</p>
        </div>
    )
}


const ProjectStack: React.FC = () => {
    
    return (
        <section className={`${styles.projectStack} container`}>
            <h2 className={`${styles.title} sectionTitle`}>STACK</h2>

            <Button 
                iconPosition='only'
                behavior='default'
                icon='bell'
                variant='dark'
                tooltip={{
                    text: 'Кнопка',
                    placement: 'bottom'
                }}
            />


            <div className={styles.stackWrapper}>
                {stackItems.map((item) => (
                    <StackItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}

export default ProjectStack