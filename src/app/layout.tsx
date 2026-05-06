import type { Metadata } from "next";

import { DynImportLayout } from '@/components/general/DynImportLayout';
import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import GlobalLoader from "@/components/general/GlobalLoader";
import NoiseBackground from "@/components/general/NoizeBg";
import GlobalTooltip from "@/components/general/GlobalTooltip";

import { Providers } from "@/store/Providers";

import './globals.scss';


export const metaData: Metadata = {
    title: 'Portfolio',
    description: 'Description portfolio'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <html lang="en">
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
                    <DynImportLayout />  {/* <- menu, overlay, statusMessage */}
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}