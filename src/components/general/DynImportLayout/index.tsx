'use client';

import dynamic from 'next/dynamic';

const Menu = dynamic(() => import('@/components/general/menu'), { ssr: false });
const Overlay = dynamic(() => import('@/components/general/overlay'), { ssr: false });
const StatusMessage = dynamic(() => import('@/components/general/statusMessage'), { ssr: false });

export const DynImportLayout = () => {
    return (
        <>
            <StatusMessage />
            <Menu />
            <Overlay />
        </>
    );
};