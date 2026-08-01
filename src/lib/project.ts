import { notFound } from 'next/navigation'
import { cache } from 'react'

import prisma from '@/lib/prisma'


export const getProjectById = cache(async (projectId: number) => {
    return prisma.project.findUnique({
        where: {
            id: projectId
        },

        include: {
            images: true,
            stack: true,
            description: true,
            metrics: true,
            commits: {
                orderBy: [
                    {
                        order: 'asc',
                    },
                    {
                        id: 'asc'
                    }
                ]
            },
            keyFeatures: true
        }
    }) 
})






export function parseEntityId(value: string): number {
    if (!/^\d+$/.test(value)) {
        notFound()
    }

    const id = Number(value)

    if (!Number.isSafeInteger(id) || id < 1) {
        notFound()
    }

    return id
}