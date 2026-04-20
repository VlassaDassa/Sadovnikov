import type { Metadata } from "next";
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
        <html lang="ru">
            <body>
                {children}
            </body>
        </html>
    )
}