import type { Metadata } from "next";
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
                    {children}
                </Providers>
            </body>
        </html>
    )
}