'use client'

import React from "react";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import EditSkillsModal from '@/components/admin/modals/editSkillsModal';
import EditFooterModal from "@/components/admin/modals/editFooterModal";
import EditMyStackModal from "@/components/admin/modals/editMyStackModal";
import VisitChart from "@/components/admin/main/visitChart";
import DeviceChart from "@/components/admin/main/deviceChart";
import TrafficSource from "@/components/admin/main/trafficSource";
import QuickEdit from "@/components/admin/main/quickEdit";
import RecentProjects from "@/components/admin/main/recentProjects";
import AnimatedSection from '@/components/shared/AnimatedScroll';

import { IProject, Skill, Stack, IFooterItem } from "@/interfaces/general";
import { IVisits, IDevices, ITrafficSource } from "@/mockData/adminCharts";

import styles from './index.module.scss';


interface ClientPageWrapperProps {
    visitsChart: IVisits[]
    deviceChart: IDevices[]
    trafficSource: ITrafficSource[]
    recentProjects: IProject[]
    skills: Skill[]
    stack: Stack[]
    footer: IFooterItem[]
}

const ClientPageWrapper: React.FC<ClientPageWrapperProps> = ({
    visitsChart, deviceChart, trafficSource, recentProjects, skills, stack, footer
}) => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const isEditSkillsModalOpen = useSelector((state: RootState) => state.uiState.isEditSkillsModalOpen)
    const isEditFooterModalOpen = useSelector((state: RootState) => state.uiState.isEditFooterModalOpen)
    const isEditMyStackModalOpen = useSelector((state: RootState) => state.uiState.isEditMyStackModalOpen)

    
    const modals = (
        <>
            {isEditSkillsModalOpen && <EditSkillsModal initialSkills={skills} />}
            {isEditFooterModalOpen && <EditFooterModal footer={footer} />}
            {isEditMyStackModalOpen && <EditMyStackModal initialStack={stack} />}
        </>
    )
    
    if (breakpoint === 'mobile') {
        return (
            <main className={styles.main}>
                {modals}

                <AnimatedSection animation='fade-up'>
                    <VisitChart visits={visitsChart} />
                </AnimatedSection>
                
                <AnimatedSection animation='fade-right'>
                    <DeviceChart devices={deviceChart} />
                </AnimatedSection>
                
                <AnimatedSection animation='fade-left'>
                    <TrafficSource source={trafficSource} />
                </AnimatedSection>

                <AnimatedSection animation='fade-up'>
                    <QuickEdit />
                </AnimatedSection>

                <AnimatedSection animation='fade-down'>
                    <RecentProjects projects={recentProjects} />
                </AnimatedSection>
            </main>
        )
    }
    else if (breakpoint === 'tablet') {
        return (
            <main className={`${styles.main}`}>
                {modals}

                <AnimatedSection animation='fade-up'>
                    <VisitChart visits={visitsChart} />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <QuickEdit />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <RecentProjects projects={recentProjects} />
                </AnimatedSection>

                <AnimatedSection animation='fade-down'>
                    <div className={`${styles.deviceAndTrafficWrapper} container`}>
                        <DeviceChart devices={deviceChart} />
                        <TrafficSource source={trafficSource} />
                    </div>
                </AnimatedSection>
            </main>
        )
        
    }
    else {
        return (
            <main className={styles.main}>
                {modals}

                <AnimatedSection animation='fade-right'>
                    <div className={`container ${styles.visitAndDeviceWrapper}`}>
                        <VisitChart visits={visitsChart} />
                        <DeviceChart devices={deviceChart} />
                    </div>
                </AnimatedSection>
                
                
                <AnimatedSection animation='fade-left'>
                    <div className={`container ${styles.quickEditAndTrafficWrapper}`}>
                        <QuickEdit />
                        <TrafficSource source={trafficSource} />
                    </div>
                </AnimatedSection>
                
                <AnimatedSection animation='fade-down'>
                    <RecentProjects projects={recentProjects} />
                </AnimatedSection>
            </main>
        )
    }
}

export default ClientPageWrapper;