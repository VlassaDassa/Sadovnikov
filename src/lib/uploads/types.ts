export const uploadCategories = ['gallery', 'feature-photo', 'feature-icon']

export type UploadCategory = typeof uploadCategories[number]

export interface SavedUpload {
    url: string
    width: number | null
    height: number | null
    size: number

    mimeType:
        | 'image/webp'
        | 'image/svg+xml'
}