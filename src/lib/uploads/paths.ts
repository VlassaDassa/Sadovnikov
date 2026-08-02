import 'server-only';

import path from 'node:path'

import { uploadConfig } from './config';
import type { UploadCategory } from './types';



function assertProjectId(projectId: number): void {
    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        throw new Error('INVALID_PROJECT_ID')
    }
}

export function getCategoryDirectory(category: UploadCategory): string {
    switch (category) {
        case 'gallery': return 'gallery'
        case 'feature-photo': return path.join('features', 'photos')
        case 'feature-icon': return path.join('features', 'icons')
        default: throw new Error(`Unknown upload category: ${category}`)
    }
}

export function getProjectUploadDirectory(projectId: number, category: UploadCategory): string {
    assertProjectId(projectId)

    return path.join(
        uploadConfig.root,
        'projects',
        projectId.toString(),
        getCategoryDirectory(category)
    )
}

export function createPublicUploadUrl(projectId: number, category: UploadCategory, fileName: string): string {
    assertProjectId(projectId)

    const categoryPath = getCategoryDirectory(category).split(path.sep).join('/')

    return [
        uploadConfig.publicPrefix,
        'projects',
        projectId.toString(),
        categoryPath,
        fileName
    ].join('/')
}

export function isManageUpload(value: | string | null | undefined): value is string {
    return Boolean(value?.startsWith(`${uploadConfig.publicPrefix}/`))
}

export function isProjectManageUpload(value: string, projectId: number): boolean {
    return value.startsWith([
        uploadConfig.publicPrefix,
        'projects',
        projectId.toString(),
        ''
    ].join('/'))
}






