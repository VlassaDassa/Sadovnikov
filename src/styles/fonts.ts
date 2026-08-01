import { Montserrat, Ubuntu } from 'next/font/google';

export const montserrat = Montserrat({
    subsets: [
        'latin',
        'cyrillic',
    ],
    style: [
        'normal',
        'italic'
    ],
    variable: '--font-montserrat',
    display: 'swap'
});


export const ubuntu = Ubuntu({
    subsets: [
        'latin',
        'cyrillic'
    ],

    weight: ['300', '400', '500', '700'],

    style: ['normal', 'italic'],
    variable: '--font-ubuntu',
    display: 'swap'
})


export const fontVariables = [montserrat.variable, ubuntu.variable].join(' ');