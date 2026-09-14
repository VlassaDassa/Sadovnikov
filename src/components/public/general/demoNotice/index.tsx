'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useState } from 'react';

import styles from './index.module.scss';

const credentials = {
    email: 'test@google.com',
    password: '123456789qwerty',
};

const translations = {
    ru: {
        title: 'Загляните в админку',
        description:
            'Это демо-версия сайта. Здесь доступна административная панель для управления проектами, описаниями, изображениями и стеком технологий.',
        login: 'Логин',
        password: 'Пароль',
        open: 'Открыть админку',
        close: 'Закрыть уведомление',
    },
    en: {
        title: 'Explore the admin panel',
        description:
            'This is a demo website. Explore the admin panel to manage projects, descriptions, images and the technology stack.',
        login: 'Login',
        password: 'Password',
        open: 'Open admin panel',
        close: 'Close notice',
    },
};

export default function DemoNotice() {
    const locale = useLocale();
    const [visible, setVisible] = useState(true);
    const text = translations[locale === 'ru' ? 'ru' : 'en'];

    if (!visible) return null;

    return (
        <aside className={styles.notice} aria-label={text.title}>
            <button
                type="button"
                className={styles.close}
                aria-label={text.close}
                onClick={() => setVisible(false)}
            >
                <span aria-hidden="true">&times;</span>
            </button>

            <div className={styles.intro}>
                <div className={styles.heading}>
                    <span className={styles.badge}>DEMO</span>
                    <h2 className={styles.title}>{text.title}</h2>
                </div>

                <p className={styles.description}>
                    {text.description}
                </p>
            </div>

            <div className={styles.access}>
                <dl className={styles.credentials}>
                    <div className={styles.credential}>
                        <dt className={styles.label}>{text.login}</dt>
                        <dd className={styles.value}>
                            <code>{credentials.email}</code>
                        </dd>
                    </div>

                    <div className={styles.credential}>
                        <dt className={styles.label}>{text.password}</dt>
                        <dd className={styles.value}>
                            <code>{credentials.password}</code>
                        </dd>
                    </div>
                </dl>

                <Link href="/admin" className={styles.link}>
                    {text.open}
                    <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </aside>
    );
}