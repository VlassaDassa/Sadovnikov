import Error from '@/components/shared/Error';

import { getTranslations } from 'next-intl/server';

import './globals.scss';



export default async function GlobalNotFound() {
    const t =
        await getTranslations(
            'NotFound',
        )

    return (
        <html lang="en">
            <body>
                <Error h1="404" h2={t('Title')} error={t('Description')} link="/" btn={false} />
            </body>
        </html>
    );
}