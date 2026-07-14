import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis,
  ResponsiveContainer, Brush,
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import SectionBackground from '@/components/admin/general/sectionBackground';
import DashboardTitle from '@/components/admin/general/dashboardTitle';
import ChartTooltip from '@/components/admin/general/chartTooltip';

import { IVisits } from '@/mockData/adminCharts';

import { cssVars } from '@/styles/cssVariables';
import styles from './index.module.scss';



interface VisitChartProps {
    visits: IVisits[]
}

const VisitChart: React.FC<VisitChartProps> = ({ visits }) => {
    const windowWidth = useSelector((state: RootState) => state.breakpoint.windowWidth)

    const handleResize = () => {
        if (windowWidth < 550) {
            return 10;
        } else if (windowWidth < 900) {
            return 14;
        } else {
            return 16;
        }
    }

    const formatYAxis = (value: number) => {
        if (value === 0) return '0';
        if (value >= 1000) return `${(value / 1000)}k`;
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

                <ResponsiveContainer width="100%" height={350} > 
                    <AreaChart tabIndex={-1} data={visits}>
                        <XAxis 
                            className={styles.axisX} 
                            dataKey="day" 
                            tick={{ 
                                fill: cssVars.neutral_600,
                                fontSize: handleResize(),
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: cssVars.semi_bold
                            }}
                            ticks={filteredXTicks}
                            interval={0}
                            tabIndex={-1}
                        />
                        <YAxis 
                            className={styles.axisY} 
                            tickFormatter={formatYAxis}
                            domain={[0, 2600]}
                                ticks={[0, 500, 1000, 1500, 2000, 2500]}
                            tick={{ 
                                fill: cssVars.neutral_600,
                                fontSize: handleResize(),
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: cssVars.semi_bold
                            }}
                            tabIndex={-1}
                        />

                        <ChartTooltip type='visits' />

                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={cssVars.brand_900} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={cssVars.brand_900} stopOpacity={0} />
                            </linearGradient>
                            </defs>
                        <Area tabIndex={-1} type="monotone" strokeWidth='2' dataKey="count" stroke={cssVars.brand_900} fill="url(#colorUv)" />

                        <Brush
                            dataKey="day"          
                            height={30}            
                            stroke={cssVars.neutral_950}     
                            fill={cssVars.neutral_1000}        
                            travellerWidth={10}    
                            startIndex={0}         
                            endIndex={7}     
                            tabIndex={-1}    
                        >
                            <AreaChart tabIndex={-1}>            
                                <Area tabIndex={-1} dataKey="count" fill={cssVars.brand_900} fillOpacity={0.6} />
                            </AreaChart>
                        </Brush>
                        </AreaChart>
                </ResponsiveContainer>

                
            </SectionBackground>
        </section>
    )
    
}

export default VisitChart;