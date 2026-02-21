import chessImg from './../assets/images/chess.jpg';


interface IProject {
    id: number;
    type: string;
    x: number;
    y: number;
    name: string;
    description: string;
    stack: string[];
    img: string;
}


export const projectsData: IProject[] = [
    {
        id: 1,
        type: 'Site',
        x: 200,
        y: 200,
        name: 'Chess',
        description: 'Site-card + Admin panel',
        stack: ['React', 'TypeScript', 'Next.JS', 'MongoDB', 'SASS', 'Redux'],
        img: chessImg
    },

    {
        id: 2,
        type: 'Site',
        x: 1000,
        y: 200,
        name: 'Chess',
        description: 'Site-card + Admin panel',
        stack: ['React', 'TypeScript', 'Next.JS', 'MongoDB', 'SASS', 'Redux'],
        img: chessImg
    },

    {
        id: 3,
        type: 'Site',
        x: 2000,
        y: 200,
        name: 'Chess',
        description: 'Site-card + Admin panel',
        stack: ['React', 'TypeScript', 'Next.JS', 'MongoDB', 'SASS', 'Redux'],
        img: chessImg
    },

    {
        id: 4,
        type: 'Site',
        x: 3000,
        y: 200,
        name: 'Chess',
        description: 'Site-card + Admin panel',
        stack: ['React', 'TypeScript', 'Next.JS', 'MongoDB', 'SASS', 'Redux'],
        img: chessImg
    },
]

export type { IProject };
