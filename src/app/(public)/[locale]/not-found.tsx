import Error from '@/components/shared/Error';

import { useTranslations } from 'next-intl';




export default function NotFound() {
    const t = useTranslations('NotFound')

    return (
        <Error h1="404" h2={t('Title')} error={t('Description')} link="/" />
    );
}

