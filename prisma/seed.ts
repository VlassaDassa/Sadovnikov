import {
    Prisma,
    PrismaClient,
} from '@prisma/client'

import { projects } from './../src/mockData/projects'
import { skills } from './../src/mockData/skills'
import { stack as globalStack } from './../src/mockData/stack'
import { footerItems } from './../src/mockData/footer'
import { aboutMe } from './../src/mockData/aboutMe'

const prisma = new PrismaClient()

function getOptionalString(
    source: unknown,
    key: string
): string | undefined {
    if (!source || typeof source !== 'object') {
        return undefined
    }

    const value = (source as Record<string, unknown>)[key]

    return typeof value === 'string'
        ? value
        : undefined
}

function getRequiredString(
    source: unknown,
    keys: string[],
    context: string
): string {
    for (const key of keys) {
        const value = getOptionalString(source, key)

        if (value !== undefined) {
            return value
        }
    }

    throw new Error(
        `Missing required field "${keys.join('" or "')}" in ${context}`
    )
}

function toJson(value: unknown): Prisma.InputJsonValue {
    return JSON.parse(
        JSON.stringify(value)
    ) as Prisma.InputJsonValue
}

function toFiniteNumber(
    value: string | number,
    context: string
): number {
    const result = typeof value === 'string'
        ? Number.parseFloat(value)
        : value

    if (!Number.isFinite(result)) {
        throw new Error(`Invalid number in ${context}`)
    }

    return result
}

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
    ])
}

async function seedGlobalData() {
    await prisma.skill.createMany({
        data: skills,
    })

    await prisma.stack.createMany({
        data: globalStack,
        skipDuplicates: true,
    })

    await prisma.footerItem.createMany({
        data: footerItems,
    })
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
                create: aboutMe.workExperience.map((experience) => ({
                    organization: experience.organization,
                    organizationRu: experience.organizationRu || null,
                    position: experience.position,
                    positionRu: experience.positionRu || null,
                    startDate: experience.workingPeriod.startDate,
                    endDate: experience.workingPeriod.endDate || null,
                    description: experience.description,
                    descriptionRu: experience.descriptionRu || null,
                })),
            },
        },
    })
}

async function seedProjects() {
    for (const projectData of projects) {
        const shortDescription = getRequiredString(
            projectData,
            [
                'shortDescription',
                'shortDescrition',
            ],
            `project "${projectData.name}"`
        )

        const project = await prisma.project.create({
            data: {
                category: projectData.category,
                name: projectData.name,
                shortDescription,
                shortDescriptionRu:
                    projectData.shortDescriptionRu || null,
                previewDescription:
                    projectData.previewDescription,
                previewDescriptionRu:
                    projectData.previewDescriptionRu || null,
                date: projectData.date,
                developmentTime:
                    projectData.developmentTime,
                developmentTimeRu:
                    projectData.developmentTimeRu || null,
                githubLink:
                    projectData.gitHubLink || null,
                demoLink:
                    projectData.demoLink || null,
                numberTeam: projectData.numberTeam,
                teamType: projectData.teamType,
                images: {
                    create: projectData.images.map((image) => ({
                        image: image.image,
                        main: image.main,
                    })),
                },
                stack: {
                    create: projectData.stack.map((item) => ({
                        name: item.name,
                        icon: item.icon,
                        tooltip: item.tooltip
                            ? toJson(item.tooltip)
                            : undefined,
                    })),
                },
                keyFeatures: {
                    create: (
                        projectData.keyFeatures || []
                    ).map((feature) => ({
                        title: feature.title,
                        titleRu: feature.titleRu || null,
                        text: feature.text,
                        textRu: feature.textRu || null,
                        icon: feature.icon,
                        photo: feature.photo,
                    })),
                },
                description: {
                    create: projectData.description.map((block) => ({
                        title: block.title,
                        titleRu: block.titleRu || null,
                        icon: block.icon,
                        content: block.content,
                        contentRu: block.contentRu || null,
                    })),
                },
                metrics: {
                    create: projectData.metrics.map((metric) => ({
                        icon: metric.icon,
                        title: metric.title,
                        titleRu: metric.titleRu || null,
                        text: metric.text,
                        textRu: metric.textRu || null,
                        current: toFiniteNumber(
                            metric.current,
                            `metric "${metric.title}" current`
                        ),
                        max: toFiniteNumber(
                            metric.max,
                            `metric "${metric.title}" max`
                        ),
                        type: metric.type,
                    })),
                },
                commits: {
                    create: projectData.commits.map(
                        (commit, index) => ({
                            name: commit.name,
                            nameRu: commit.nameRu || null,
                            date: commit.date,
                            dateRu: commit.dateRu || null,
                            text: commit.text,
                            textRu: commit.textRu || null,
                            order:
                                typeof commit.order === 'number'
                                    ? commit.order
                                    : index,
                        })
                    ),
                },
            },
        })

        console.log(`Created project: ${project.name}`)
    }
}

async function main() {
    console.log('Starting database seed')

    await clearSeedData()
    await seedGlobalData()
    await seedAboutMe()
    await seedProjects()

    console.log('Database seed completed')
}

main()
    .catch((error: unknown) => {
        console.error('Database seed failed', error)
        process.exitCode = 1
    })
    .finally(async () => {
        await prisma.$disconnect()
    })