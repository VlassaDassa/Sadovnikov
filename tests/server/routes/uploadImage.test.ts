import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    requireAdmin: vi.fn(),
    findUnique: vi.fn(),
    saveProjectImage: vi.fn(),
}));

vi.mock("@/lib/auth/admin", () => ({
    requireAdmin: mocks.requireAdmin,
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        project: {
            findUnique: mocks.findUnique,
        },
    },
}));

vi.mock("@/lib/uploads/saveProjectImage", () => ({
    saveProjectImage: mocks.saveProjectImage,
}));

import { POST } from "@/app/api/admin/uploads/images/route";

function makeRequest(
    values: {
        projectId?: string;
        category?: string;
        file?: File;
    } = {},
): Request {
    const formData = new FormData();

    if (values.projectId !== undefined) {
        formData.set("projectId", values.projectId);
    }

    if (values.category !== undefined) {
        formData.set("category", values.category);
    }

    if (values.file !== undefined) {
        formData.set("file", values.file);
    }

    return new Request("http://localhost/api/admin/uploads/images", {
        method: "POST",
        body: formData,
    });
}

function makeFile(): File {
    return new File([new Uint8Array([1, 2, 3])], "image.png", {
        type: "image/png",
    });
}

describe("POST image upload", () => {
    beforeEach(() => {
        mocks.requireAdmin.mockResolvedValue({
            user: {
                id: "admin",
                role: "ADMIN",
            },
        });
        mocks.findUnique.mockResolvedValue({
            id: 1,
        });
        mocks.saveProjectImage.mockResolvedValue({
            url: "/uploads/portfolio/projects/1/gallery/file.webp",
            width: 100,
            height: 80,
            size: 10,
            mimeType: "image/webp",
        });

        vi.spyOn(console, "error").mockImplementation(() => undefined);
    });

    it("returns 401 without an admin session", async () => {
        mocks.requireAdmin.mockRejectedValue(new Error("UNAUTHORIZED"));

        const response = await POST(makeRequest());

        expect(response.status).toBe(401);
    });

    it.each([
        {
            projectId: undefined,
            category: "gallery",
        },
        {
            projectId: "0",
            category: "gallery",
        },
        {
            projectId: "text",
            category: "gallery",
        },
        {
            projectId: "1",
            category: "unknown",
        },
    ])("returns 400 for invalid fields", async (values) => {
        const response = await POST(
            makeRequest({
                ...values,
                file: makeFile(),
            }),
        );

        expect(response.status).toBe(400);
        expect(mocks.findUnique).not.toHaveBeenCalled();
    });

    it("returns 400 without a file", async () => {
        const response = await POST(
            makeRequest({
                projectId: "1",
                category: "gallery",
            }),
        );

        expect(response.status).toBe(400);
    });

    it("returns 404 for a missing project", async () => {
        mocks.findUnique.mockResolvedValue(null);

        const response = await POST(
            makeRequest({
                projectId: "1",
                category: "gallery",
                file: makeFile(),
            }),
        );

        expect(response.status).toBe(404);
        expect(mocks.saveProjectImage).not.toHaveBeenCalled();
    });

    it("returns 201 for a valid upload", async () => {
        const file = makeFile();

        const response = await POST(
            makeRequest({
                projectId: "1",
                category: "gallery",
                file,
            }),
        );

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({
            url: "/uploads/portfolio/projects/1/gallery/file.webp",
            width: 100,
            height: 80,
            size: 10,
            mimeType: "image/webp",
        });
        expect(mocks.saveProjectImage).toHaveBeenCalledWith({
            projectId: 1,
            category: "gallery",
            file,
        });
    });

    it.each([
        ["FILE_TOO_LARGE", 413],
        ["EMPTY_FILE", 400],
        ["INVALID_IMAGE_DIMENSIONS", 400],
        ["INVALID_GALLERY_RATIO", 400],
        ["INVALID_FEATURE_PHOTO_RATIO", 400],
        ["ANIMATED_IMAGES_NOT_ALLOWED", 400],
        ["unexpected", 500],
    ])("maps %s to status %s", async (message, status) => {
        mocks.saveProjectImage.mockRejectedValue(new Error(message));

        const response = await POST(
            makeRequest({
                projectId: "1",
                category: "gallery",
                file: makeFile(),
            }),
        );

        expect(response.status).toBe(status);
    });
});
