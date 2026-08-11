import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    requireAdmin: vi.fn(),
    revalidatePath: vi.fn(),
    transaction: vi.fn(),
    skillDeleteMany: vi.fn(),
    skillCreateMany: vi.fn(),
    stackDeleteMany: vi.fn(),
    stackCreateMany: vi.fn(),
    footerDeleteMany: vi.fn(),
    footerCreateMany: vi.fn(),
    workExperienceDeleteMany: vi.fn(),
    aboutMeDeleteMany: vi.fn(),
    aboutMeCreate: vi.fn(),
    transformAboutMe: vi.fn(),
}));

vi.mock("next/cache", () => ({
    revalidatePath: mocks.revalidatePath,
}));

vi.mock("@/lib/auth/admin", () => ({
    requireAdmin: mocks.requireAdmin,
}));

vi.mock("@/lib/transformers/aboutMe", () => ({
    transformAboutMe: mocks.transformAboutMe,
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        skill: {
            deleteMany: mocks.skillDeleteMany,
            createMany: mocks.skillCreateMany,
        },
        stack: {
            deleteMany: mocks.stackDeleteMany,
            createMany: mocks.stackCreateMany,
        },
        footerItem: {
            deleteMany: mocks.footerDeleteMany,
            createMany: mocks.footerCreateMany,
        },
        workExperience: {
            deleteMany: mocks.workExperienceDeleteMany,
        },
        aboutMe: {
            deleteMany: mocks.aboutMeDeleteMany,
            create: mocks.aboutMeCreate,
        },
        $transaction: mocks.transaction,
    },
}));

import { updateAboutMe } from "@/app/actions/aboutMe";
import { updateFooter } from "@/app/actions/footer";
import { updateSkills } from "@/app/actions/skills";
import { updateStack } from "@/app/actions/stack";

function deferred<T>() {
    let resolve!: (value: T) => void;

    const promise = new Promise<T>((resolvePromise) => {
        resolve = resolvePromise;
    });

    return {
        promise,
        resolve,
    };
}

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
            workingPeriod: {
                startDate: "2020",
                endDate: "NOW",
            },
            organization: "Company",
            organizationRu: "Company ru",
            position: "Engineer",
            positionRu: "Engineer ru",
            description: "Description",
            descriptionRu: "Description ru",
        },
    ],
};

describe("replace actions", () => {
    beforeEach(() => {
        const tx = {
            skill: {
                deleteMany: mocks.skillDeleteMany,
                createMany: mocks.skillCreateMany,
            },
            stack: {
                deleteMany: mocks.stackDeleteMany,
                createMany: mocks.stackCreateMany,
            },
            footerItem: {
                deleteMany: mocks.footerDeleteMany,
                createMany: mocks.footerCreateMany,
            },
            workExperience: {
                deleteMany: mocks.workExperienceDeleteMany,
            },
            aboutMe: {
                deleteMany: mocks.aboutMeDeleteMany,
                create: mocks.aboutMeCreate,
            },
        };

        mocks.transaction.mockImplementation(async (callback) => {
            return callback(tx);
        });

        mocks.skillDeleteMany.mockResolvedValue({
            count: 0,
        });
        mocks.skillCreateMany.mockResolvedValue({
            count: 1,
        });
        mocks.stackDeleteMany.mockResolvedValue({
            count: 0,
        });
        mocks.stackCreateMany.mockResolvedValue({
            count: 1,
        });
        mocks.footerDeleteMany.mockResolvedValue({
            count: 0,
        });
        mocks.footerCreateMany.mockResolvedValue({
            count: 1,
        });
        mocks.workExperienceDeleteMany.mockResolvedValue({
            count: 0,
        });
        mocks.aboutMeDeleteMany.mockResolvedValue({
            count: 0,
        });
        mocks.aboutMeCreate.mockResolvedValue({
            id: 1,
        });
        mocks.transformAboutMe.mockReturnValue(aboutMe);
    });

    it.each([
        [
            "skills",
            () =>
                updateSkills([
                    {
                        id: 1,
                        name: "Testing",
                        score: 9,
                    },
                ]),
            mocks.skillDeleteMany,
        ],
        [
            "stack",
            () =>
                updateStack([
                    {
                        id: 1,
                        name: "Vitest",
                    },
                ]),
            mocks.stackDeleteMany,
        ],
        [
            "footer",
            () =>
                updateFooter([
                    {
                        id: 1,
                        text: "GitHub",
                        icon: "/github.svg",
                        link: "https://github.com",
                    },
                ]),
            mocks.footerDeleteMany,
        ],
        ["about", () => updateAboutMe(aboutMe), mocks.workExperienceDeleteMany],
    ])(
        "waits for authorization before changing %s",
        async (_name, runAction, firstMutation) => {
            const auth = deferred<{
                user: {
                    id: string;
                    role: string;
                };
            }>();

            mocks.requireAdmin.mockReturnValue(auth.promise);

            const actionPromise = runAction();

            await Promise.resolve();
            await Promise.resolve();

            expect(firstMutation).not.toHaveBeenCalled();

            auth.resolve({
                user: {
                    id: "admin",
                    role: "ADMIN",
                },
            });

            await actionPromise;

            expect(firstMutation).toHaveBeenCalled();
        },
    );

    it.each([
        [
            () =>
                updateSkills([
                    {
                        id: 1,
                        name: "Testing",
                        score: 9,
                    },
                ]),
        ],
        [
            () =>
                updateStack([
                    {
                        id: 1,
                        name: "Vitest",
                    },
                ]),
        ],
        [
            () =>
                updateFooter([
                    {
                        id: 1,
                        text: "GitHub",
                        icon: "/github.svg",
                        link: "https://github.com",
                    },
                ]),
        ],
        [() => updateAboutMe(aboutMe)],
    ])("uses a database transaction for replacement", async (runAction) => {
        mocks.requireAdmin.mockResolvedValue({
            user: {
                id: "admin",
                role: "ADMIN",
            },
        });

        await runAction();

        expect(mocks.transaction).toHaveBeenCalledOnce();
    });
});
