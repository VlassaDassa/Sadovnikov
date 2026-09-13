import { afterEach, describe, expect, it, vi } from 'vitest';
import { prepareDescriptionImage } from './descriptionImageUpload';
import { uploadProjectImage } from './uploads/uploadProjectImage';

afterEach(() => vi.unstubAllGlobals());

describe('description image preparation', () => {
    it('resizes oversized screenshots before transfer and releases the decoded bitmap', async () => {
        const close = vi.fn();
        const bitmap = { width: 3840, height: 2160, close };
        vi.stubGlobal('createImageBitmap', vi.fn().mockResolvedValue(bitmap));
        const drawImage = vi.fn();
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage } as unknown as CanvasRenderingContext2D);
        vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback) => {
            callback(new Blob(['compressed'], { type: 'image/webp' }));
        });
        const file = new File([new Uint8Array(1024)], 'clipboard.jpg', { type: 'image/jpeg' });

        const result = await prepareDescriptionImage(file);

        expect(drawImage).toHaveBeenCalledWith(bitmap, 0, 0, 1920, 1080);
        expect(result.type).toBe('image/webp');
        expect(result.name).toBe('clipboard.webp');
        expect(result.size).toBeLessThan(file.size);
        expect(close).toHaveBeenCalledOnce();
    });

    it('preserves small suitable images', async () => {
        const close = vi.fn();
        vi.stubGlobal('createImageBitmap', vi.fn().mockResolvedValue({ width: 640, height: 480, close }));
        const file = new File(['small'], 'photo.jpg', { type: 'image/jpeg' });
        expect(await prepareDescriptionImage(file)).toBe(file);
        expect(close).toHaveBeenCalledOnce();
    });

    it.each(['image/gif', 'image/webp', 'image/avif'])('does not flatten potentially animated %s files', async (type) => {
        const decode = vi.fn();
        vi.stubGlobal('createImageBitmap', decode);
        const file = new File(['image'], 'animated', { type });
        expect(await prepareDescriptionImage(file)).toBe(file);
        expect(decode).not.toHaveBeenCalled();
    });

    it('does not flatten APNG files', async () => {
        const file = new File(['image'], 'animated.png', { type: 'image/png' });
        const bytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0, 97, 99, 84, 76, 0, 0, 0, 0]);
        Object.defineProperty(file, 'arrayBuffer', { value: async () => bytes.buffer });
        const decode = vi.fn();
        vi.stubGlobal('createImageBitmap', decode);
        expect(await prepareDescriptionImage(file)).toBe(file);
        expect(decode).not.toHaveBeenCalled();
    });

    it('honors cancellation before decoding', async () => {
        const controller = new AbortController();
        controller.abort();
        await expect(prepareDescriptionImage(new File(['image'], 'file.jpg', { type: 'image/jpeg' }), controller.signal))
            .rejects.toMatchObject({ name: 'AbortError' });
    });

    it('rejects unsupported or oversized files', async () => {
        await expect(prepareDescriptionImage(new File(['<svg/>'], 'file.svg', { type: 'image/svg+xml' })))
            .rejects.toThrow('UNSUPPORTED_IMAGE_TYPE');
        const file = new File(['image'], 'file.webp', { type: 'image/webp' });
        Object.defineProperty(file, 'size', { value: 9 * 1024 * 1024 });
        await expect(prepareDescriptionImage(file)).rejects.toThrow('FILE_TOO_LARGE');
    });

    it('passes upload cancellation and the dedicated category to the API', async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ url: '/uploads/image.webp' }) });
        vi.stubGlobal('fetch', fetchMock);
        const controller = new AbortController();
        await uploadProjectImage({
            file: new File(['image'], 'photo.jpg', { type: 'image/jpeg' }),
            projectId: 7,
            category: 'description-image',
            signal: controller.signal,
        });
        const options = fetchMock.mock.calls[0][1];
        expect(options.signal).toBe(controller.signal);
        expect(options.body.get('category')).toBe('description-image');
    });
});
