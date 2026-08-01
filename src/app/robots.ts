import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site";



export default function robots(): MetadataRoute.Robots {
    if (!siteConfig.indexingEnabled) {
        return {
            rules: {
                userAgent: '*',
                allow: '/'
            },

            host: siteConfig.url.origin
        }
    }

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', ],
        },

        sitemap: new URL('/sitemap.xml', siteConfig.url).toString(),
        host: siteConfig.url.origin
    }
}