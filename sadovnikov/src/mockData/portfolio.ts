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
    }
]

export type { IProject };
