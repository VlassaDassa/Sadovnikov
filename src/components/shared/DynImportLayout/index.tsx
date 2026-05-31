'use client';

import dynamic from 'next/dynamic';

const EditSkillsModal = dynamic(() => import('@/components/admin/modals/editSkillsModal'), { ssr: false });
const Menu = dynamic(() => import('@/components/shared/menu'), { ssr: false });
const Overlay = dynamic(() => import('@/components/shared/overlay'), { ssr: false });
const StatusMessage = dynamic(() => import('@/components/shared/statusMessage'), { ssr: false });


export const DynImportLayout = () => {
    return (
        <>
            <StatusMessage />
            <Menu />
            <Overlay />
        </>
    );
};