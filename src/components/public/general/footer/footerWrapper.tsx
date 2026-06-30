// Обёртка, т.к просто Footer - клиентсккий компонент, где нельзя вызвать prisma,
// в layout тоже нельзя, потому что он должен оставаться синхронным

import React from 'react';

import Footer from '.';

import prisma from '@/lib/prisma';



const FooterWrapper: React.FC = async () => {
    const footerItems = await prisma.footerItem.findMany()

    return (
        <Footer footerItems={footerItems}  />
    )
}

export default FooterWrapper;