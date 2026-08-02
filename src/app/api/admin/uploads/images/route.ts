import { NextResponse } from "next/server";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/admin";
import { saveProjectImage } from "@/lib/uploads/saveProjectImage";



export const runtime = 'nodejs'

const uploadsFieldSchema = z.object({
    projectId: z.coerce.number().int().positive(),
    category: z.enum(['gallery', 'feature-photo', 'feature-icon'])
}) 

function getErrorStatus(error: unknown): number {
    const message = error instanceof Error ? error.message : ''

    switch (message) {
        case 'UNAUTHORIZED': return 401
        case 'FILE_TOO_LARGE': return 413
        case 'EMPTY_FILE':
        case 'INVALID_PROJECT_ID':
        case 'INVALID_IMAGE_DIMENSIONS':
        case 'INVALID_GALLERY_RATIO':
        case 'INVALID_FEATURE_PHOTO_RATIO':
        case 'ANIMATED_IMAGES_NOT_ALLOWED':
            return 400
        default: return 500
    }
}


export async function POST(request: Request) {
    try {
        await requireAdmin()

        const formData = await request.formData()

        const parsed = uploadsFieldSchema.safeParse({
            projectId: formData.get('projectId'),
            category: formData.get('category')
        })
        
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: 'Invalid upload fields'
                },
                {
                    status: 400
                }
            )
        }

        const file = formData.get('file')
        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    error: 'Image file is required'
                },
                {
                    status: 400
                }
            )
        }

        const { projectId, category } = parsed.data

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            },
            select: {
                id: true
            }
        })

        if (!project) {
            return NextResponse.json(
                {
                    error: 'Project not found'
                },
                {
                    status: 404
                }
            )
        }

        const uploaded = await saveProjectImage({ projectId, category, file })
   
        return NextResponse.json(
            uploaded,
            {
                status: 201
            }
        )
    }
    catch (error) {
        console.error('Image upload failed: ', error)

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Upload failed'
            },
            {
                status: getErrorStatus(error)
            }
        )
    }

}