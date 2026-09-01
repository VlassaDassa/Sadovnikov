"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { AboutMe, WorkExperience } from "@/interfaces/general";
import { transformRawAboutMe } from "@/lib/transformers/aboutMe";
import { requireAdmin } from "@/lib/auth/admin";

function assertUniqueIds(items: WorkExperience[]): void {
    if (new Set(items.map((item) => item.id)).size !== items.length) {
        throw new Error("Duplicate work experience ids are not allowed");
    }
}

function toWorkExperienceData(item: WorkExperience, order: number) {
    return {
        organization: item.organization,
        organizationRu: item.organizationRu ?? null,
        position: item.position,
        positionRu: item.positionRu ?? null,
        startDate: item.workingPeriod.startDate,
        endDate: item.workingPeriod.endDate || null,
        description: item.description,
        descriptionRu: item.descriptionRu ?? null,
        order,
    };
}

export async function updateAboutMe(aboutMe: AboutMe) {
    await requireAdmin();

    assertUniqueIds(aboutMe.workExperience);

    try {
        const savedAboutMe = await prisma.$transaction(async (tx) => {
            const current = await tx.aboutMe.findFirst({
                include: {
                    workExperience: {
                        orderBy: { order: "asc" },
                    },
                },
            });

            const aboutMeData = {
                birth: aboutMe.birth,
                placeBirth: aboutMe.placeBirth,
                placeBirthRu: aboutMe.placeBirthRu ?? null,
                education: aboutMe.education,
                educationRu: aboutMe.educationRu ?? null,
                location: aboutMe.location,
                locationRu: aboutMe.locationRu ?? null,
                shortBio: aboutMe.shortBio,
                shortBioRu: aboutMe.shortBioRu ?? null,
            };

            if (!current) {
                return tx.aboutMe.create({
                    data: {
                        ...aboutMeData,
                        workExperience: {
                            create: aboutMe.workExperience.map((item, order) => ({
                                id: item.id,
                                ...toWorkExperienceData(item, order),
                            })),
                        },
                    },
                    include: {
                        workExperience: {
                            orderBy: { order: "asc" },
                        },
                    },
                });
            }

            const currentById = new Map(
                current.workExperience.map((item) => [item.id, item]),
            );
            const nextIds = new Set(
                aboutMe.workExperience.map((item) => item.id),
            );
            const removedIds = current.workExperience
                .filter((item) => !nextIds.has(item.id))
                .map((item) => item.id);

            if (removedIds.length > 0) {
                await tx.workExperience.deleteMany({
                    where: {
                        aboutMeId: current.id,
                        id: { in: removedIds },
                    },
                });
            }

            for (const [order, item] of aboutMe.workExperience.entries()) {
                const previous = currentById.get(item.id);
                const data = toWorkExperienceData(item, order);

                if (!previous) {
                    await tx.workExperience.create({
                        data: {
                            id: item.id,
                            aboutMeId: current.id,
                            ...data,
                        },
                    });
                } else if (
                    previous.organization !== data.organization ||
                    previous.organizationRu !== data.organizationRu ||
                    previous.position !== data.position ||
                    previous.positionRu !== data.positionRu ||
                    previous.startDate !== data.startDate ||
                    previous.endDate !== data.endDate ||
                    previous.description !== data.description ||
                    previous.descriptionRu !== data.descriptionRu ||
                    previous.order !== data.order
                ) {
                    await tx.workExperience.update({
                        where: { id: item.id },
                        data,
                    });
                }
            }

            const aboutMeHasChanges =
                current.birth !== aboutMeData.birth ||
                current.placeBirth !== aboutMeData.placeBirth ||
                current.placeBirthRu !== aboutMeData.placeBirthRu ||
                current.education !== aboutMeData.education ||
                current.educationRu !== aboutMeData.educationRu ||
                current.location !== aboutMeData.location ||
                current.locationRu !== aboutMeData.locationRu ||
                current.shortBio !== aboutMeData.shortBio ||
                current.shortBioRu !== aboutMeData.shortBioRu;

            if (aboutMeHasChanges) {
                await tx.aboutMe.update({
                    where: { id: current.id },
                    data: aboutMeData,
                });
            }

            return tx.aboutMe.findUniqueOrThrow({
                where: { id: current.id },
                include: {
                    workExperience: {
                        orderBy: { order: "asc" },
                    },
                },
            });
        });

        revalidatePath("/admin");
        revalidatePath("/");

        return {
            success: true,
            aboutMe: transformRawAboutMe(savedAboutMe),
        };
    } catch (error) {
        return { success: false, error: error };
    }
}
