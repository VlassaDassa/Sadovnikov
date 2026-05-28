'use client'

import React from "react";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import VisitChart from "@/components/admin/visitChart";
import DeviceChart from "@/components/admin/deviceChart";
import TrafficSource from "@/components/admin/trafficSource";
import QuickEdit from "@/components/admin/quickEdit";
import RecentProjects from "@/components/admin/recentProjects";

import styles from './index.module.scss';

const ClientPageWrapper: React.FC = () => {
    const breakpoint = useSelector((state: RootState) => state.breakpoint.value)
    if (breakpoint === 'mobile') {
        return (
            <main className={styles.main}>
                <VisitChart />
                <DeviceChart />
                <TrafficSource />
                <QuickEdit />
                <RecentProjects />
            </main>
        )
        
    }

    else if (breakpoint === 'tablet') {
        return (
            <main className={styles.main}>
                <VisitChart />
                <QuickEdit />
                <RecentProjects />
                <div className={styles.deviceAndTrafficWrapper}>
                    <DeviceChart />
                    <TrafficSource />
                </div>
            </main>
        )
        
    }
    else {
        return (
            <main className={styles.main}>
                <div className={styles.visitAndDeviceWrapper}>
                    <VisitChart />
                    <DeviceChart />
                </div>
                
                <div className={styles.quickEditAndTrafficWrapper}>
                    <QuickEdit />
                    <TrafficSource />
                </div>
                
                <RecentProjects />
            </main>
        )
    }
}

export default ClientPageWrapper;