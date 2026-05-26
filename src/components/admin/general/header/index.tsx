import React from 'react';

import DecorButton from '@/components/shared/button/DecorButton';

import styles from './index.module.scss';



const Header: React.FC = () => {
    return (
        <header className={`${styles.header} container`}>
            <DecorButton
                behavior='default'
                variant='medium'
                text={{
                    default: 'SADOVNIKOV',
                    alter: 'SADOVNIKOV'
                }}
            />

            <p className={styles.welcomeText}>Hello, <span className={styles.brandColor}>Vlad! 🖐</span></p>
        </header>
    )
}

export default Header;