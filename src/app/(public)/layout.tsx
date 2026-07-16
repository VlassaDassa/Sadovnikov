import type { Metadata } from "next";
import { connection } from "next/server";
import Script from 'next/script';

import { DynImportLayout } from '@/components/shared/DynImportLayout';
import Header from "@/components/public/general/header";
import FooterWrapper from "@/components/public/general/footer/footerWrapper";
import GlobalLoader from "@/components/shared/GlobalLoader";
import NoiseBackground from "@/components/shared/NoizeBg";
import GlobalTooltip from "@/components/shared/GlobalTooltip";

import { Providers } from "@/store/Providers";

import './../globals.scss';


export const metaData: Metadata = {
    title: 'Portfolio',
    description: 'Description portfolio'
}

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await connection();
    const umamiUrl = process.env.UMAMI_URL;
    const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID;



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
                    <DynImportLayout admin={false} />
                    <Header />
                    {children}
                    <FooterWrapper />
                </Providers>


                {
                    umamiUrl && umamiWebsiteId ? (
                        <Script
                            src={`${umamiUrl}/scripts.js`}
                            data-website-id={umamiWebsiteId}
                            data-domains='vlassadassa.ru'
                            data-performance='true'
                            data-exclude-search='true'
                            strategy='afterInteractive'
                        />
                    ) : null
                }
            </body>
        </html>
    )
}