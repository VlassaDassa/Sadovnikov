import React from 'react';
import { getTranslations } from 'next-intl/server';

import Error from '@/components/shared/Error';

const PageInDev: React.FC = async () => {
    const t = await getTranslations('PageInDev')
    
    return (
        <Error h1={t('Title')} h2={t('SubTitle')} error="" link="/" btn={true} />
    )
}


export default PageInDev;