import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    readFile: vi.fn(),
    stat: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
    readFile: mocks.readFile,
    stat: mocks.stat,
}));

vi.mock("@/lib/uploads/config", () => ({
    uploadConfig: {
        root: path.resolve("/tmp/uploads"),
        publicPrefix: "/uploads/portfolio",
        maxImageBytes: 1024,
    },
}));

import { GET } from "@/app/uploads/portfolio/[...segments]/route";

function callGet(segments: string[]): Promise<Response> {
    return GET(new Request("http://localhost/uploads/portfolio/test"), {
        params: Promise.resolve({
            segments,
        }),
    });
}

describe("GET managed upload", () => {
    beforeEach(() => {
        mocks.stat.mockResolvedValue({
            isFile: () => true,
        });
        mocks.readFile.mockResolvedValue(Buffer.from("file-data"));
    });

    it.each([
        [[]],
        [[""]],
        [["."]],
        [[".."]],
        [["folder\\file.webp"]],
        [["folder\0file.webp"]],
    ])("returns 404 for invalid segments", async (segments) => {
        const response = await callGet(segments);

        expect(response.status).toBe(404);
        expect(mocks.stat).not.toHaveBeenCalled();
    });

    it("serves a WebP file", async () => {
        const response = await callGet([
            "projects",
            "1",
            "gallery",
            "image.webp",
        ]);

        expect(response.status).toBe(200);
        expect(response.headers.get("content-type")).toBe("image/webp");
        expect(response.headers.get("content-length")).toBe("9");
        expect(response.headers.get("cache-control")).toBe(
            "public, max-age=31536000, immutable",
        );
        expect(response.headers.get("x-content-type-options")).toBe("nosniff");
        expect(response.headers.get("content-security-policy")).toContain(
            "sandbox",
        );
        expect(Buffer.from(await response.arrayBuffer()).toString()).toBe(
            "file-data",
        );
    });

    it("serves an SVG with the correct type", async () => {
        const response = await callGet([
            "projects",
            "1",
            "features",
            "icons",
            "icon.svg",
        ]);

        expect(response.headers.get("content-type")).toBe(
            "image/svg+xml; charset=utf-8",
        );
    });

    it("uses the binary type for an unknown extension", async () => {
        const response = await callGet([
            "projects",
            "1",
            "gallery",
            "file.bin",
        ]);

        expect(response.headers.get("content-type")).toBe(
            "application/octet-stream",
        );
    });

    it("returns 404 for a directory", async () => {
        mocks.stat.mockResolvedValue({
            isFile: () => false,
        });

        const response = await callGet(["projects"]);

        expect(response.status).toBe(404);
        expect(mocks.readFile).not.toHaveBeenCalled();
    });

    it("returns 404 when the file cannot be read", async () => {
        mocks.stat.mockRejectedValue(new Error("missing"));

        const response = await callGet([
            "projects",
            "1",
            "gallery",
            "missing.webp",
        ]);

        expect(response.status).toBe(404);
    });
});
