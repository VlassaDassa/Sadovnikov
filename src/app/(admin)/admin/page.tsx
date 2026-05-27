import React from "react";

import VisitChart from "@/components/admin/visitChart";

import DeviceChart from "@/components/admin/deviceChart";

import styles from './index.module.scss';

const Admin: React.FC = () => {
    return (
        <main className={styles.main}>
            <VisitChart />
            <DeviceChart />
        </main>
    )
}

export default Admin;