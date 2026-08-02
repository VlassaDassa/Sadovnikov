export type ClientUploadCategory =
    | 'gallery'
    | 'feature-photo'
    | 'feature-icon'

interface UploadProjectImageInput {
    file: File
    projectId: number
    category:
        ClientUploadCategory
}

interface UploadProjectImageResult {
    url: string
    width: number
    height: number
    size: number
    mimeType: string
}

export async function uploadProjectImage({
    file,
    projectId,
    category,
}: UploadProjectImageInput):
    Promise<UploadProjectImageResult> {
    const formData =
        new FormData()

    formData.set(
        'file',
        file,
    )

    formData.set(
        'projectId',
        projectId.toString(),
    )

    formData.set(
        'category',
        category,
    )

    const response =
        await fetch(
            '/api/admin/uploads/images',
            {
                method: 'POST',
                body: formData,
            },
        )

    const result =
        await response
            .json()
            .catch(() => null)

    if (!response.ok) {
        throw new Error(
            result?.error ??
            'Image upload failed',
        )
    }

    return result
}