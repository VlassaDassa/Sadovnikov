'use server'

import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"
import { IProject } from "@/interfaces/general"
import { transformRawProject } from "@/lib/transformers/project"
import { requireAdmin } from "@/lib/auth/admin";


export async function createProject(projectData: IProject) {
    requireAdmin()

    try {
        const newProject = await prisma.project.create({
            data: {
                category: projectData.category,
                name: projectData.name,

                shortDescription: projectData.shortDescription,
                shortDescriptionRu: projectData.shortDescriptionRu,

                previewDescription: projectData.previewDescription,
                previewDescriptionRu: projectData.previewDescriptionRu,

                date: projectData.date,

                developmentTime: projectData.developmentTime,
                developmentTimeRu: projectData.developmentTimeRu,

                githubLink: projectData.gitHubLink || null,
                demoLink: projectData.demoLink || null,
                numberTeam: projectData.numberTeam,
                teamType: projectData.teamType,

                images: {
                    create: projectData.images.map(img => ({
                        image: img.image,
                        main: img.main
                    }))
                },

                stack: {
                    create: projectData.stack.map(item => ({
                        name: item.name,
                        icon: item.icon,
                        tooltip: item.tooltip ? JSON.parse(JSON.stringify(item.tooltip)) : null,
                        tooltipRu: item.tooltip ? JSON.parse(JSON.stringify(item.tooltipRu)) : null,
                    })),
                },

                keyFeatures: {
                    create: (projectData.keyFeatures || []).map(feature => ({
                        title: feature.title,
                        titleRu: feature.titleRu,

                        text: feature.text,
                        textRu: feature.text,

                        icon: feature.icon,
                        photo: feature.photo,
                    })),
                },

                description: {
                    create: projectData.description.map(desc => ({
                        title: desc.title,
                        titleRu: desc.titleRu,

                        icon: desc.icon,

                        content: desc.content,
                        contentRu: desc.contentRu,
                    })),
                },

                metrics: {
                    create: projectData.metrics.map(metric => ({
                        icon: metric.icon,

                        title: metric.title,
                        titleRu: metric.titleRu,

                        text: metric.text,
                        textRu: metric.textRu,

                        current: typeof metric.current === 'string' ? parseFloat(metric.current) : metric.current,
                        max: metric.max,
                        type: metric.type,
                    })),
                },

                commits: {
                    create: projectData.commits.map(commit => ({
                        name: commit.name,
                        date: commit.date,
                        text: commit.text,
                    })),
                },
            },

            include: {
                images: true,
                stack: true,
                description: true,
                metrics: true,
                commits: true,
                keyFeatures: true,
            },
        })

        const transformedProject = transformRawProject(newProject);

        revalidatePath('/admin')
        revalidatePath('/')
        return { success: true, project: transformedProject }
    } catch (error) {
        console.error('Error creating project', error)
        return { success: false, error: 'Failed to create project' }
    }
}

export async function updateProject(projectData: IProject) {
    try {
        const projectId = projectData.id

        const updatedProject = await prisma.$transaction(async (tx) => {
            
            // Обновление основных полей
            await tx.project.update({
                where: { id: projectId },
                data: {
                    category: projectData.category,
                    name: projectData.name,

                    shortDescription: projectData.shortDescription,
                    shortDescriptionRu: projectData.shortDescriptionRu,

                    previewDescription: projectData.previewDescription,
                    previewDescriptionRu: projectData.previewDescriptionRu,

                    date: projectData.date,

                    developmentTime: projectData.developmentTime,
                    developmentTimeRu: projectData.developmentTimeRu,

                    githubLink: projectData.gitHubLink || null,
                    demoLink: projectData.demoLink || null,
                    numberTeam: projectData.numberTeam,
                    teamType: projectData.teamType,

                }
            });

            // Обновление изображений
            await tx.projectImage.deleteMany({ where: { projectId } })
            if (projectData.images.length > 0) {
                await tx.projectImage.createMany({
                    data: projectData.images.map(img => ({
                        projectId,
                        image: img.image,
                        main: img.main
                    }))
                })
            };
            
            // Обновление стэка
            await tx.stackItem.deleteMany({ where: { projectId } });
            if (projectData.stack.length > 0) {
                await tx.stackItem.createMany({
                    data: projectData.stack.map(item => ({
                        projectId,
                        name: item.name,
                        icon: item.icon,
                        tooltip: JSON.parse(JSON.stringify(item.tooltip))
                    }))
                })
            }

            // Обновление keyFeatures
            await tx.keyFeature.deleteMany({ where: { projectId } })
            if (projectData.keyFeatures && projectData.keyFeatures.length > 0) {
                await tx.keyFeature.createMany({
                    data: projectData.keyFeatures.map(feature => ({
                        projectId,
                        title: feature.title,
                        text: feature.text,
                        icon: feature.icon,
                        photo: feature.photo,
                    }))
                })
            };

            // Обновление description
            await tx.descriptionBlock.deleteMany({where: { projectId }})
            if (projectData.description.length > 0) {
                await tx.descriptionBlock.createMany({
                    data: projectData.description.map(desc => ({
                        projectId,
                        title: desc.title,
                        icon: desc.icon,
                        content: desc.content
                    }))
                })
            };

            // Обновление metrics
            await tx.metric.deleteMany({ where: { projectId } })
            if (projectData.metrics.length > 0) {
                await tx.metric.createMany({
                    data: projectData.metrics.map(metric => ({
                        projectId,
                        icon: metric.icon,
                        title: metric.title,
                        text: metric.text,
                        current: typeof metric.current === 'string' ? parseFloat(metric.current) : metric.current,
                        max: metric.max,
                        type: metric.type

                    }))
                })
            };

            // Обновление commits
            await tx.commit.deleteMany({ where: { projectId } })
            if (projectData.commits.length > 0) {
                await tx.commit.createMany({
                    data: projectData.commits.map(commit => ({
                        projectId,
                        name: commit.name,
                        date: commit.date,
                        text: commit.text
                    }))
                })
            }

            return await tx.project.findUnique({
                where: { id: projectId },
                include: {
                    images: true,
                    stack: true,
                    keyFeatures: true,
                    description: true,
                    metrics: true,
                    commits: true
                }
            })
        });

        if (!updatedProject) {
            throw new Error(`Project with id ${projectId} not found`);
        }
        const transformedProject = transformRawProject(updatedProject)

        revalidatePath(`/project/${projectId}`)
        revalidatePath(`/editProject/${projectId}`)
        revalidatePath('/')
        
        return { success: true, project: transformedProject }
    }

    catch (error) {
        console.error('❌ Error updating project', error)
        return { success: false, error: String(error) }
    }
}

export async function deleteProject(projectId: number) {
    try {
        // Сначала связанные поля
        await prisma.projectImage.deleteMany({ where: { projectId } });
        await prisma.stackItem.deleteMany({ where: { projectId } });
        await prisma.keyFeature.deleteMany({ where: { projectId } });
        await prisma.descriptionBlock.deleteMany({ where: { projectId } });
        await prisma.metric.deleteMany({ where: { projectId } });
        await prisma.commit.deleteMany({ where: { projectId } });

        await prisma.project.delete({ where: { id: projectId } })

        revalidatePath(`/project/${projectId}`)
        revalidatePath('/admin')
        revalidatePath(`/editProject/${projectId}`)

        return { success: true }
        
    } catch (error) {
        return { success: false, error: error }
    }
}