import type { Metadata } from "next";
import { connection } from "next/server";

import Header from "@/components/public/general/header";
import FooterWrapper from "@/components/public/general/footer/footerWrapper";
import GlobalLoader from "@/components/shared/GlobalLoader";
import NoiseBackground from "@/components/shared/NoizeBg";

import { Providers } from "@/store/Providers";

import './../globals.scss';


export const metaData: Metadata = {
    title: 'Login',
    description: 'Description portfolio'
}

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await connection();

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
                    <Header />
                    {children}
                    <FooterWrapper />
                </Providers>
            </body>
        </html>
    )
}