import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Button from '@/components/shared/button/Button';

import { logoutAction } from '@/app/actions/auth/logout';

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

            <form action={logoutAction}>
                <Button 
                    behavior='default'
                    iconPosition='noIcon'
                    variant='black'
                    type='submit'
                    noize={true}
                    text='Exit'
                    additionalClass={styles.exitBtn}
                />
            </form>
        </header>
    )
}

export default Header;