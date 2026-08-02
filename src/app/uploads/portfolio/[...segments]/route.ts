import {
    readFile,
    stat,
} from 'node:fs/promises'

import path from 'node:path'

import {
    NextResponse,
} from 'next/server'

import {
    uploadConfig,
} from '@/lib/uploads/config'

export const runtime = 'nodejs'

interface RouteContext {
    params: Promise<{
        segments: string[]
    }>
}

function resolveRequestedFile(
    segments: string[],
): string | null {
    if (
        segments.length === 0 ||
        segments.some(
            (segment) =>
                !segment ||
                segment === '.' ||
                segment === '..' ||
                segment.includes('\\') ||
                segment.includes('\0'),
        )
    ) {
        return null
    }

    const uploadRoot =
        path.resolve(
            uploadConfig.root,
        )

    const requestedPath =
        path.resolve(
            uploadRoot,
            ...segments,
        )

    if (
        !requestedPath.startsWith(
            `${uploadRoot}${path.sep}`,
        )
    ) {
        return null
    }

    return requestedPath
}

export async function GET(
    _request: Request,
    {
        params,
    }: RouteContext,
) {
    const {
        segments,
    } = await params

    const filePath =
        resolveRequestedFile(
            segments,
        )

    if (!filePath) {
        return new NextResponse(
            null,
            {
                status: 404,
            },
        )
    }

    try {
        const fileStat =
            await stat(filePath)

        if (!fileStat.isFile()) {
            return new NextResponse(
                null,
                {
                    status: 404,
                },
            )
        }

        const file =
            await readFile(filePath)

        return new NextResponse(
            file,
            {
                status: 200,

                headers: {
                    'Content-Type':
                        'image/webp',

                    'Content-Length':
                        file.length.toString(),

                    'Cache-Control':
                        'public, max-age=31536000, immutable',

                    'X-Content-Type-Options':
                        'nosniff',
                },
            },
        )
    } catch {
        return new NextResponse(
            null,
            {
                status: 404,
            },
        )
    }
}
