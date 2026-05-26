import ProjectPreview from "@/components/public/project/ProjectPreview";
import ProjectStack from "@/components/public/project/ProjectStack";
import KeyFeatures from "@/components/public/project/KeyFeature";
import ProjectDescription from "@/components/public/project/ProjectDescription";
import Metrics from "@/components/public/project/Metrics";
import Evolution from "@/components/public/project/Evolution";

import AnimatedSection from '@/components/shared/AnimatedScroll';

import styles from './index.module.scss';


export const Project = () => {
    return (
		<>
			<AnimatedSection animation='fade-down'>
				<ProjectPreview />
			</AnimatedSection>

			<AnimatedSection animation='fade-left'>
				<ProjectStack />
			</AnimatedSection>

			<AnimatedSection animation='fade-right'>
				<KeyFeatures />
			</AnimatedSection>

			<AnimatedSection animation='fade-up'>
				<ProjectDescription />
			</AnimatedSection>
	        
			<section className={`${styles.twoColumns} container`}>
				<AnimatedSection animation='zoom'>
					<Metrics />
				</AnimatedSection>

				<AnimatedSection animation='zoom'>
					<Evolution />
				</AnimatedSection>
			</section>
	        
		</>
    )
}


export default Project