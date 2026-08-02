import 'server-only'

import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

import { uploadConfig } from './config';
import { createPublicUploadUrl, getProjectUploadDirectory } from './paths';
import { processImage} from './processImage';

import type { SaveUpload, UploadCategory } from './types';
import { create } from 'node:domain';



interface SaveProjectImageInput {
    projectId: number,
    category: UploadCategory,
    file: File
}

export async function saveProjectImage({ projectId, category, file }: SaveProjectImageInput): Promise<SaveUpload> {
    if (file.size <= 0) {
        throw new Error('EMPTY_FILE')
    }

    if (file.size > uploadConfig.maxImageBytes) {
        throw new Error('FILE_TOO_LARGE')
    }

    const sourceBuffer = Buffer.from(await file.arrayBuffer())
    const processed = await processImage(sourceBuffer, category)
    const fileName = `${randomUUID()}.webp`
    const directory = getProjectUploadDirectory(projectId, category)
    await mkdir(directory, { recursive: true })
    const finalPath = path.join(directory, fileName)
    const temporaryPath = path.join(directory, `.${fileName}.tmp`)

    try {
        await writeFile(temporaryPath, processed.buffer, { flag: 'wx' })
        await rename(temporaryPath, finalPath)
    }
    catch (error) {
        await rm(temporaryPath, { force: true })
        throw error
    }

    return {
        url: createPublicUploadUrl(projectId, category, fileName),
        width: processed.width,
        height: processed.height,
        size: processed.buffer.length,
        mimeType: 'image/webp'
    }
}