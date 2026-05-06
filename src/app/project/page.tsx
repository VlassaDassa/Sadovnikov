import ProjectPreview from "@/components/project/ProjectPreview";
import ProjectStack from "@/components/project/ProjectStack";
import KeyFeatures from "@/components/project/KeyFeature";
import ProjectDescription from "@/components/project/ProjectDescription";
import Metrics from "@/components/project/Metrics";
import Evolution from "@/components/project/Evolution";


export const Project = () => {
    return (
		<>
	        <ProjectPreview />
	        <ProjectStack />
	        <KeyFeatures />
	        <ProjectDescription />
	        <Metrics />
	        <Evolution />
		</>
    )
}


export default Project