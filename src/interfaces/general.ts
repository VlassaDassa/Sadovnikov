export type Breakpoint = 'desktop' | 'tablet' | 'mobile'

export interface IconItem {
    strokeColor?: string,
    fillColor?: string,
    iconClass?: string,
    size?: number,
}


export interface Project {
    id: number,
    category: string,
    img: string,
    name: string,
    shortDescrition: string,
    stack: string[],
    date: string
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
    workingPeriod: string,
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