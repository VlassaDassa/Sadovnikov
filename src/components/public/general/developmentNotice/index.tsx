'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import Button from '@/components/shared/button/Button'

import styles from './index.module.scss'




const STORAGE_KEY =
    'development-notice-dismissed-v1'

const DevelopmentNotice = () => {
    const t = useTranslations('DevelopmentNotice')

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const isDismissed =
            localStorage.getItem(
                STORAGE_KEY,
            ) === 'true'

        if (!isDismissed) {
            setIsVisible(true)
        }
    }, [])

    const handleClose = () => {
        localStorage.setItem(
            STORAGE_KEY,
            'true',
        )

        setIsVisible(false)
    }

    if (!isVisible) {
        return null
    }

    return (
        <aside
            className={styles.notice}
            role="status"
            aria-label={t('AriaLabel')}
        >
            <div className={styles.content} data-nosnippet>
                <div className={styles.marker}>
                    WIP
                </div>

                <div className={styles.text}>
                    <strong className={styles.title}>
                        {t('Title')}
                    </strong>

                    <p className={styles.description}>
                        {t('Description')}
                    </p>
                </div>

                <a 
                    href="https://github.com/VlassaDassa/Sadovnikov"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button 
                        behavior='default'
                        iconPosition='noIcon'
                        variant='black'
                        noize={false}
                        type='button'
                        text={t('GitHub')}
                        additionalClass={styles.link}
                        onClick={handleClose}
                    />
                </a>

                <Button 
                    behavior='default'
                    iconPosition='noIcon'
                    variant='black'
                    noize={false}
                    type='button'
                    text='×'
                    additionalClass={styles.close}
                    onClick={handleClose}
                />
            </div>
        </aside>
    )
}

// Ввести это в консоль, чтобы плашка снова появилась
// localStorage.removeItem(
//     'development-notice-dismissed-v1',
// )

export default DevelopmentNotice