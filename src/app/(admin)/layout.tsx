import './../globals.scss';

import { redirect } from 'next/navigation';
import type { Metadata } from "next";
import { connection } from "next/server";

import { DynImportLayout } from '@/components/shared/DynImportLayout';
import Header from "@/components/admin/general/header";
import GlobalLoader from "@/components/shared/GlobalLoader";
import NoiseBackground from "@/components/shared/NoizeBg";
import GlobalTooltip from "@/components/shared/GlobalTooltip";

import { Providers } from "@/store/Providers";
import { getAdminSession } from '@/lib/auth/admin';

import { fontVariables } from '@/styles/fonts';




export const metadata: Metadata = {
    title: 'Admin',

    robots: {
        index: false,
        follow: false,
        nocache: true,

        googleBot: {
            index: false,
            follow: false,
            noimageindex: true
        }
    }
}


export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    await connection();

    const session = await getAdminSession()
    if (!session) {
        redirect('/login')
    }

    return (
        <html data-scroll-behavior="smooth" lang="en" className={fontVariables}>
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