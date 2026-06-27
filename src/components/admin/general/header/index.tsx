import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './index.module.scss';



const Header: React.FC = () => {
    const logoBg = '/images/button/bg_medium_btn.png'

    return (
        <header className={`${styles.header} container`}>
            <Link className={styles.logo} href='/' aria-label="Логотип">
                <Image 
                    src={logoBg}
                    alt="Logo"
                    fill
                    loading='eager'
                    className={styles.logoImg}
                    sizes='50vw'
                />
                <p className={styles.logoText}>
                    SADOVNIKOV
                </p>
            </Link>

            <p className={styles.welcomeText}>Hello, <span className={styles.brandColor}>Vlad! 🖐</span></p>
        </header>
    )
}

export default Header;