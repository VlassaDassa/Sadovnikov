import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const originalEnvironment = {
    NODE_ENV: process.env.NODE_ENV,
    UPLOAD_ROOT: process.env.UPLOAD_ROOT,
    UPLOAD_PUBLIC_PREFIX: process.env.UPLOAD_PUBLIC_PREFIX,
    UPLOAD_MAX_IMAGE_BYTES: process.env.UPLOAD_MAX_IMAGE_BYTES,
    UPLOAD_MAX_IMGE_BYTES: process.env.UPLOAD_MAX_IMGE_BYTES,
};

async function loadConfig() {
    vi.resetModules();

    return import("@/lib/uploads/config");
}

describe("uploadConfig", () => {
    afterEach(() => {
        for (const [key, value] of Object.entries(originalEnvironment)) {
            if (value === undefined) {
                delete process.env[key];
            } else {
                process.env[key] = value;
            }
        }

        vi.resetModules();
    });

    it("uses the documented size variable", async () => {
        process.env.UPLOAD_MAX_IMAGE_BYTES = "12345";
        delete process.env.UPLOAD_MAX_IMGE_BYTES;

        const { uploadConfig } = await loadConfig();

        expect(uploadConfig.maxImageBytes).toBe(12345);
    });

    it("uses the fallback for a missing size", async () => {
        delete process.env.UPLOAD_MAX_IMAGE_BYTES;
        delete process.env.UPLOAD_MAX_IMGE_BYTES;

        const { uploadConfig } = await loadConfig();

        expect(uploadConfig.maxImageBytes).toBe(8 * 1024 * 1024);
    });

    it("uses the fallback for invalid size text", async () => {
        process.env.UPLOAD_MAX_IMAGE_BYTES = "invalid";

        const { uploadConfig } = await loadConfig();

        expect(uploadConfig.maxImageBytes).toBe(8 * 1024 * 1024);
    });

    it("normalizes the root and prefix", async () => {
        process.env.UPLOAD_ROOT = "./custom-upload-root";
        process.env.UPLOAD_PUBLIC_PREFIX = "/files///";
        process.env.UPLOAD_MAX_IMAGE_BYTES = "1024";

        const { uploadConfig } = await loadConfig();

        expect(uploadConfig.root).toBe(path.resolve("./custom-upload-root"));
        expect(uploadConfig.publicPrefix).toBe("/files");
    });
});
