import ProjectPreview from "@/components/project/ProjectPreview";
import ProjectStack from "@/components/project/ProjectStack";
import KeyFeatures from "@/components/project/KeyFeature";
import ProjectDescription from "@/components/project/ProjectDescription";
import Metrics from "@/components/project/Metrics";
import Evolution from "@/components/project/Evolution";

import AnimatedSection from '@/components/general/AnimatedScroll';

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