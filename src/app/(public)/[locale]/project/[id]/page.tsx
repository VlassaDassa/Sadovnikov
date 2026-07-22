import { notFound } from 'next/navigation';

import ProjectPreview from "@/components/public/project/ProjectPreview";
import ProjectStack from "@/components/public/project/ProjectStack";
import KeyFeatures from "@/components/public/project/KeyFeature";
import ProjectDescription from "@/components/public/project/ProjectDescription";
import Metrics from "@/components/public/project/Metrics";
import Evolution from "@/components/public/project/Evolution";
import AnimatedSection from '@/components/shared/AnimatedScroll';
import ErrorPage from '@/components/shared/ErrorPage';

import type { IProjectPreviewData } from '@/interfaces/general';
import prisma from '@/lib/prisma';
import { IProject } from '@/interfaces/general';
import { transformProject } from '@/lib/transformers/project';

import styles from './index.module.scss';



interface ProjectPageProps {
    params: Promise<{ id: string, locale: string }>;
}


export default async function Project({ params }: ProjectPageProps) {
	const { id, locale } = await params;
    const projectId = Number(id);

	const currentLocale = locale === 'ru' ? 'ru' : 'en';

	let project: IProject | null = null


	try {
		const rawProject = await prisma.project.findUnique({
			where: {
				id: projectId
			},
			include: {
				images: true,
				stack: true,
				description: true,
				metrics: true,
				commits: {
				orderBy: [
					{
						order: 'asc',
					},
					{
						id: 'asc',
					},
				],
			},
				keyFeatures: true,
			},
		})

		project = rawProject ? transformProject(rawProject, currentLocale) : null
	}	
	catch(error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		return <ErrorPage error={errorMessage} />
	}
    
    if (!project) {
        notFound();
    }

	const previewData: IProjectPreviewData = {
		date: project.date,
		developmentTime: project.developmentTime,
		teamType: project.teamType,
		name: project.name,
		category: project.category,
		previewDescription: project.previewDescription,
		images: project.images,
		gitHubLink: project.gitHubLink,
		demoLink: project.demoLink,
	}

    return (
		<>
			<AnimatedSection animation='fade-down'>
				<ProjectPreview data={previewData} />
			</AnimatedSection>

			<AnimatedSection animation='fade-left'>
				<ProjectStack data={[]} />
			</AnimatedSection>

			<AnimatedSection animation='fade-right'>
				<KeyFeatures data={project.keyFeatures || []} />
			</AnimatedSection>

			<AnimatedSection animation='fade-up'>
				<ProjectDescription data={project.description} />
			</AnimatedSection>
	        
			<section className={`${styles.twoColumns} container`}>
				<AnimatedSection animation='zoom'>
					<Metrics data={project.metrics} />
				</AnimatedSection>

				<AnimatedSection animation='zoom'>
					<Evolution data={project.commits} />
				</AnimatedSection>
			</section>
	        
		</>
    )
}

