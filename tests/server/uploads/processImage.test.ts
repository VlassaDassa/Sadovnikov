import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { processImage } from "@/lib/uploads/processImage";

async function createPng(width: number, height: number): Promise<Buffer> {
    return sharp({
        create: {
            width,
            height,
            channels: 4,
            background: {
                r: 40,
                g: 80,
                b: 120,
                alpha: 1,
            },
        },
    })
        .png()
        .toBuffer();
}

describe("processImage", () => {
    it.each([[400, 1200], [3000, 500]])("accepts description images of any ratio: %s by %s", async (width, height) => {
        const input = await createPng(width, height);
        const result = await processImage(input, 'description-image', 'image/png');
        expect(result.width).toBe(Math.min(width, 1920));
        expect(result.height).toBe(Math.round(height * Math.min(1, 1920 / width)));
        expect(result.mimeType).toBe('image/webp');
    });

    it('rejects SVGs disguised as description photos', async () => {
        const input = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"/>');
        await expect(processImage(input, 'description-image', 'image/png')).rejects.toThrow('UNSUPPORTED_IMAGE_TYPE');
        await expect(processImage(input, 'description-image', 'image/svg+xml')).rejects.toThrow('UNSUPPORTED_IMAGE_TYPE');
    });

    it('keeps animated description image validation on the server', async () => {
        const frame = await createPng(20, 20);
        const input = await sharp([frame, frame], { join: { animated: true } })
            .gif({ keepDuplicateFrames: true })
            .toBuffer();
        await expect(processImage(input, 'description-image', 'image/gif')).rejects.toThrow('ANIMATED_IMAGES_NOT_ALLOWED');
    });

    it('rejects invalid description image data with a usable upload error', async () => {
        await expect(processImage(Buffer.from('invalid'), 'description-image', 'image/png')).rejects.toThrow('INVALID_IMAGE_DATA');
    });

    it("converts a gallery image to WebP", async () => {
        const input = await createPng(1600, 1000);

        const result = await processImage(input, "gallery", "image/png");

        expect(result.extension).toBe("webp");
        expect(result.mimeType).toBe("image/webp");
        expect(result.width).toBe(1600);
        expect(result.height).toBe(1000);

        const metadata = await sharp(result.buffer).metadata();

        expect(metadata.format).toBe("webp");
    });

    it("does not enlarge a small image", async () => {
        const input = await createPng(800, 500);

        const result = await processImage(input, "gallery", "image/png");

        expect(result.width).toBe(800);
        expect(result.height).toBe(500);
    });

    it("reduces a wide gallery image", async () => {
        const input = await createPng(3000, 1500);

        const result = await processImage(input, "gallery", "image/png");

        expect(result.width).toBe(2560);
        expect(result.height).toBe(1280);
    });

    it.each([
        [799, 1000],
        [2001, 1000],
    ])("rejects invalid gallery ratio %s by %s", async (width, height) => {
        const input = await createPng(width, height);

        await expect(
            processImage(input, "gallery", "image/png"),
        ).rejects.toThrow("INVALID_GALLERY_RATIO");
    });

    it.each([
        [1099, 1000],
        [1401, 1000],
    ])("rejects invalid feature ratio %s by %s", async (width, height) => {
        const input = await createPng(width, height);

        await expect(
            processImage(input, "feature-photo", "image/png"),
        ).rejects.toThrow("INVALID_FEATURE_PHOTO_RATIO");
    });

    it("accepts a safe SVG icon", async () => {
        const source = Buffer.from(
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30"><path d="M0 0h20v30H0z"/></svg>',
        );

        const result = await processImage(
            source,
            "feature-icon",
            "image/svg+xml",
        );

        expect(result.extension).toBe("svg");
        expect(result.mimeType).toBe("image/svg+xml");
        expect(result.width).toBe(20);
        expect(result.height).toBe(30);
    });

    it("rejects a non-SVG feature icon", async () => {
        const input = await createPng(20, 20);

        await expect(
            processImage(input, "feature-icon", "image/png"),
        ).rejects.toThrow("FEATURE_ICON_MUST_BE_SVG");
    });

    it("rejects invalid image bytes", async () => {
        await expect(
            processImage(Buffer.from("not an image"), "gallery", "image/png"),
        ).rejects.toBeDefined();
    });
});
