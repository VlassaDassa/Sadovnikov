import { PrismaClient } from "@prisma/client";

import { aboutMe } from "./../src/mockData/aboutMe";
import { footerItems } from "./../src/mockData/footer";
import { projects } from "./../src/mockData/projects";
import { skills } from "./../src/mockData/skills";
import { stack as globalStack } from "./../src/mockData/stack";

const prisma = new PrismaClient();

async function clearSeedData() {
    await prisma.$transaction([
        prisma.projectImage.deleteMany(),
        prisma.stackItem.deleteMany(),
        prisma.keyFeature.deleteMany(),
        prisma.descriptionBlock.deleteMany(),
        prisma.metric.deleteMany(),
        prisma.commit.deleteMany(),
        prisma.project.deleteMany(),

        prisma.workExperience.deleteMany(),
        prisma.aboutMe.deleteMany(),

        prisma.skill.deleteMany(),
        prisma.stack.deleteMany(),
        prisma.footerItem.deleteMany(),
    ]);
}

async function seedGlobalData() {
    await prisma.skill.createMany({
        data: skills.map((skill, order) => ({ ...skill, order })),
    });

    await prisma.stack.createMany({
        data: globalStack.map((item, order) => ({ ...item, order })),
        skipDuplicates: true,
    });

    await prisma.footerItem.createMany({
        data: footerItems.map((item, order) => ({ ...item, order })),
    });
}

async function seedAboutMe() {
    await prisma.aboutMe.create({
        data: {
            birth: aboutMe.birth,
            placeBirth: aboutMe.placeBirth,
            placeBirthRu: aboutMe.placeBirthRu || null,
            education: aboutMe.education,
            educationRu: aboutMe.educationRu || null,
            location: aboutMe.location,
            locationRu: aboutMe.locationRu || null,
            shortBio: aboutMe.shortBio,
            shortBioRu: aboutMe.shortBioRu || null,

            workExperience: {
                create: aboutMe.workExperience.map((experience, order) => ({
                    organization: experience.organization,
                    organizationRu: experience.organizationRu || null,

                    position: experience.position,
                    positionRu: experience.positionRu || null,

                    startDate: experience.workingPeriod.startDate,

                    endDate: experience.workingPeriod.endDate || null,

                    description: experience.description,

                    descriptionRu: experience.descriptionRu || null,
                    order,
                })),
            },
        },
    });
}

async function seedProjects() {
    for (const project of projects) {
        await prisma.project.create({
            data: {
                category: project.category,
                name: project.name,

                shortDescription: project.shortDescription,

                previewDescription: project.previewDescription,

                previewDescriptionRu: project.previewDescriptionRu || null,

                date: project.date,

                developmentTime: project.developmentTime,

                developmentTimeRu: project.developmentTimeRu || null,

                githubLink: project.gitHubLink || null,

                demoLink: project.demoLink || null,

                numberTeam: project.numberTeam,

                teamType: project.teamType,

                images: {
                    create: project.images.map((image) => ({
                        image: image.image,
                        main: image.main,
                    })),
                },

                stack: {
                    create: project.stack.map((stackItem) => ({
                        name: stackItem.name,
                        icon: stackItem.icon,

                        ...(stackItem.tooltip
                            ? {
                                  tooltip: {
                                      id: stackItem.tooltip.id,
                                      title: stackItem.tooltip.title,
                                      titleRu:
                                          stackItem.tooltip.titleRu ?? null,
                                      text: stackItem.tooltip.text,
                                      textRu: stackItem.tooltip.textRu ?? null,
                                  },
                              }
                            : {}),
                    })),
                },

                keyFeatures: {
                    create: project.keyFeatures.map((feature) => ({
                        title: feature.title,

                        titleRu: feature.titleRu || null,

                        text: feature.text,

                        textRu: feature.textRu || null,

                        icon: feature.icon,

                        photo: feature.photo,
                    })),
                },

                description: {
                    create: project.description.map((block) => ({
                        title: block.title,

                        titleRu: block.titleRu || null,

                        icon: block.icon,

                        content: block.content,

                        contentRu: block.contentRu || null,
                    })),
                },

                metrics: {
                    create: project.metrics.map((metric) => ({
                        icon: metric.icon,

                        title: metric.title,

                        titleRu: metric.titleRu || null,

                        text: metric.text,

                        textRu: metric.textRu || null,

                        current: Number(metric.current),

                        max: Number(metric.max),

                        type: metric.type,
                    })),
                },

                commits: {
                    create: project.commits.map((commit, index) => ({
                        name: commit.name,

                        nameRu: commit.nameRu || null,

                        date: commit.date,

                        dateRu: commit.dateRu || null,

                        text: commit.text,

                        textRu: commit.textRu || null,

                        order: index,
                    })),
                },
            },
        });
    }
}

async function main() {
    console.log("Starting database seed");

    await clearSeedData();

    console.log("Old seed data cleared");

    await seedGlobalData();
    console.log("Global data seeded");

    await seedAboutMe();
    console.log("About me seeded");

    await seedProjects();
    console.log(`${projects.length} projects seeded`);

    console.log("Database seed completed");
}

main()
    .catch((error: unknown) => {
        console.error("Database seed failed", error);

        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
