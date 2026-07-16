import React from "react";

import ClientPageWrapper from "./ClientPageWrapper";
import ErrorPage from "@/components/shared/ErrorPage";

import { transformProject } from "@/lib/transformers/project";
import { IProject, Skill, Stack, IFooterItem } from "@/interfaces/general";
import { IVisits, IDevices, ITrafficSource } from "@/mockData/adminCharts";
import { createMockVisits } from '@/mockData/analytics';
import prisma from "@/lib/prisma";
import { getAnalyticsDashboard } from "@/lib/umami/umami";





const Admin: React.FC = async () => {
    let visitsChart: IVisits[] = []
    let deviceChart: IDevices[] = []
    let trafficSource: ITrafficSource[] = []
    let recentProjects: IProject[] = []
    let skills: Skill[] = []
    let stack: Stack[] = []
    let footer: IFooterItem[] = []

    // const analytics = await getAnalyticsDashboard(30)

    const useMockAnalytics =
        process.env.ANALYTICS_USE_MOCK === 'true';

    const realAnalytics = await getAnalyticsDashboard(30);

    const analytics = {
        ...realAnalytics,
        visits: useMockAnalytics
            ? createMockVisits(1000)
            : realAnalytics.visits,
    };

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
           analytics={analytics}
        />   
    )
}

export default Admin;