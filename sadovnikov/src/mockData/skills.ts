interface Skill {
    id: number,
    name: string,
    score: number,
};

type SkillsList = Skill[];

const skillList: SkillsList = [
    {
        id: 1,
        name: 'FRONTEND',
        score: 9
    },

    {
        id: 2,
        name: 'BACKEND',
        score: 8
    },

    {
        id: 3,
        name: 'WEB DESIGN',
        score: 6
    },

    {
        id: 4,
        name: 'VIDEO EDITING',
        score: 4
    },
];

export default skillList;
