import type { Metadata } from "next";

import { DynImportLayout } from '@/components/shared/DynImportLayout';
import Header from "@/components/public/general/header";
import Footer from "@/components/public/general/footer";
import GlobalLoader from "@/components/shared/GlobalLoader";
import NoiseBackground from "@/components/shared/NoizeBg";
import GlobalTooltip from "@/components/shared/GlobalTooltip";

import { Providers } from "@/store/Providers";

import './../globals.scss';


export const metaData: Metadata = {
    title: 'Portfolio',
    description: 'Description portfolio'
}

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {


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
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}