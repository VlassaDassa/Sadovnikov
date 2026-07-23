import React from "react";

import ClientPageWrapper from "./ClientPageWrapper";
import ErrorPage from "@/components/shared/ErrorPage";

import { transformProject } from "@/lib/transformers/project";
import { IProject, Skill, Stack, IFooterItem } from "@/interfaces/general";
import prisma from "@/lib/prisma";
import { IAnalyticsDashboard } from "@/interfaces/analytics"; 
import { getAnalyticsDashboardSafe } from '@/lib/umami/getAnalyticsDashboardSafe';





const Admin: React.FC = async () => {
    let recentProjects: IProject[] = []
    let skills: Skill[] = []
    let stack: Stack[] = []
    let footer: IFooterItem[] = []
    let analytics: IAnalyticsDashboard = {
        visits: [],
        devices: [],
        sources: [],
        summary: {
            pageviews: 0,
            visitors: 0,
            visits: 0,
            bounceRate: 0,
            averageVisitTime: 0
        },
    }
    

    try {
    const [
        skillsResult,
        stackResult,
        footerResult,
        analyticsResult,
        rawRecentProjects,
    ] = await Promise.all([
        prisma.skill.findMany(),
        prisma.stack.findMany(),
        prisma.footerItem.findMany(),
        getAnalyticsDashboardSafe(30),
        prisma.project.findMany({
            include: {
                images: true,
                stack: true,
                description: true,
                metrics: true,
                commits: true,
                keyFeatures: true,
            },
        }),
    ]);

    skills = skillsResult;
    stack = stackResult;
    footer = footerResult;
    analytics = analyticsResult;
    recentProjects = rawRecentProjects.map((proj) => transformProject(proj));
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Unknown error';

        return <ErrorPage error={errorMessage} />;
    }


    return (
        <ClientPageWrapper 
           recentProjects={recentProjects} 
           skills={skills} 
           stack={stack} 
           footer={footer} 
           analytics={analytics}
        />   
    )
}

export default Admin;