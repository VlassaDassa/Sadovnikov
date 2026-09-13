export const DESCRIPTION_IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,image/avif';

const MAX_SOURCE_BYTES = 24 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1920;
const SMALL_IMAGE_BYTES = 768 * 1024;
const SUPPORTED_TYPES = new Set(DESCRIPTION_IMAGE_ACCEPT.split(','));

function checkAbort(signal?: AbortSignal): void {
    if (signal?.aborted) {
        throw new DOMException('Image upload cancelled', 'AbortError');
    }
}

function checkUploadSize(file: File): File {
    if (file.size > MAX_UPLOAD_BYTES) throw new Error('FILE_TOO_LARGE');
    return file;
}

async function isStaticPng(file: File): Promise<boolean> {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const signature = [137, 80, 78, 71, 13, 10, 26, 10];
    if (!signature.every((value, index) => bytes[index] === value)) return false;

    const view = new DataView(bytes.buffer);
    for (let offset = 8; offset + 12 <= bytes.length;) {
        const length = view.getUint32(offset);
        if (offset + length + 12 > bytes.length) return false;
        const type = String.fromCharCode(...bytes.subarray(offset + 4, offset + 8));
        if (type === 'acTL') return false;
        // APNG's animation control chunk must precede the first image data chunk.
        if (type === 'IDAT') return true;
        offset += length + 12;
    }
    return false;
}

function encodeCanvas(canvas: HTMLCanvasElement, signal?: AbortSignal): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const onAbort = () => reject(new DOMException('Image upload cancelled', 'AbortError'));
        signal?.addEventListener('abort', onAbort, { once: true });
        if (signal?.aborted) {
            signal.removeEventListener('abort', onAbort);
            onAbort();
            return;
        }

        try {
            canvas.toBlob((blob) => {
                signal?.removeEventListener('abort', onAbort);
                if (signal?.aborted) return;
                if (blob) resolve(blob);
                else reject(new Error('INVALID_IMAGE_DATA'));
            }, 'image/webp', 0.86);
        } catch (error) {
            signal?.removeEventListener('abort', onAbort);
            reject(error);
        }
    });
}

/** Shrink large pasted screenshots before transfer, without flattening animations. */
export async function prepareDescriptionImage(file: File, signal?: AbortSignal): Promise<File> {
    checkAbort(signal);
    if (!SUPPORTED_TYPES.has(file.type)) throw new Error('UNSUPPORTED_IMAGE_TYPE');
    if (file.size === 0) throw new Error('EMPTY_FILE');
    if (file.size > MAX_SOURCE_BYTES) throw new Error('FILE_TOO_LARGE');

    // Other formats may be animated. Send them intact so server validation still applies.
    const mayOptimize = file.type === 'image/jpeg' || (file.type === 'image/png' && await isStaticPng(file));
    checkAbort(signal);
    if (!mayOptimize || typeof createImageBitmap !== 'function') return checkUploadSize(file);

    let bitmap: ImageBitmap;
    try {
        bitmap = await createImageBitmap(file);
    } catch {
        checkAbort(signal);
        // The server can decode formats unsupported by an older browser.
        return checkUploadSize(file);
    }

    try {
        checkAbort(signal);
        if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40_000_000) {
            throw new Error('INVALID_IMAGE_DIMENSIONS');
        }
        const scale = Math.min(1, MAX_IMAGE_EDGE / bitmap.width, MAX_IMAGE_EDGE / bitmap.height);
        if (scale === 1 && file.size <= SMALL_IMAGE_BYTES) return checkUploadSize(file);

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        canvas.height = Math.max(1, Math.round(bitmap.height * scale));
        const context = canvas.getContext('2d');
        if (!context) return checkUploadSize(file);
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        const blob = await encodeCanvas(canvas, signal);
        checkAbort(signal);
        if (scale === 1 && blob.size >= file.size) return checkUploadSize(file);

        const extension = blob.type === 'image/webp' ? 'webp' : 'png';
        const name = file.name.replace(/\.[^.]+$/, '') || 'description-image';
        return checkUploadSize(new File([blob], `${name}.${extension}`, {
            type: blob.type,
            lastModified: file.lastModified,
        }));
    } finally {
        bitmap.close();
    }
}
