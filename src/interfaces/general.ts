    import { StaticImageData } from "next/image"



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