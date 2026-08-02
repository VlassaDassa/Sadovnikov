export const uploadCategories = ['gallery', 'feature-photo', 'feature-icon']

export type UploadCategory = typeof uploadCategories[number]

export interface SaveUpload {
    url: string;
    width: number;
    height: number;
    size: number;
    mimeType: 'image/webp'
}