import Error from '@/components/shared/Error';

import { getTranslations } from 'next-intl/server';

import { fontVariables } from '@/styles/fonts';
import './globals.scss';



export default async function GlobalNotFound() {
    const t =
        await getTranslations(
            'NotFound',
        )

    return (
        <html lang="en" className={fontVariables}>
            <body>
                <Error h1="404" h2={t('Title')} error={t('Description')} link="/" btn={false} />
            </body>
        </html>
    );
}