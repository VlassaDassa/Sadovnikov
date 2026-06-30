// Обёртка, т.к просто Footer - клиентсккий компонент, где нельзя вызвать prisma,
// в layout тоже нельзя, потому что он должен оставаться синхронным

import React from 'react';

import Footer from '.';
import ErrorPage from '@/components/shared/ErrorPage';

import { IFooterItem } from '@/interfaces/general';
import prisma from '@/lib/prisma';



const FooterWrapper: React.FC = async () => {
    let footerItems: IFooterItem[] = []
    try {
        footerItems = await prisma.footerItem.findMany()
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return <ErrorPage error={errorMessage} />
    }

    return (
        <Footer footerItems={footerItems}  />
    )
}

export default FooterWrapper;