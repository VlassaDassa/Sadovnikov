import {
    PrismaClient,
} from '@prisma/client'

import { skills } from './../src/mockData/skills'
import { stack as globalStack } from './../src/mockData/stack'
import { footerItems } from './../src/mockData/footer'
import { aboutMe } from './../src/mockData/aboutMe'

const prisma = new PrismaClient()



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



async function main() {
    console.log('Starting database seed')

    await clearSeedData()
    await seedGlobalData()
    await seedAboutMe()

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