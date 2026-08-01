import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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
import { parseEntityId } from '@/lib/project';
import { getProjectById } from '@/lib/project';
import { getAbsoluteUrl, getLanguageAlternates, getOpenGraphLocale, siteConfig } from '@/lib/seo/site';

import styles from './index.module.scss';



interface ProjectPageProps {
    params: Promise<{ id: string, locale: string }>;
}


export async function generateMetadata({params}: ProjectPageProps): Promise<Metadata> {
	const { id, locale: requestedLocale } = await params
	const projectId = parseEntityId(id)
	const locale = requestedLocale === 'ru' ? 'ru' : 'en'
	const rawProject = await getProjectById(projectId)

	if (!rawProject) {
		return {
			title: 'Project not found',
			robots: {
				index: false,
				follow: false
			}
		}
	}

	const project = transformProject(rawProject, locale)
	const path = `/project/${project.id}`
	const canonical = getAbsoluteUrl(path, locale)
	const title = `${project.name} - ${project.category}`
	const description = project.previewDescription || project.shortDescription
	const projectImage = project.images.find((image) => image.main)?.image
	const socialImage = projectImage && !projectImage.startsWith('data:') ? projectImage : '/opengraph-image.png'

	return {
		title,
		description,
		alternates: {
			canonical,
			languages: getLanguageAlternates(path)
		},
		openGraph: {
			title,
			description,
			type: 'article',
			url: canonical,
			siteName: siteConfig.name,
			locale: getOpenGraphLocale(locale),
			alternateLocale: [ locale === 'ru' ? 'en_US' : 'ru_RU' ],
			images: [
				{
					url: socialImage,
					alt: project.name
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ socialImage ]
		}
	}

}







export default async function Project({ params }: ProjectPageProps) {
	const { id, locale } = await params;
	
	const projectId = parseEntityId(id)

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
				<ProjectStack data={project.stack || []} />
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

