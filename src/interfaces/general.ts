export type Breakpoint = 'desktop' | 'tablet' | 'mobile'

export interface IconItem {
    strokeColor?: string,
    fillColor?: string,
    iconClass?: string,
    size?: number,
}

export interface IStackTooltip {
    id: number,
    title: string,
    text: string
}

export interface IProjectStack {
    id: number,
    name: string,
    icon: string,
    tooltip: IStackTooltip
}

export interface IFeatureItem {
    id: number,
    title: string,
    text: string,
    icon: string,
    photo: string
}

export interface IProjectDescription {
    id: number,
    title: string;
    icon: string,
    content: string;
}

interface IMertics {
    id: number,
    icon: string,
    title: string,
    text: string,
    current: number,
    max: number,
    type: 'score' | 'time'
}

interface ICommit {
    id: number,
    name: string,
    date: string,
    text: string
}


export interface IProject {
    id: number,
    category: string,
    mainImg: string,
    images: string[],
    teamType: 'solo' | 'duo' | 'team',
    name: string,
    shortDescrition: string,
    stack: IProjectStack[],
    keyFeatures: IFeatureItem[],
    description: IProjectDescription[],
    metrics: IMertics[],
    commits: ICommit[],
    developmentTime: string,
    date: string,
}


export interface TooltipConfig {
    text: string,
    title?: string,
    date?: string,
    type?: 'lvl1' | 'lvl2' | 'lvl3',
    delay?: number,
    fakeWidth?: number, // Предполагаемая ширина(приблизительная) для расчётов положения (чтобы не вылезало за края). Для мало текста +- 100, для большого +- 400
    offset?: number,
    placement?: 'top' | 'bottom' | 'left' | 'right';
}


export interface Skill {
    id: number,
    name: string,
    score: number
}


export interface IFooterItem {
    id: number,
    text: string,
    icon: string
    link?: string,
}


export interface Stack {
    id: number,
    name: string
}


export interface WorkExperience {
    id: number,
    workingPeriod: {
        startDate: string,
        endDate: string
    },
    organization: string,
    position: string,
    description: string
}


export interface AboutMe {
    birth: number,
    placeBirth: string,
    education: string,
    location: string,
    workExperience: WorkExperience[],
    shortBio: string
}