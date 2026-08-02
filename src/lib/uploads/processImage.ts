import 'server-only'

import sharp from 'sharp'
import { sanitizeSvg } from './sanitizeSvg'

import type {
    UploadCategory,
} from './types'

type ProcessedMimeType =
    | 'image/webp'
    | 'image/svg+xml'

type ProcessedExtension =
    | 'webp'
    | 'svg'

interface ProcessedImage {
    buffer: Buffer
    width: number | null
    height: number | null
    extension: ProcessedExtension
    mimeType: ProcessedMimeType
}

function validateRatio(
    width: number,
    height: number,
    category: UploadCategory,
): void {
    const ratio =
        width / height

    if (
        category === 'gallery' &&
        (
            ratio < 0.8 ||
            ratio > 2
        )
    ) {
        throw new Error(
            'INVALID_GALLERY_RATIO',
        )
    }

    if (
        category ===
            'feature-photo' &&
        (
            ratio < 1.1 ||
            ratio > 1.4
        )
    ) {
        throw new Error(
            'INVALID_FEATURE_PHOTO_RATIO',
        )
    }
}

function getMaxWidth(
    category: Exclude<
        UploadCategory,
        'feature-icon'
    >,
): number {
    switch (category) {
        case 'gallery':
            return 2560

        case 'feature-photo':
            return 1920
        default: return 1920
    }
}

async function processSvgIcon(
    sourceBuffer: Buffer,
    declaredMimeType: string,
): Promise<ProcessedImage> {
    if (
        declaredMimeType !==
        'image/svg+xml'
    ) {
        throw new Error(
            'FEATURE_ICON_MUST_BE_SVG',
        )
    }

    const sanitizedBuffer =
        sanitizeSvg(sourceBuffer)

    const metadata =
        await sharp(
            sanitizedBuffer,
        ).metadata()

    if (
        metadata.format !== 'svg'
    ) {
        throw new Error(
            'INVALID_SVG',
        )
    }

    return {
        buffer:
            sanitizedBuffer,

        width:
            metadata.width ?? null,

        height:
            metadata.height ?? null,

        extension: 'svg',

        mimeType:
            'image/svg+xml',
    }
}

export async function processImage(
    sourceBuffer: Buffer,
    category: UploadCategory,
    declaredMimeType: string,
): Promise<ProcessedImage> {
    if (
        category ===
        'feature-icon'
    ) {
        return processSvgIcon(
            sourceBuffer,
            declaredMimeType,
        )
    }

    const metadata =
        await sharp(
            sourceBuffer,
            {
                limitInputPixels:
                    40_000_000,
            },
        ).metadata()

    if (
        !metadata.width ||
        !metadata.height
    ) {
        throw new Error(
            'INVALID_IMAGE_DIMENSIONS',
        )
    }

    if (
        metadata.pages &&
        metadata.pages > 1
    ) {
        throw new Error(
            'ANIMATED_IMAGES_NOT_ALLOWED',
        )
    }

    validateRatio(
        metadata.width,
        metadata.height,
        category,
    )

    const maxWidth =
        getMaxWidth(category)

    const {
        data,
        info,
    } = await sharp(
        sourceBuffer,
        {
            limitInputPixels:
                40_000_000,
        },
    )
        .rotate()
        .resize({
            width: maxWidth,
            fit: 'inside',
            withoutEnlargement: true,
            kernel:
                sharp.kernel.lanczos3,
        })
        .webp({
            quality: 96,
            alphaQuality: 100,
            smartSubsample: true,
            smartDeblock: true,
            effort: 6,
            preset: 'picture',
        })
        .toBuffer({
            resolveWithObject: true,
        })

    return {
        buffer: data,
        width: info.width,
        height: info.height,
        extension: 'webp',
        mimeType: 'image/webp',
    }
}