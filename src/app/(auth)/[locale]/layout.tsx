import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import {
    getLocale,
    getMessages,
} from 'next-intl/server'

import Header from '@/components/public/general/header'
import FooterWrapper from '@/components/public/general/footer/footerWrapper'
import GlobalLoader from '@/components/shared/GlobalLoader'
import NoiseBackground from '@/components/shared/NoizeBg'

import { Providers } from '@/store/Providers'

import './../../globals.scss'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Description portfolio',
}

interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({
    children,
}: AuthLayoutProps) {
    const locale = await getLocale()
    const messages = await getMessages()

    return (
        <html
            data-scroll-behavior="smooth"
            lang={locale}
        >
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&family=Montserrat:wght@100..900&display=swap"
                    rel="stylesheet"
                />
            </head>

            <body>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                >
                    <Providers>
                        <NoiseBackground />
                        <GlobalLoader />
                        <Header />
                        {children}
                        <FooterWrapper />
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}