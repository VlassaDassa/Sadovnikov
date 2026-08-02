import 'server-only'

import path from 'node:path'



const defaultUploadRoot = process.env.NODE_ENV === 'production' ? '/app/uploads' : path.join(process.cwd(), '.uploads', 'portfolio')

const configuredPrefix = process.env.UPLOAD_PUBLIC_PREFIX ?? '/uploads/portfolio'

export const uploadConfig = {
    root: path.resolve(process.env.UPLOAD_ROOT ?? defaultUploadRoot),
    publicPrefix: configuredPrefix.replace(/\/+$/, '',),
    maxImageBytes: Number(process.env.UPLOAD_MAX_IMGE_BYTES) ?? 8 * 1024 * 1024
}