import { useTranslations } from 'next-intl';

import Error from '../Error';




interface ErrorPageProps {
    error: string;
}

export default function ErrorPage({ error }: ErrorPageProps) {
    const t = useTranslations('ErrorPage')

    return (
        <Error h1={t('Title')} h2={`${t('subTitle')}...`} error={error} link="/" />
    );
}