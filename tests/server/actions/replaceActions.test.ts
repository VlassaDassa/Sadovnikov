import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    requireAdmin: vi.fn(),
    revalidatePath: vi.fn(),
    transaction: vi.fn(),
    transformRawAboutMe: vi.fn(),
}));

vi.mock("next/cache", () => ({
    revalidatePath: mocks.revalidatePath,
}));

vi.mock("@/lib/auth/admin", () => ({
    requireAdmin: mocks.requireAdmin,
}));

vi.mock("@/lib/transformers/aboutMe", () => ({
    transformRawAboutMe: mocks.transformRawAboutMe,
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        $transaction: mocks.transaction,
    },
}));

import { updateAboutMe } from "@/app/actions/aboutMe";
import { updateFooter } from "@/app/actions/footer";
import { updateSkills } from "@/app/actions/skills";
import { updateStack } from "@/app/actions/stack";

const aboutMe = {
    birth: 1995,
    placeBirth: "City",
    placeBirthRu: "City ru",
    education: "Education",
    educationRu: "Education ru",
    location: "Location",
    locationRu: "Location ru",
    shortBio: "Short bio",
    shortBioRu: "Short bio ru",
    workExperience: [
        {
            id: 1,
            workingPeriod: { startDate: "2020", endDate: "NOW" },
            organization: "Company",
            organizationRu: "Company ru",
            position: "Engineer",
            positionRu: "Engineer ru",
            description: "Description",
            descriptionRu: "Description ru",
        },
    ],
};

function makeTransactionClient() {
    return {
        skill: {
            findMany: vi.fn().mockResolvedValue([]),
            deleteMany: vi.fn(),
            create: vi.fn((input) => Promise.resolve({ id: input.data.id, ...input.data })),
            update: vi.fn(),
        },
        stack: {
            findMany: vi.fn().mockResolvedValue([]),
            deleteMany: vi.fn(),
            create: vi.fn((input) => Promise.resolve({ id: input.data.id, ...input.data })),
            update: vi.fn(),
        },
        footerItem: {
            findMany: vi.fn().mockResolvedValue([]),
            deleteMany: vi.fn(),
            create: vi.fn((input) => Promise.resolve({ id: input.data.id, ...input.data })),
            update: vi.fn(),
        },
        workExperience: {
            deleteMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        aboutMe: {
            findFirst: vi.fn().mockResolvedValue({
                id: 1,
                ...aboutMe,
                workExperience: [
                    {
                        id: 1,
                        aboutMeId: 1,
                        organization: aboutMe.workExperience[0].organization,
                        organizationRu: aboutMe.workExperience[0].organizationRu,
                        position: aboutMe.workExperience[0].position,
                        positionRu: aboutMe.workExperience[0].positionRu,
                        startDate: aboutMe.workExperience[0].workingPeriod.startDate,
                        endDate: aboutMe.workExperience[0].workingPeriod.endDate,
                        description: aboutMe.workExperience[0].description,
                        descriptionRu: aboutMe.workExperience[0].descriptionRu,
                        order: 0,
                    },
                ],
            }),
            create: vi.fn(),
            update: vi.fn(),
            findUniqueOrThrow: vi.fn().mockResolvedValue(aboutMe),
        },
    };
}

describe("incremental collection actions", () => {
    beforeEach(() => {
        mocks.requireAdmin.mockResolvedValue({
            user: { id: "admin", role: "ADMIN" },
        });
        mocks.transformRawAboutMe.mockImplementation((value) => value);
    });

    it("waits for authorization before querying the database", async () => {
        let resolveAuth!: () => void;
        const authorization = new Promise<void>((resolve) => {
            resolveAuth = resolve;
        });
        const transactionClient = makeTransactionClient();
        mocks.requireAdmin.mockReturnValue(authorization);
        mocks.transaction.mockImplementation(async (callback) => callback(transactionClient));

        const action = updateSkills([{ id: 1, name: "Testing", score: 9 }]);

        await Promise.resolve();
        expect(transactionClient.skill.findMany).not.toHaveBeenCalled();

        resolveAuth();
        await action;

        expect(transactionClient.skill.findMany).toHaveBeenCalledOnce();
    });

    it("updates only changed skills and preserves unchanged rows", async () => {
        const transactionClient = makeTransactionClient();
        transactionClient.skill.findMany.mockResolvedValue([
            { id: 1, name: "Testing", score: 5, order: 0 },
            { id: 2, name: "Unused", score: 1, order: 1 },
        ]);
        mocks.transaction.mockImplementation(async (callback) => callback(transactionClient));

        const result = await updateSkills([{ id: 1, name: "Testing", score: 9 }]);

        expect(result.success).toBe(true);
        expect(transactionClient.skill.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { name: "Testing", score: 9, order: 0 },
        });
        expect(transactionClient.skill.deleteMany).toHaveBeenCalledWith({
            where: { id: { in: [2] } },
        });
        expect(transactionClient.skill.create).not.toHaveBeenCalled();
    });

    it("updates one footer item without recreating the collection", async () => {
        const transactionClient = makeTransactionClient();
        transactionClient.footerItem.findMany.mockResolvedValue([
            {
                id: 1,
                text: "GitHub",
                icon: "/old.svg",
                link: null,
                order: 0,
            },
        ]);
        mocks.transaction.mockImplementation(async (callback) => callback(transactionClient));

        await updateFooter([
            { id: 1, text: "GitHub", icon: "/github.svg", link: "https://github.com" },
        ]);

        expect(transactionClient.footerItem.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                text: "GitHub",
                icon: "/github.svg",
                link: "https://github.com",
                order: 0,
            },
        });
        expect(transactionClient.footerItem.create).not.toHaveBeenCalled();
        expect(transactionClient.footerItem.deleteMany).not.toHaveBeenCalled();
    });

    it("uses temporary names to safely swap unique stack names", async () => {
        const transactionClient = makeTransactionClient();
        transactionClient.stack.findMany.mockResolvedValue([
            { id: 1, name: "React", order: 0 },
            { id: 2, name: "Vue", order: 1 },
        ]);
        mocks.transaction.mockImplementation(async (callback) => callback(transactionClient));

        await updateStack([
            { id: 1, name: "Vue" },
            { id: 2, name: "React" },
        ]);

        expect(transactionClient.stack.update).toHaveBeenCalledTimes(4);
        expect(transactionClient.stack.deleteMany).not.toHaveBeenCalled();
    });

    it("updates only the modified work experience", async () => {
        const transactionClient = makeTransactionClient();
        mocks.transaction.mockImplementation(async (callback) => callback(transactionClient));

        await updateAboutMe({
            ...aboutMe,
            workExperience: [
                {
                    ...aboutMe.workExperience[0],
                    position: "Senior Engineer",
                },
            ],
        });

        expect(transactionClient.workExperience.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: expect.objectContaining({ position: "Senior Engineer" }),
        });
        expect(transactionClient.workExperience.deleteMany).not.toHaveBeenCalled();
        expect(transactionClient.aboutMe.update).not.toHaveBeenCalled();
    });

    it("persists a reordered collection without recreating its rows", async () => {
        const transactionClient = makeTransactionClient();
        transactionClient.skill.findMany.mockResolvedValue([
            { id: 1, name: "Testing", score: 5, order: 0 },
            { id: 2, name: "TypeScript", score: 8, order: 1 },
        ]);
        mocks.transaction.mockImplementation(async (callback) => callback(transactionClient));

        await updateSkills([
            { id: 2, name: "TypeScript", score: 8 },
            { id: 1, name: "Testing", score: 5 },
        ]);

        expect(transactionClient.skill.update).toHaveBeenCalledWith({
            where: { id: 2 },
            data: { name: "TypeScript", score: 8, order: 0 },
        });
        expect(transactionClient.skill.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { name: "Testing", score: 5, order: 1 },
        });
        expect(transactionClient.skill.create).not.toHaveBeenCalled();
        expect(transactionClient.skill.deleteMany).not.toHaveBeenCalled();
    });

    it.each([
        [() => updateSkills([{ id: 1, name: "Testing", score: 9 }])],
        [() => updateStack([{ id: 1, name: "Vitest" }])],
        [() => updateFooter([{ id: 1, text: "GitHub", icon: "/github.svg" }])],
        [() => updateAboutMe(aboutMe)],
    ])("uses a database transaction", async (runAction) => {
        const transactionClient = makeTransactionClient();
        mocks.transaction.mockImplementation(async (callback) => callback(transactionClient));

        await runAction();

        expect(mocks.transaction).toHaveBeenCalledOnce();
    });
});
