import ProjectPreview from "@/components/project/ProjectPreview";
import ProjectStack from "@/components/project/ProjectStack";
import KeyFeatures from "@/components/project/KeyFeature";
import ProjectDescription from "@/components/project/ProjectDescription";
import Metrics from "@/components/project/Metrics";
import Evolution from "@/components/project/Evolution";

import styles from './index.module.scss';


export const Project = () => {
    return (
		<>
	        <ProjectPreview />
	        <ProjectStack />
	        <KeyFeatures />
	        <ProjectDescription />
			<section className={`${styles.twoColumns} container`}>
				<Metrics />
	        	<Evolution />
			</section>
	        
		</>
    )
}


export default Project