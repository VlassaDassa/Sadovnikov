import React from "react";

import SectionBackground from "../general/sectionBackground";
import DashboardTitle from "../general/dashboardTitle";
import ProgressBar from "@/components/shared/ProgressBar";

import { source } from "@/mockData/adminCharts";

import styles from './index.module.scss';




const TrafficSource: React.FC = () => {
    return (
        <section className={`${styles.section} container`}>
            
            <SectionBackground>
                <DashboardTitle text={'TRAFFIC SOURCE'} />

                <div className={styles.wrapper}>
                    {source.map((item, index) => (
                        <div className={styles.item}>
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