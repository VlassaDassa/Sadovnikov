import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    mkdir: vi.fn(),
    rename: vi.fn(),
    rm: vi.fn(),
    writeFile: vi.fn(),
    randomUUID: vi.fn(),
    processImage: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
    mkdir: mocks.mkdir,
    rename: mocks.rename,
    rm: mocks.rm,
    writeFile: mocks.writeFile,
}));

vi.mock("node:crypto", () => ({
    randomUUID: mocks.randomUUID,
}));

vi.mock("@/lib/uploads/config", () => ({
    uploadConfig: {
        root: path.resolve("/tmp/uploads"),
        publicPrefix: "/uploads/portfolio",
        maxImageBytes: 10,
    },
}));

vi.mock("@/lib/uploads/processImage", () => ({
    processImage: mocks.processImage,
}));

import { saveProjectImage } from "@/lib/uploads/saveProjectImage";

function makeFile(bytes: Uint8Array<ArrayBuffer>, type = "image/png"): File {
    return new File([bytes], "image.png", {
        type,
    });
}

describe("saveProjectImage", () => {
    beforeEach(() => {
        mocks.mkdir.mockResolvedValue(undefined);
        mocks.rename.mockResolvedValue(undefined);
        mocks.rm.mockResolvedValue(undefined);
        mocks.writeFile.mockResolvedValue(undefined);
        mocks.randomUUID.mockReturnValue("fixed-id");
        mocks.processImage.mockResolvedValue({
            buffer: Buffer.from("webp"),
            width: 100,
            height: 80,
            extension: "webp",
            mimeType: "image/webp",
        });
    });

    it("rejects an empty file", async () => {
        await expect(
            saveProjectImage({
                projectId: 1,
                category: "gallery",
                file: makeFile(new Uint8Array()),
            }),
        ).rejects.toThrow("EMPTY_FILE");
    });

    it("rejects a file above the limit", async () => {
        await expect(
            saveProjectImage({
                projectId: 1,
                category: "gallery",
                file: makeFile(new Uint8Array(11)),
            }),
        ).rejects.toThrow("FILE_TOO_LARGE");
    });

    it("accepts a file exactly at the limit", async () => {
        const result = await saveProjectImage({
            projectId: 1,
            category: "gallery",
            file: makeFile(new Uint8Array(10)),
        });

        expect(result).toEqual({
            url: "/uploads/portfolio/projects/1/gallery/fixed-id.webp",
            width: 100,
            height: 80,
            size: 4,
            mimeType: "image/webp",
        });
    });

    it("writes a temporary file and renames it", async () => {
        await saveProjectImage({
            projectId: 1,
            category: "gallery",
            file: makeFile(new Uint8Array(5)),
        });

        const directory = path.resolve("/tmp/uploads/projects/1/gallery");

        expect(mocks.mkdir).toHaveBeenCalledWith(directory, {
            recursive: true,
        });
        expect(mocks.writeFile).toHaveBeenCalledWith(
            path.join(directory, ".fixed-id.webp.tmp"),
            Buffer.from("webp"),
            {
                flag: "wx",
            },
        );
        expect(mocks.rename).toHaveBeenCalledWith(
            path.join(directory, ".fixed-id.webp.tmp"),
            path.join(directory, "fixed-id.webp"),
        );
    });

    it("removes the temporary file after failure", async () => {
        mocks.rename.mockRejectedValue(new Error("rename failed"));

        await expect(
            saveProjectImage({
                projectId: 1,
                category: "gallery",
                file: makeFile(new Uint8Array(5)),
            }),
        ).rejects.toThrow("rename failed");

        expect(mocks.rm).toHaveBeenCalledWith(
            path.resolve("/tmp/uploads/projects/1/gallery/.fixed-id.webp.tmp"),
            {
                force: true,
            },
        );
    });
});
