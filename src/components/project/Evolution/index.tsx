import React from 'react';

import styles from './index.module.scss';


interface ICommit {
    name: string,
    date: string,
    text: string
}


const commits: ICommit[] = [
    {
        name: 'First commit',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
    {
        name: 'Added “Header”',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
    {
        name: '- Fix “Preview”',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
    {
        name: 'Added “Contacts”, fix errors, animations',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
    {
        name: 'Added “Contacts”, fix errors, animations',
        date: '22.04.2026',
        text: 'First initialization commit, start development project'
    },
]



const Evolution: React.FC = () => {
    return (
        <section className={`${styles.evolution} container`}>
            <h2 className={`${styles.title} sectionTitle`}>EVOLUTION</h2>

            <div className={styles.evolWrapper}>
                <div className={styles.timeline}>
                    {commits.map((item) => (
                        <div className={styles.commitItem}>
                            <div className={styles.node}></div>
                            <p className={styles.commitText}>- {item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Evolution;

