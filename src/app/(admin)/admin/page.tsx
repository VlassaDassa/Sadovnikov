import React from "react";

import VisitChart from "@/components/admin/visitChart";
import DeviceChart from "@/components/admin/deviceChart";
import TrafficSource from "@/components/admin/trafficSource";
import QuickEdit from "@/components/admin/quickEdit";

import styles from './index.module.scss';

const Admin: React.FC = () => {
    return (
        <main className={styles.main}>
            <VisitChart />
            <DeviceChart />
            <TrafficSource />
            <QuickEdit />
        </main>
    )
}

export default Admin;