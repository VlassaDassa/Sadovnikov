import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Error from '@/components/shared/Error';


export const metadata: Metadata = {
    title: 'Page under development',

    robots: {
        index: false,
        follow: false,
    },
}


const PageInDev: React.FC = async () => {
    const t = await getTranslations('PageInDev')
    
    return (
        <Error h1={t('Title')} h2={t('SubTitle')} error="" link="/" btn={true} />
    )
}


export default PageInDev;