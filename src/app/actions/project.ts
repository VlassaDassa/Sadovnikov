'use server'

import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"
import { IProject } from "@/interfaces/general"
import { transformProject } from "@/lib/transformers/project"



export async function createProject(projectData: IProject) {
    try {
        const newProject = await prisma.project.create({
            data: {
                category: projectData.category,
                name: projectData.name,
                shortDescription: projectData.shortDescrition,
                previewDescription: projectData.previewDescription,
                date: projectData.date,
                developmentTime: projectData.developmentTime,
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
                    })),
                },

                keyFeatures: {
                    create: (projectData.keyFeatures || []).map(feature => ({
                        title: feature.title,
                        text: feature.text,
                        icon: feature.icon,
                        photo: feature.photo,
                    })),
                },

                description: {
                    create: projectData.description.map(desc => ({
                        title: desc.title,
                        icon: desc.icon,
                        content: desc.content,
                    })),
                },

                metrics: {
                    create: projectData.metrics.map(metric => ({
                        icon: metric.icon,
                        title: metric.title,
                        text: metric.text,
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

        const transformedProject = transformProject(newProject);

        revalidatePath('/admin')
        revalidatePath('/')
        return { success: true, project: transformedProject }
    } catch (error) {
        console.error('Error creating project', error)
        return { success: false, error: 'Failed to create project' }
    }
}