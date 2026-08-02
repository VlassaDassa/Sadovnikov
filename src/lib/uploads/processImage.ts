import 'server-only'

import sharp from 'sharp'

import type {
    UploadCategory,
} from './types'

interface ProcessedImage {
    buffer: Buffer
    width: number
    height: number
}

function validateRatio(
    width: number,
    height: number,
    category: UploadCategory,
): void {
    const ratio = width / height

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
        category === 'feature-photo' &&
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
    category: UploadCategory,
): number {
    switch (category) {
        case 'gallery':
            return 2560

        case 'feature-photo':
            return 1920

        case 'feature-icon':
            return 512

        default: {
            throw new Error(
                `Unknown category: ${category}`,
            )
        }
    }
}

export async function processImage(
    sourceBuffer: Buffer,
    category: UploadCategory,
): Promise<ProcessedImage> {
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

            // Стандартный качественный
            // алгоритм уменьшения.
            kernel: sharp.kernel.lanczos3,
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

    console.log(
        'Processed image:',
        {
            category,

            input: {
                width:
                    metadata.width,
                height:
                    metadata.height,
                bytes:
                    sourceBuffer.length,
            },

            output: {
                width: info.width,
                height: info.height,
                bytes: data.length,
                format:
                    info.format,
            },
        },
    )

    return {
        buffer: data,
        width: info.width,
        height: info.height,
    }
}