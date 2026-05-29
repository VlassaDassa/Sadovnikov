'use client'

import React from "react";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import VisitChart from "@/components/admin/visitChart";
import DeviceChart from "@/components/admin/deviceChart";
import TrafficSource from "@/components/admin/trafficSource";
import QuickEdit from "@/components/admin/quickEdit";
import RecentProjects from "@/components/admin/recentProjects";
import AnimatedSection from '@/components/shared/AnimatedScroll';

import styles from './index.module.scss';



const ClientPageWrapper: React.FC = () => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    if (breakpoint === 'mobile') {
        return (
            <main className={styles.main}>
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
            <main className={`${styles.main} container`}>
                <AnimatedSection animation='fade-up'>
                    <VisitChart />
                </AnimatedSection>

                <AnimatedSection animation='fade-right'>
                    <QuickEdit />
                </AnimatedSection>

                <AnimatedSection animation='fade-left'>
                    <RecentProjects />
                </AnimatedSection>


                <div className={`${styles.deviceAndTrafficWrapper} container`}>
                    <AnimatedSection animation='fade-left'>
                        <DeviceChart />
                    </AnimatedSection>

                    <AnimatedSection animation='fade-right'>
                        <TrafficSource />
                    </AnimatedSection>
                </div>
            </main>
        )
        
    }
    else {
        return (
            <main className={styles.main}>
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