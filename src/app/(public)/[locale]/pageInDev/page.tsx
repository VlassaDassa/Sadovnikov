import React from 'react';
import Error from '@/components/shared/Error';

const PageInDev: React.FC = async () => {
    
    return (
        <Error h1="Come back later..." h2="The page is under development" error="" link="/" btn={true} />
    )
}


export default PageInDev;