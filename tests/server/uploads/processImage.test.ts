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
