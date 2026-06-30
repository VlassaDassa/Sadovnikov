'use client'

import React from "react";
import { Cell, Pie, PieChart } from 'recharts';

import SectionBackground from "../../general/sectionBackground";
import DashboardTitle from "../../general/dashboardTitle";
import ChartTooltip from "../../general/chartTooltip";

import { IDevices } from "@/mockData/adminCharts";

import styles from './index.module.scss';


interface DeviceChartProps {
    devices: IDevices[]
}

const DeviceChart: React.FC<DeviceChartProps> = ({ devices }) => {
    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <DashboardTitle text="DEVICES" />
                <div className={styles.wrapper}>
                    <PieChart style={{ width: '100%', maxWidth: '160px', maxHeight: '160px', aspectRatio: 1 }} responsive>
                        <Pie
                            data={devices}
                            dataKey="percentage"
                            nameKey="device"
                            innerRadius="65%"
                            outerRadius="100%"
                            paddingAngle={2}
                            tabIndex={-1}
                            stroke="none" 
                        >
                            {
                                devices.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke='none'
                                        style={{
                                            filter: `drop-shadow(0 0 6px rgba(63, 28, 223, 0.9))`
                                        }}
                                    />
                                ))
                            }
                        </Pie>
                        <ChartTooltip type='devices' />
                    </PieChart>

                    <div className={styles.labelWrapper}>
                        {devices.map((item, index) => (
                            <div key={item.device} className={styles.itemWrapper}>
                                <div style={{ background: item.color }} className={styles.rectangle}></div>
                                <p className={styles.label}>{item.percentage}% <span className={styles.name}>{item.device}</span></p>
                            </div>
                        ))}
                    </div>
                </div>

                

            </SectionBackground>
        </section>
    )
}

export default DeviceChart; 