import type { MetadataRoute } from "next";

import prisma from "@/lib/prisma";
import { getAbsoluteUrl, getLanguageAlternates, siteConfig } from "@/lib/seo/site";



export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    if (!siteConfig.indexingEnabled) return []

    const projects = await prisma.project.findMany({
        select: {
            id: true,
            updatedAt: true
        },

        orderBy: {
            id: 'asc'
        }
    })

    const homePages: MetadataRoute.Sitemap = [
        {
            url: getAbsoluteUrl('/', 'en'),
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: getLanguageAlternates('/')
            }
        },
        {
            url: getAbsoluteUrl('/', 'ru'),
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: getLanguageAlternates('/')
            }
        },
    ]


    const projectPages = projects.flatMap((project) => {
        const path = `/project/${project.id}`

        return [
            {
                url: getAbsoluteUrl(path, 'en'),
                lastModified: project.updatedAt,
                changeFrequency: 'monthly' as const,
                priority: 0.8,
                alternates: {
                    languages: getLanguageAlternates(path)
                }
            },
            {
                url: getAbsoluteUrl(path, 'ru'),
                lastModified: project.updatedAt,
                changeFrequency: 'monthly' as const,
                priority: 0.8,
                alternates: {
                    languages: getLanguageAlternates(path)
                }
            }
        ]
    })

    return [
        ...homePages, ...projectPages
    ]
}
