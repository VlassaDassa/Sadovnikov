import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { DynImportLayout } from '@/components/shared/DynImportLayout';
import Header from '@/components/public/general/header';
import DevelopmentNotice from '@/components/public/general/developmentNotice';
import FooterWrapper from '@/components/public/general/footer/footerWrapper';
import GlobalLoader from '@/components/shared/GlobalLoader';
import NoiseBackground from '@/components/shared/NoizeBg';
import GlobalTooltip from '@/components/shared/GlobalTooltip';
import { Providers } from '@/store/Providers';

import Script from 'next/script';
import { getOpenGraphLocale,siteConfig } from '@/lib/seo/site';
import { routing } from '@/i18n/routing';
import type { AppLocale } from '@/i18n/routing';
import { fontVariables } from '@/styles/fonts';

import '../../globals.scss';



interface LocaleParams {
    params: Promise<{locale: string}>
} 

export async function generateMetadata({params}: LocaleParams): Promise<Metadata> {
    const { locale: requestedLocale } = await params

    const locale: AppLocale = requestedLocale === 'ru' ? 'ru' : 'en'

    const t = await getTranslations({locale, namespace: 'SEO'})

    const indexingEnabled = siteConfig.indexingEnabled

    return {
        metadataBase: siteConfig.url,
        applicationName: siteConfig.name,
        title: {
            default: t('DefaultTitle'),
            template: `%s | ${siteConfig.name}`
        },
        description: t('DefaultDescription'),
        authors: [{
            name: siteConfig.name,
            url: siteConfig.url
        }],
        creator: siteConfig.name,
        publisher: siteConfig.name,
        referrer: 'origin-when-cross-origin',
        formatDetection: {
            email: false,
            address: false,
            telephone: false
        },
        robots: {
            index: indexingEnabled,
            follow: indexingEnabled,
            nocache: !indexingEnabled,

            googleBot: {
                index: indexingEnabled,
                follow: indexingEnabled,
                noimageindex: !indexingEnabled,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        },

        openGraph: {
            type: 'website',
            siteName: siteConfig.name,
            locale: getOpenGraphLocale(locale),
            alternateLocale: [
                locale === 'ru' ? 'en_US' : 'ru_RU'
            ]
        },

        twitter: {
            card: 'summary_large_image'
        },

        manifest: '/manifest.webmanifest'
    }


}



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
            className={fontVariables}
        >
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
                        <DevelopmentNotice />
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

                <Script
                    id="yandex-context"
                    src="https://yandex.ru/ads/system/context.js"
                    strategy="afterInteractive"
                />

                <Script
                    id="yandex-autoplacement"
                    src="https://yandex.ru/ads/system/ap-loader.js"
                    data-page-id="19707056"
                    strategy="afterInteractive"
                />
                
                
                <Script id="yandex-metrika" strategy="afterInteractive">
                    {`
                        (function(m,e,t,r,i,k,a){
                            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {
                                if (document.scripts[j].src === r) {
                                    return;
                                }
                            }
                            k=e.createElement(t);
                            a=e.getElementsByTagName(t)[0];
                            k.async=1;
                            k.src=r;
                            a.parentNode.insertBefore(k,a);
                        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=111323165", "ym");

                        ym(111323165, "init", {
                            ssr: true,
                            webvisor: true,
                            clickmap: true,
                            ecommerce: "dataLayer",
                            referrer: document.referrer,
                            url: location.href,
                            accurateTrackBounce: true,
                            trackLinks: true
                        });
                    `}
                </Script>

                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/111323165"
                            style={{ position: "absolute", left: "-9999px" }}
                            alt=""
                        />
                    </div>
                </noscript>
            </body>
        </html>
    );
}