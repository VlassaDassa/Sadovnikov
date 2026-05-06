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
    stack: string[]
}


export interface TooltipConfig {
    text: string,
    title?: string,
    date?: string,
    type?: 'lvl1' | 'lvl2' | 'lvl3',
    delay?: number,
    offset?: number,
    placement?: 'top' | 'bottom' | 'left' | 'right'; 
}