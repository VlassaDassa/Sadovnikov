import { cssVars } from "@/styles/cssVariables";


export interface IVisits {
    day: string,
    count: number
}

export interface IDevices {
    device: string, //'desktop' | 'mobile' | 'tablet'
    percentage: number,
    color: string
}

export interface ITrafficSource {
    source: string, // 'Desktop' | 'Search Engines' | 'Social Media' | 'Referrals',
    percentage: number
}

export const visits: IVisits[] = [
    { day: '1 March', count: 245 },
    { day: '2 March', count: 89 },
    { day: '3 March', count: 540 },
    { day: '4 March', count: 1200 },
    { day: '5 March', count: 890 },
    { day: '6 March', count: 2100 },
    { day: '7 March', count: 1670 },
    { day: '8 March', count: 430 },
    { day: '9 March', count: 980 },
    { day: '10 March', count: 2500 },
    { day: '11 March', count: 1340 },
    { day: '12 March', count: 560 },
    { day: '13 March', count: 1890 },
    { day: '14 March', count: 720 },
    { day: '15 March', count: 2010 },
    { day: '16 March', count: 1150 },
    { day: '17 March', count: 440 },
    { day: '18 March', count: 2280 },
    { day: '19 March', count: 950 },
    { day: '20 March', count: 310 },
    { day: '21 March', count: 1780 },
    { day: '22 March', count: 620 },
    { day: '23 March', count: 1450 },
    { day: '24 March', count: 500 },
    { day: '25 March', count: 2350 },
    { day: '26 March', count: 830 },
    { day: '27 March', count: 1100 },
    { day: '28 March', count: 390 },
    { day: '29 March', count: 1920 },
    { day: '30 March', count: 670 },
    { day: '31 March', count: 1550 },
];

export const devices: IDevices[] = [
    { device: 'desktop', percentage: 62, color: cssVars.brand_700 },
    { device: 'mobile', percentage: 18, color: cssVars.brand_900 },
    { device: 'tablet', percentage: 20, color: cssVars.brand_500 },
];

export const source: ITrafficSource[] = [
    {
        source: 'Desktop',
        percentage: 50,
    },

    {
        source: 'Search Engines',
        percentage: 30,
    },

    {
        source: 'Social Media',
        percentage: 10,
    },

    {
        source: 'Referrals',
        percentage: 10,
    }
]