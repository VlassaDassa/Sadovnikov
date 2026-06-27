'use client';

import dynamic from 'next/dynamic';

const Menu = dynamic(() => import('@/components/shared/menu'), { ssr: false });
const Overlay = dynamic(() => import('@/components/shared/overlay'), { ssr: false });
const StatusMessage = dynamic(() => import('@/components/shared/statusMessage'), { ssr: false });


interface DynImportLayout {
    admin: boolean,
}

export const DynImportLayout: React.FC<DynImportLayout> = ({ admin }) => {
    return (
        <>
            <StatusMessage />
            {
                !admin && <Menu />
            }
            <Overlay />
        </>
    );
};