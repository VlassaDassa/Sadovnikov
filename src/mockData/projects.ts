import type { IProject } from '@/interfaces/general';


const specTechno = '/images/mockImages/specTecno.png'
const MongoDBImg = '/images/mockImages/MongoDB.svg'
const typeScriptImg = '/images/mockImages/MongoDB.svg'
const reactImg = '/images/mockImages/MongoDB.svg'
const nextJSImg = '/images/mockImages/MongoDB.svg'
const reduxImg = '/images/mockImages/MongoDB.svg'
const sassImg = '/images/mockImages/MongoDB.svg'

// Изображения должны быть в пропорции 11:9 (h:252px w:309px)
const featureIcon = '/images/mockImages/featureIcon.svg';
const featurePhoto1 = '/images/mockImages/featurePhoto.png';
const featurePhoto2 = '/images/mockImages/featurePhoto_1.png';


export const projects: IProject[] = [
    {
        id: 1,
        category: 'Site',
        mainImg: specTechno,
        images: [specTechno, specTechno, specTechno, specTechno],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            {
                id: 1,
                name: 'MongoDB',
                icon: MongoDBImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'TypeScript',
                icon: typeScriptImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'React',
                icon: reactImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'NextJS',
                icon: nextJSImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'Redux',
                icon: reduxImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'SASS',
                icon: sassImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
        ],
        keyFeatures: [
            {
                id: 1,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto1
            },
            {
                id: 2,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: specTechno
            },
            {
                id: 3,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto2
            }
        ],
        description: [
            {
                id: 1,
                title: 'Site',
                icon: 'text',
                content: 'React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools. React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.'
            },
            {
                id: 2,
                title: 'WHY I STARTED',
                icon: 'rocket',
                content: 'The project was developed over several months, including design, architecture, and optimization.'
            },
            {
                id: 3,
                title: 'CHALLENGES & SOLUTIONS',
                icon: 'puzzle',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 4,
                title: 'CONCLUSION',
                icon: 'flag',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 5,
                title: 'FUTURE PLANS',
                icon: 'time',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            }
        ],
        metrics: [
            {
                id: 1,
                icon: 'speed',
                title: 'Performance',
                text: 'Speed and performance',
                current: 95,
                max: 100,
                type: 'score'
            },
            {
                id: 2,
                icon: 'loadTime',
                title: 'Load time',
                text: 'Average loading time',
                current: 1.2,
                max: 10,
                type: 'time'
            },
            {
                id: 3,
                icon: 'search',
                title: 'SEO',
                text: 'Search engine optimization',
                current: 85,
                max: 100,
                type: 'score'
            },
            {
                id: 4,
                icon: 'accessibility',
                title: 'Accessibility',
                text: 'Lighehouse, A11y',
                current: 85,
                max: 100,
                type: 'score'
            }
        ],
        commits: [
            {
                id: 1,
                name: 'First commit',
                date: 'June 28, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 2,
                name: 'Added “Header”',
                date: 'June 23, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 3,
                name: 'Fix “Preview”',
                date: 'June 22, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 4,
                name: 'Added “Contacts”, fix errors, animations',
                date: 'June 21, 2026',
                text: 'First initialization commit, start development project'
            },
        ],
        date: 'June 28, 2026',
        developmentTime: '3 week',
    },
    {
        id: 2,
        category: 'Site',
        mainImg: specTechno,
        images: [specTechno, specTechno, specTechno, specTechno],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            {
                id: 1,
                name: 'MongoDB',
                icon: MongoDBImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'TypeScript',
                icon: typeScriptImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'React',
                icon: reactImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'NextJS',
                icon: nextJSImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'Redux',
                icon: reduxImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'SASS',
                icon: sassImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
        ],
        keyFeatures: [
            {
                id: 1,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto1
            },
            {
                id: 2,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: specTechno
            },
            {
                id: 3,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto2
            }
        ],
        description: [
            {
                id: 1,
                title: 'Site',
                icon: 'text',
                content: 'React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools. React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.'
            },
            {
                id: 2,
                title: 'WHY I STARTED',
                icon: 'rocket',
                content: 'The project was developed over several months, including design, architecture, and optimization.'
            },
            {
                id: 3,
                title: 'CHALLENGES & SOLUTIONS',
                icon: 'puzzle',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 4,
                title: 'CONCLUSION',
                icon: 'flag',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 5,
                title: 'FUTURE PLANS',
                icon: 'time',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            }
        ],
        metrics: [
            {
                id: 1,
                icon: 'speed',
                title: 'Performance',
                text: 'Speed and performance',
                current: 95,
                max: 100,
                type: 'score'
            },
            {
                id: 2,
                icon: 'loadTime',
                title: 'Load time',
                text: 'Average loading time',
                current: 1.2,
                max: 10,
                type: 'time'
            },
            {
                id: 3,
                icon: 'search',
                title: 'SEO',
                text: 'Search engine optimization',
                current: 85,
                max: 100,
                type: 'score'
            },
            {
                id: 4,
                icon: 'accessibility',
                title: 'Accessibility',
                text: 'Lighehouse, A11y',
                current: 85,
                max: 100,
                type: 'score'
            }
        ],
        commits: [
            {
                id: 1,
                name: 'First commit',
                date: 'June 28, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 2,
                name: 'Added “Header”',
                date: 'June 23, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 3,
                name: 'Fix “Preview”',
                date: 'June 22, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 4,
                name: 'Added “Contacts”, fix errors, animations',
                date: 'June 21, 2026',
                text: 'First initialization commit, start development project'
            },
        ],
        date: 'June 28, 2026',
        developmentTime: '3 week',
    },
    {
        id: 3,
        category: 'Site',
        mainImg: specTechno,
        images: [specTechno, specTechno, specTechno, specTechno],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            {
                id: 1,
                name: 'MongoDB',
                icon: MongoDBImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'TypeScript',
                icon: typeScriptImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'React',
                icon: reactImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'NextJS',
                icon: nextJSImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'Redux',
                icon: reduxImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'SASS',
                icon: sassImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
        ],
        keyFeatures: [
            {
                id: 1,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto1
            },
            {
                id: 2,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: specTechno
            },
            {
                id: 3,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto2
            }
        ],
        description: [
            {
                id: 1,
                title: 'Site',
                icon: 'text',
                content: 'React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools. React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.'
            },
            {
                id: 2,
                title: 'WHY I STARTED',
                icon: 'rocket',
                content: 'The project was developed over several months, including design, architecture, and optimization.'
            },
            {
                id: 3,
                title: 'CHALLENGES & SOLUTIONS',
                icon: 'puzzle',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 4,
                title: 'CONCLUSION',
                icon: 'flag',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 5,
                title: 'FUTURE PLANS',
                icon: 'time',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            }
        ],
        metrics: [
            {
                id: 1,
                icon: 'speed',
                title: 'Performance',
                text: 'Speed and performance',
                current: 95,
                max: 100,
                type: 'score'
            },
            {
                id: 2,
                icon: 'loadTime',
                title: 'Load time',
                text: 'Average loading time',
                current: 1.2,
                max: 10,
                type: 'time'
            },
            {
                id: 3,
                icon: 'search',
                title: 'SEO',
                text: 'Search engine optimization',
                current: 85,
                max: 100,
                type: 'score'
            },
            {
                id: 4,
                icon: 'accessibility',
                title: 'Accessibility',
                text: 'Lighehouse, A11y',
                current: 85,
                max: 100,
                type: 'score'
            }
        ],
        commits: [
            {
                id: 1,
                name: 'First commit',
                date: 'June 28, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 2,
                name: 'Added “Header”',
                date: 'June 23, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 3,
                name: 'Fix “Preview”',
                date: 'June 22, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 4,
                name: 'Added “Contacts”, fix errors, animations',
                date: 'June 21, 2026',
                text: 'First initialization commit, start development project'
            },
        ],
        date: 'June 28, 2026',
        developmentTime: '3 week',
    },
    {
        id: 4,
        category: 'Site',
        mainImg: specTechno,
        images: [specTechno, specTechno, specTechno, specTechno],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            {
                id: 1,
                name: 'MongoDB',
                icon: MongoDBImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'TypeScript',
                icon: typeScriptImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'React',
                icon: reactImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'NextJS',
                icon: nextJSImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'Redux',
                icon: reduxImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'SASS',
                icon: sassImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
        ],
        keyFeatures: [
            {
                id: 1,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto1
            },
            {
                id: 2,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: specTechno
            },
            {
                id: 3,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto2
            }
        ],
        description: [
            {
                id: 1,
                title: 'Site',
                icon: 'text',
                content: 'React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools. React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.'
            },
            {
                id: 2,
                title: 'WHY I STARTED',
                icon: 'rocket',
                content: 'The project was developed over several months, including design, architecture, and optimization.'
            },
            {
                id: 3,
                title: 'CHALLENGES & SOLUTIONS',
                icon: 'puzzle',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 4,
                title: 'CONCLUSION',
                icon: 'flag',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 5,
                title: 'FUTURE PLANS',
                icon: 'time',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            }
        ],
        metrics: [
            {
                id: 1,
                icon: 'speed',
                title: 'Performance',
                text: 'Speed and performance',
                current: 95,
                max: 100,
                type: 'score'
            },
            {
                id: 2,
                icon: 'loadTime',
                title: 'Load time',
                text: 'Average loading time',
                current: 1.2,
                max: 10,
                type: 'time'
            },
            {
                id: 3,
                icon: 'search',
                title: 'SEO',
                text: 'Search engine optimization',
                current: 85,
                max: 100,
                type: 'score'
            },
            {
                id: 4,
                icon: 'accessibility',
                title: 'Accessibility',
                text: 'Lighehouse, A11y',
                current: 85,
                max: 100,
                type: 'score'
            }
        ],
        commits: [
            {
                id: 1,
                name: 'First commit',
                date: 'June 28, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 2,
                name: 'Added “Header”',
                date: 'June 23, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 3,
                name: 'Fix “Preview”',
                date: 'June 22, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 4,
                name: 'Added “Contacts”, fix errors, animations',
                date: 'June 21, 2026',
                text: 'First initialization commit, start development project'
            },
        ],
        date: 'June 28, 2026',
        developmentTime: '3 week',
    },
    {
        id: 5,
        category: 'Site',
        mainImg: specTechno,
        images: [specTechno, specTechno, specTechno, specTechno],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            {
                id: 1,
                name: 'MongoDB',
                icon: MongoDBImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'TypeScript',
                icon: typeScriptImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'React',
                icon: reactImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'NextJS',
                icon: nextJSImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'Redux',
                icon: reduxImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'SASS',
                icon: sassImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
        ],
        keyFeatures: [
            {
                id: 1,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto1
            },
            {
                id: 2,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: specTechno
            },
            {
                id: 3,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto2
            }
        ],
        description: [
            {
                id: 1,
                title: 'Site',
                icon: 'text',
                content: 'React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools. React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.'
            },
            {
                id: 2,
                title: 'WHY I STARTED',
                icon: 'rocket',
                content: 'The project was developed over several months, including design, architecture, and optimization.'
            },
            {
                id: 3,
                title: 'CHALLENGES & SOLUTIONS',
                icon: 'puzzle',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 4,
                title: 'CONCLUSION',
                icon: 'flag',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 5,
                title: 'FUTURE PLANS',
                icon: 'time',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            }
        ],
        metrics: [
            {
                id: 1,
                icon: 'speed',
                title: 'Performance',
                text: 'Speed and performance',
                current: 95,
                max: 100,
                type: 'score'
            },
            {
                id: 2,
                icon: 'loadTime',
                title: 'Load time',
                text: 'Average loading time',
                current: 1.2,
                max: 10,
                type: 'time'
            },
            {
                id: 3,
                icon: 'search',
                title: 'SEO',
                text: 'Search engine optimization',
                current: 85,
                max: 100,
                type: 'score'
            },
            {
                id: 4,
                icon: 'accessibility',
                title: 'Accessibility',
                text: 'Lighehouse, A11y',
                current: 85,
                max: 100,
                type: 'score'
            }
        ],
        commits: [
            {
                id: 1,
                name: 'First commit',
                date: 'June 28, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 2,
                name: 'Added “Header”',
                date: 'June 23, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 3,
                name: 'Fix “Preview”',
                date: 'June 22, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 4,
                name: 'Added “Contacts”, fix errors, animations',
                date: 'June 21, 2026',
                text: 'First initialization commit, start development project'
            },
        ],
        date: 'June 28, 2026',
        developmentTime: '3 week',
    },
    {
        id: 6,
        category: 'Site',
        mainImg: specTechno,
        images: [specTechno, specTechno, specTechno, specTechno],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            {
                id: 1,
                name: 'MongoDB',
                icon: MongoDBImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'TypeScript',
                icon: typeScriptImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'React',
                icon: reactImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'NextJS',
                icon: nextJSImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'Redux',
                icon: reduxImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'SASS',
                icon: sassImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
        ],
        keyFeatures: [
            {
                id: 1,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto1
            },
            {
                id: 2,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: specTechno
            },
            {
                id: 3,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto2
            }
        ],
        description: [
            {
                id: 1,
                title: 'Site',
                icon: 'text',
                content: 'React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools. React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.'
            },
            {
                id: 2,
                title: 'WHY I STARTED',
                icon: 'rocket',
                content: 'The project was developed over several months, including design, architecture, and optimization.'
            },
            {
                id: 3,
                title: 'CHALLENGES & SOLUTIONS',
                icon: 'puzzle',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 4,
                title: 'CONCLUSION',
                icon: 'flag',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 5,
                title: 'FUTURE PLANS',
                icon: 'time',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            }
        ],
        metrics: [
            {
                id: 1,
                icon: 'speed',
                title: 'Performance',
                text: 'Speed and performance',
                current: 95,
                max: 100,
                type: 'score'
            },
            {
                id: 2,
                icon: 'loadTime',
                title: 'Load time',
                text: 'Average loading time',
                current: 1.2,
                max: 10,
                type: 'time'
            },
            {
                id: 3,
                icon: 'search',
                title: 'SEO',
                text: 'Search engine optimization',
                current: 85,
                max: 100,
                type: 'score'
            },
            {
                id: 4,
                icon: 'accessibility',
                title: 'Accessibility',
                text: 'Lighehouse, A11y',
                current: 85,
                max: 100,
                type: 'score'
            }
        ],
        commits: [
            {
                id: 1,
                name: 'First commit',
                date: 'June 28, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 2,
                name: 'Added “Header”',
                date: 'June 23, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 3,
                name: 'Fix “Preview”',
                date: 'June 22, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 4,
                name: 'Added “Contacts”, fix errors, animations',
                date: 'June 21, 2026',
                text: 'First initialization commit, start development project'
            },
        ],
        date: 'June 28, 2026',
        developmentTime: '3 week',
    },
    {
        id: 7,
        category: 'Site',
        mainImg: specTechno,
        images: [specTechno, specTechno, specTechno, specTechno],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        stack: [
            {
                id: 1,
                name: 'MongoDB',
                icon: MongoDBImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'TypeScript',
                icon: typeScriptImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'React',
                icon: reactImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'NextJS',
                icon: nextJSImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'Redux',
                icon: reduxImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
            {
                id: 1,
                name: 'SASS',
                icon: sassImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. \
                            I was tired of writing multi-line JavaScript and wanted to learn something more\
                            in demand in the market. I decided to try React first, but it turned out that I liked \
                            it for its reactivity, ease, and interesting component approach '
                }
            },
        ],
        keyFeatures: [
            {
                id: 1,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto1
            },
            {
                id: 2,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: specTechno
            },
            {
                id: 3,
                title: 'Full responsive design',
                text: 'Initially, 3 versions were made for each project page \
                                    (desktop, tablet, mobile). And each page looks great on any screen \
                                    resolution. The Mobile First approach was used during \
                                    development for easy adaptation',
                icon: featureIcon,
                photo: featurePhoto2
            }
        ],
        description: [
            {
                id: 1,
                title: 'Site',
                icon: 'text',
                content: 'React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools. React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.React, Next.js, TypeScript, SCSS, Redux Toolkit, Swiper, and many other modern tools.'
            },
            {
                id: 2,
                title: 'WHY I STARTED',
                icon: 'rocket',
                content: 'The project was developed over several months, including design, architecture, and optimization.'
            },
            {
                id: 3,
                title: 'CHALLENGES & SOLUTIONS',
                icon: 'puzzle',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 4,
                title: 'CONCLUSION',
                icon: 'flag',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            },
            {
                id: 5,
                title: 'FUTURE PLANS',
                icon: 'time',
                content: 'Yes, the website uses Next.js SSR, semantic HTML, meta tags, and structured data for better SEO.'
            }
        ],
        metrics: [
            {
                id: 1,
                icon: 'speed',
                title: 'Performance',
                text: 'Speed and performance',
                current: 95,
                max: 100,
                type: 'score'
            },
            {
                id: 2,
                icon: 'loadTime',
                title: 'Load time',
                text: 'Average loading time',
                current: 1.2,
                max: 10,
                type: 'time'
            },
            {
                id: 3,
                icon: 'search',
                title: 'SEO',
                text: 'Search engine optimization',
                current: 85,
                max: 100,
                type: 'score'
            },
            {
                id: 4,
                icon: 'accessibility',
                title: 'Accessibility',
                text: 'Lighehouse, A11y',
                current: 85,
                max: 100,
                type: 'score'
            }
        ],
        commits: [
            {
                id: 1,
                name: 'First commit',
                date: 'June 28, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 2,
                name: 'Added “Header”',
                date: 'June 23, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 3,
                name: 'Fix “Preview”',
                date: 'June 22, 2026',
                text: 'First initialization commit, start development project'
            },
            {
                id: 4,
                name: 'Added “Contacts”, fix errors, animations',
                date: 'June 21, 2026',
                text: 'First initialization commit, start development project'
            },
        ],
        date: 'June 28, 2026',
        developmentTime: '3 week',
    }
]