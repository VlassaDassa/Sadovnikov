'use client'

import { useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'

import Button from '@/components/shared/button/Button'

import styles from './index.module.scss'

const STORAGE_KEY =
    'development-notice-dismissed-v1'

const STORAGE_EVENT =
    'development-notice-dismissed-change'

const subscribe = (
    callback: () => void,
) => {
    const handleStorage = (
        event: StorageEvent,
    ) => {
        if (event.key === STORAGE_KEY) {
            callback()
        }
    }

    const handleChange = () => {
        callback()
    }

    window.addEventListener(
        'storage',
        handleStorage,
    )

    window.addEventListener(
        STORAGE_EVENT,
        handleChange,
    )

    return () => {
        window.removeEventListener(
            'storage',
            handleStorage,
        )

        window.removeEventListener(
            STORAGE_EVENT,
            handleChange,
        )
    }
}

const getSnapshot = (): boolean => {
    return (
        localStorage.getItem(STORAGE_KEY) ===
        'true'
    )
}

const getServerSnapshot = (): boolean => {
    return true
}

const DevelopmentNotice = () => {
    const t =
        useTranslations('DevelopmentNotice')

    const isDismissed =
        useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot,
        )

    const handleClose = () => {
        localStorage.setItem(
            STORAGE_KEY,
            'true',
        )

        window.dispatchEvent(
            new Event(STORAGE_EVENT),
        )
    }

    if (isDismissed) {
        return null
    }

    return (
        <aside
            className={styles.notice}
            role="status"
            aria-label={t('AriaLabel')}
        >
            <div
                className={styles.content}
                data-nosnippet
            >
                <div
                    className={styles.marker}
                >
                    WIP
                </div>

                <div
                    className={styles.text}
                >
                    <strong
                        className={styles.title}
                    >
                        {t('Title')}
                    </strong>

                    <p
                        className={
                            styles.description
                        }
                    >
                        {t('Description')}
                    </p>
                </div>

                <a
                    href="https://github.com/VlassaDassa/Sadovnikov"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button
                        behavior="default"
                        iconPosition="noIcon"
                        variant="black"
                        noize={false}
                        type="button"
                        text={t('GitHub')}
                        additionalClass={
                            styles.link
                        }
                        onClick={handleClose}
                    />
                </a>

                <Button
                    behavior="default"
                    iconPosition="noIcon"
                    variant="black"
                    noize={false}
                    type="button"
                    text="×"
                    additionalClass={
                        styles.close
                    }
                    onClick={handleClose}
                />
            </div>
        </aside>
    )
}

export default DevelopmentNotice