import type { Metadata } from "next";

import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import Menu from "@/components/general/menu";
import Overlay from "@/components/general/overlay";

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
            <body>
                <Providers>
                    <Header />
                    <Menu />
                    <Overlay />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}