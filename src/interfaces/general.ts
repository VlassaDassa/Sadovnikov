export interface Breakpoint {
    breakpoint: 'mobile' | 'tablet' | 'desktop'
}

export interface DecorativeText {
    default: string,
    alter: string
}

export interface IconItem {
    strokeColor?: string,
    fillColor?: string,
    iconClass?: string,
    size?: number,
}