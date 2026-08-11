import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

const rmMock = vi.hoisted(() => vi.fn());

vi.mock("node:fs/promises", () => ({
    rm: rmMock,
}));

vi.mock("@/lib/uploads/config", () => ({
    uploadConfig: {
        root: path.resolve("/tmp/uploads"),
        publicPrefix: "/uploads/portfolio",
        maxImageBytes: 1024,
    },
}));

import {
    deleteManagedUpload,
    resolveManagedUploadPath,
} from "@/lib/uploads/deleteUpload";

describe("managed upload deletion", () => {
    beforeEach(() => {
        rmMock.mockResolvedValue(undefined);
    });

    it("resolves a managed upload", () => {
        expect(
            resolveManagedUploadPath(
                "/uploads/portfolio/projects/7/gallery/image.webp",
            ),
        ).toBe(path.resolve("/tmp/uploads/projects/7/gallery/image.webp"));
    });

    it.each([
        "https://example.com/image.webp",
        "/static/image.webp",
        "/uploads/portfolio/../secret.txt",
        "/uploads/portfolio/projects/7/gallery/../../../../secret.txt",
    ])("rejects unsafe value %s", (value) => {
        expect(resolveManagedUploadPath(value)).toBeNull();
    });

    it("removes a valid managed file", async () => {
        await deleteManagedUpload(
            "/uploads/portfolio/projects/7/gallery/image.webp",
        );

        expect(rmMock).toHaveBeenCalledWith(
            path.resolve("/tmp/uploads/projects/7/gallery/image.webp"),
            {
                force: true,
            },
        );
    });

    it("does not remove an unmanaged file", async () => {
        await deleteManagedUpload("/static/image.webp");

        expect(rmMock).not.toHaveBeenCalled();
    });
});
