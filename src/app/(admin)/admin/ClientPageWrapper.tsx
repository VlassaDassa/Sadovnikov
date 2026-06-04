'use client'

import React from "react";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import VisitChart from "@/components/admin/main/visitChart";
import DeviceChart from "@/components/admin/main/deviceChart";
import TrafficSource from "@/components/admin/main/trafficSource";
import QuickEdit from "@/components/admin/main/quickEdit";
import RecentProjects from "@/components/admin/main/recentProjects";
import AnimatedSection from '@/components/shared/AnimatedScroll';
import EditSkillsModal from '@/components/admin/modals/editSkillsModal';
import EditFooterModal from "@/components/admin/modals/editFooterModal";
import EditMyStackModal from "@/components/admin/modals/editMyStackModal";

import styles from './index.module.scss';



const ClientPageWrapper: React.FC = () => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    const isEditSkillsModalOpen = useSelector((state: RootState) => state.uiState.isEditSkillsModalOpen)
    const isEditFooterModalOpen = useSelector((state: RootState) => state.uiState.isEditFooterModalOpen)
    const isEditMyStackModalOpen = useSelector((state: RootState) => state.uiState.isEditMyStackModalOpen)
    const modals = (
        <>
            {isEditSkillsModalOpen && <EditSkillsModal />}
            {isEditFooterModalOpen && <EditFooterModal />}
            {isEditMyStackModalOpen && <EditMyStackModal />}
        </>
    )
    
    if (breakpoint === 'mobile') {
        return (
            <main className={styles.main}>
                {modals}

                <AnimatedSection animation='fade-up'>
                    <VisitChart />
                </AnimatedSection>
                
                <AnimatedSection animation='fade-right'>
                    <DeviceChart />
                </AnimatedSection>
                
                <AnimatedSection animation='fade-left'>
                    <TrafficSource />
                </AnimatedSection>

                <AnimatedSection animation='fade-up'>
                    <QuickEdit />
                </AnimatedSection>

                <AnimatedSection animation='fade-down'>
                    <RecentProjects />
                </AnimatedSection>
            </main>
        )
    }
    else if (breakpoint === 'tablet') {
        return (
            <main className={`${styles.main}`}>
                {modals}

                <AnimatedSection animation='fade-up'>
                    <VisitChart />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <QuickEdit />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <RecentProjects />
                </AnimatedSection>

                <AnimatedSection animation='fade-down'>
                    <div className={`${styles.deviceAndTrafficWrapper} container`}>
                        <DeviceChart />
                        <TrafficSource />
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
                        <VisitChart />
                        <DeviceChart />
                    </div>
                </AnimatedSection>
                
                
                <AnimatedSection animation='fade-left'>
                    <div className={`container ${styles.quickEditAndTrafficWrapper}`}>
                        <QuickEdit />
                        <TrafficSource />
                    </div>
                </AnimatedSection>
                
                <AnimatedSection animation='fade-down'>
                    <RecentProjects />
                </AnimatedSection>
            </main>
        )
    }
}

export default ClientPageWrapper;