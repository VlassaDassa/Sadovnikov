import React from "react";

import ClientPageWrapper from "./ClientPageWrapper";
import ErrorPage from "@/components/shared/ErrorPage";

import { transformProject } from "@/lib/transformers/project";
import { IProject, Skill, Stack, IFooterItem } from "@/interfaces/general";
import { IVisits, IDevices, ITrafficSource } from "@/mockData/adminCharts";
import prisma from "@/lib/prisma";




const Admin: React.FC = async () => {
    let visitsChart: IVisits[] = []
    let deviceChart: IDevices[] = []
    let trafficSource: ITrafficSource[] = []
    let recentProjects: IProject[] = []
    let skills: Skill[] = []
    let stack: Stack[] = []
    let footer: IFooterItem[] = []

    try {
        visitsChart = await prisma.visitorStat.findMany()
        trafficSource = await prisma.trafficSource.findMany()
        skills = await prisma.skill.findMany()
        stack = await prisma.stack.findMany()
        footer = await prisma.footerItem.findMany()
        deviceChart = (await prisma.deviceStat.findMany()) as IDevices[];

        const rawRecentProjects = await prisma.project.findMany({
            include: {
                images: true,
                stack: true,
                description: true,
                metrics: true,
                commits: true,
                keyFeatures: true,
            }
        })
        recentProjects = rawRecentProjects.map(transformProject)
    }
    catch(error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return <ErrorPage error={errorMessage} />
    }


    return (
        <ClientPageWrapper 
           deviceChart={deviceChart} 
           visitsChart={visitsChart} 
           trafficSource={trafficSource} 
           recentProjects={recentProjects} 
           skills={skills} 
           stack={stack} 
           footer={footer} 
        />   
    )
}

export default Admin;