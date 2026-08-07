import prisma from '@/lib/prisma'


export async function resetDatabase(): Promise<void> {
    await prisma.$transaction([
        prisma.commit.deleteMany(),
        prisma.metric.deleteMany(),
        prisma.descriptionBlock.deleteMany(),
        prisma.keyFeature.deleteMany(),
        prisma.stackItem.deleteMany(),
        prisma.projectImage.deleteMany(),
        prisma.project.deleteMany(),
        prisma.workExperience.deleteMany(),
        prisma.aboutMe.deleteMany(),
        prisma.footerItem.deleteMany(),
        prisma.skill.deleteMany(),
        prisma.stack.deleteMany(),
        prisma.session.deleteMany(),
        prisma.account.deleteMany(),
        prisma.verification.deleteMany(),
        prisma.user.deleteMany(),
    ])
}