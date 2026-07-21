import Error from '@/components/shared/Error';

import { getTranslations } from 'next-intl/server';

import './globals.scss';



interface NotFoundProps {
    params: Promise<{
        locale: string;
    }>;
}


export default async function NotFound({
    params,
}: NotFoundProps) {
    const {
        locale,
    } =  await params;

    const t = await getTranslations({ locale, namespace: 'NotFound'});


    return (
        <Error h1="404" h2={t('Title')} error={t('Description')} link="/" btn={false} />
    );
}