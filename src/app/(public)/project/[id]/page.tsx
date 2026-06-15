import { notFound } from 'next/navigation';

import ProjectPreview from "@/components/public/project/ProjectPreview";
import ProjectStack from "@/components/public/project/ProjectStack";
import KeyFeatures from "@/components/public/project/KeyFeature";
import ProjectDescription from "@/components/public/project/ProjectDescription";
import Metrics from "@/components/public/project/Metrics";
import Evolution from "@/components/public/project/Evolution";

import { projects } from '@/mockData/projects';
import type { IProjectPreviewData } from '@/interfaces/general';

import AnimatedSection from '@/components/shared/AnimatedScroll';

import styles from './index.module.scss';



interface ProjectPageProps {
    params: Promise<{ id: string }>;
}


export default async function Project({ params }: ProjectPageProps) {
	const { id } = await params;
    const projectId = Number(id);

    const project = projects.find(p => p.id === projectId);
	console.log(project)
    
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
		images: [project.mainImg, ...(project.images || [])],
		gitHubLink: project.gitHubLink,
		demoLink: project.demoLink,
	}

    return (
		<>
			<AnimatedSection animation='fade-down'>
				<ProjectPreview data={previewData} />
			</AnimatedSection>

			<AnimatedSection animation='fade-left'>
				<ProjectStack data={project.stack} />
			</AnimatedSection>

			<AnimatedSection animation='fade-right'>
				<KeyFeatures data={project.keyFeatures} />
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

