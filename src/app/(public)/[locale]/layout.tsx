import type {
    Metadata,
} from 'next';

import Script from 'next/script';

import {
    hasLocale,
    NextIntlClientProvider,
} from 'next-intl';

import {
    getMessages,
    setRequestLocale,
} from 'next-intl/server';

import {
    notFound,
} from 'next/navigation';

import {
    routing,
} from '@/i18n/routing';

import {
    DynImportLayout,
} from '@/components/shared/DynImportLayout';

import Header
    from '@/components/public/general/header';

import FooterWrapper
    from '@/components/public/general/footer/footerWrapper';

import GlobalLoader
    from '@/components/shared/GlobalLoader';

import NoiseBackground
    from '@/components/shared/NoizeBg';

import GlobalTooltip
    from '@/components/shared/GlobalTooltip';

import {
    Providers,
} from '@/store/Providers';

import '../../globals.scss';

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Description portfolio',
};

interface LocaleLayoutProps {
    children: React.ReactNode;

    params: Promise<{
        locale: string;
    }>;
}

export function generateStaticParams() {
    return routing.locales.map(
        (locale) => ({
            locale,
        }),
    );
}

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const {
        locale,
    } = await params;

    if (
        !hasLocale(
            routing.locales,
            locale,
        )
    ) {
        notFound();
    }

    setRequestLocale(locale);

    const messages =
        await getMessages();

    const umamiUrl =
        process.env.UMAMI_URL;

    const umamiWebsiteId =
        process.env.UMAMI_WEBSITE_ID;

    return (
        <html
            lang={locale}
            data-scroll-behavior="smooth"
        >
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Magra:wght@400;700&family=Montserrat:wght@100..900&display=swap"
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

                        <GlobalTooltip />

                        <DynImportLayout
                            admin={false}
                        />

                        <Header />

                        {children}

                        <FooterWrapper />
                    </Providers>
                </NextIntlClientProvider>

                {umamiUrl &&
                umamiWebsiteId ? (
                    <Script
                        src={`${umamiUrl}/script.js`}
                        data-website-id={
                            umamiWebsiteId
                        }
                        data-domains="vlassadassa.ru"
                        data-performance="true"
                        data-exclude-search="true"
                        strategy="afterInteractive"
                    />
                ) : null}
            </body>
        </html>
    );
}