import { Dispatch, SetStateAction } from "react";

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
    titleRu?: string,
    text: string
    textRu?: string
}

export interface IProjectStack {
    id: number,
    name: string,
    icon: string,
    tooltip?: IStackTooltip,
}

export interface IFeatureItem {
    id: number,
    title: string,
    titleRu?: string,

    text: string,
    textRu?: string,

    icon: string,
    photo: string
}

export interface IProjectDescription {
    id: number,

    title: string;
    titleRu?: string;

    icon: string,

    content: string;
    contentRu?: string;
}

export interface IMertics {
    id: number,
    icon: string,

    title: string,
    titleRu?: string,

    text: string,
    textRu?: string,

    current: string | number;
    max: number,
    type: 'score' | 'time'
}

export interface ICommit {
    id: number,
    name: string,
    nameRu?: string,
    date: string,
    dateRu?: string,
    text: string,
    textRu?: string,
    order: number
}

export interface IImages {
    id: number,
    image: string,
    main: boolean
}


export interface IProject {
    id: number,
    category: string,
    images: IImages[],
    teamType: string,
    numberTeam: number,
    name: string,

    shortDescription: string,
    shortDescriptionRu?: string,

    previewDescription: string,
    previewDescriptionRu?: string,

    stack: IProjectStack[],
    keyFeatures: IFeatureItem[],
    description: IProjectDescription[],
    metrics: IMertics[],
    commits: ICommit[],

    developmentTime: string,
    developmentTimeRu?: string,

    date: string,
    dateRu?: string,

    gitHubLink: string,
    demoLink: string,
}


export interface TooltipConfig {
    text?: string,
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
    link?: string | null,
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
    organizationRu?: string,

    position: string,
    positionRu?: string,

    description: string
    descriptionRu?: string
}


export interface AboutMe {
    birth: number,

    placeBirth: string,
    placeBirthRu?: string,

    education: string,
    educationRu?: string,

    location: string,
    locationRu?: string,

    workExperience: WorkExperience[],
    
    shortBio: string
    shortBioRu?: string
}


export interface IProjectPreviewData {
    date: string,
    developmentTime: string,
    teamType: string,
    name: string,
    category: string,
    previewDescription: string,
    images: IImages[],
    gitHubLink: string,
    demoLink: string,
}


export interface EditProjectProps {
    project: IProject,
    setData: Dispatch<SetStateAction<IProject>>,
    setIsSaving: Dispatch<SetStateAction<boolean>>
}

