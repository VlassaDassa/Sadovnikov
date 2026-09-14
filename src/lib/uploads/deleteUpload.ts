import 'server-only'

import {
    rm,
} from 'node:fs/promises'

import path from 'node:path'

import {
    uploadConfig,
} from './config'

import {
    isManageUpload,
} from './paths'

export function resolveManagedUploadPath(
    publicUrl: string,
): string | null {
    if (!isManageUpload(publicUrl)) {
        return null
    }

    const relativePath =
        publicUrl.slice(
            uploadConfig
                .publicPrefix
                .length +
            1,
        )

    const uploadRoot =
        path.resolve(
            uploadConfig.root,
        )

    const absolutePath =
        path.resolve(
            uploadRoot,
            relativePath,
        )

    if (
        !absolutePath.startsWith(
            `${uploadRoot}${path.sep}`,
        )
    ) {
        return null
    }

    return absolutePath
}

export async function deleteManagedUpload(
    publicUrl: string,
): Promise<void> {
    const filePath =
        resolveManagedUploadPath(
            publicUrl,
        )

    if (!filePath) {
        return
    }

    await rm(
        filePath,
        {
            force: true,
        },
    )
}