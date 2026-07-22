import Error from '@/components/shared/Error';

import { getTranslations } from 'next-intl/server';

import './globals.scss';



export default async function NotFound() {
    const t =
        await getTranslations(
            'NotFound',
        )

    return (
        <Error h1="404" h2={t('Title')} error={t('Description')} link="/" btn={false} />
    );
}