import './../globals.scss';

import { redirect } from 'next/navigation';
import type { Metadata } from "next";

import { DynImportLayout } from '@/components/shared/DynImportLayout';
import Header from "@/components/admin/general/header";
import GlobalLoader from "@/components/shared/GlobalLoader";
import NoiseBackground from "@/components/shared/NoizeBg";
import GlobalTooltip from "@/components/shared/GlobalTooltip";

import { Providers } from "@/store/Providers";
import { getAdminSession } from '@/lib/auth/admin';



export const metaData: Metadata = {
    title: 'Admin',
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getAdminSession()
    if (!session) {
        redirect('/login')
    }


    return (
        <html data-scroll-behavior="smooth" lang="en">
            <head>
                <link 
                    href="https://fonts.googleapis.com/css2?family=Magra:wght@400;700&family=Montserrat:wght@100..900&display=swap" 
                    rel="stylesheet"
                />
            </head>
            <body>
                <Providers>
                    <NoiseBackground />
                    <GlobalLoader />
                    <GlobalTooltip />
                    <DynImportLayout admin={true} /> 
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    )
}