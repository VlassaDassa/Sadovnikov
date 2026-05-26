'use client'

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Brush,
} from 'recharts';

import SectionBackground from '../general/sectionBackground';
import DashboardTitle from '../general/dashboardTitle';

import { visits } from '@/mockData/adminCharts';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';



const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const text = payload[0].value >= 1000 
                        ? `${(payload[0].value / 1000).toFixed(1)}k` 
                        : payload[0].value

        return (
            <div className={styles.customTooltip}>
                <p className={styles.tooltipLabel}>{label}</p>
                <p className={styles.tooltipValue}>
                    {text}
                </p>
            </div>
        );
    }
    return null;
};


const VisitChart: React.FC = () => {
    const formatYAxis = (value: number) => {
        if (value === 0) return '0';
        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
        return value.toString();
    };

    const getFilteredData = () => {
        return visits.filter((_, index) => index % 7 === 0);
    };
    const filteredXTicks = getFilteredData().map(item => item.day);

    return (
        <section className={`${styles.section} container`}>
            <SectionBackground>
                <DashboardTitle text={'VISITS'} />

                <ResponsiveContainer width="100%" height={350}> 
                    <AreaChart data={visits}>
                        <XAxis 
                            className={styles.axisX} 
                            dataKey="day" 
                            tick={{ 
                                fill: cssVars.neutral_600,
                                fontSize: 10,
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: cssVars.semi_bold
                            }}
                            ticks={filteredXTicks}
                            interval={0}
                        />
                        <YAxis 
                            className={styles.axisY} 
                            tickFormatter={formatYAxis}
                            domain={[0, 2600]}
                                ticks={[0, 500, 1000, 1500, 2000, 2500]}
                            tick={{ 
                                fill: cssVars.neutral_600,
                                fontSize: 10,
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: cssVars.semi_bold
                            }}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={cssVars.brand_900} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={cssVars.brand_900} stopOpacity={0} />
                            </linearGradient>
                            </defs>
                        <Area type="monotone" strokeWidth='2' dataKey="count" stroke={cssVars.brand_900} fill="url(#colorUv)" />

                        <Brush
                            dataKey="day"          
                            height={30}            
                            stroke={cssVars.neutral_950}     
                            fill={cssVars.neutral_1000}        
                            travellerWidth={10}    
                            startIndex={0}         
                            endIndex={7}         
                        >
                            <AreaChart>            
                                <Area dataKey="count" fill={cssVars.brand_900} fillOpacity={0.6} />
                            </AreaChart>
                        </Brush>
                        </AreaChart>
                </ResponsiveContainer>
            </SectionBackground>
        </section>

        
    )
    
}

export default VisitChart;