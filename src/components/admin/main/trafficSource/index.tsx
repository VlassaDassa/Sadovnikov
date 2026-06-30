import React from "react";

import SectionBackground from "@/components/admin/general/sectionBackground";
import DashboardTitle from "@/components/admin/general/dashboardTitle";
import ProgressBar from "@/components/shared/ProgressBar";

import { ITrafficSource } from "@/mockData/adminCharts";

import styles from './index.module.scss';



interface TrafficSourceProps {
    source: ITrafficSource[]
}

const TrafficSource: React.FC<TrafficSourceProps> = ({ source }) => {
    return (
        <section className={`${styles.section} container`}>
            
            <SectionBackground>
                <DashboardTitle text={'TRAFFIC SOURCE'} />

                <div className={styles.wrapper}>
                    {source.map((item, index) => (
                        <div key={item.source} className={styles.item}>
                            <p className={styles.itemText}>{item.source}</p>

                            <ProgressBar
                                type='source'
                                max={100}
                                current={item.percentage}
                            />

                            <p className={styles.itemText}>{item.percentage}%</p>
                        </div>

                        
                    ))}
                </div>

                
            </SectionBackground>
        </section>
        
    )
}

export default TrafficSource;