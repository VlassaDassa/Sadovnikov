import type { IProject } from '@/interfaces/general';


const specTechno = '/images/mockImages/specTecno.png'
const MongoDBImg = '/images/mockImages/MongoDB.svg'
const typeScriptImg = '/images/mockImages/TypeScript.svg'
const reactImg = '/images/mockImages/React.svg'
const nextJSImg = '/images/mockImages/NextJS.svg'
const reduxImg = '/images/mockImages/Redux.svg'
const sassImg = '/images/mockImages/SASS.svg'

// Изображения должны быть в пропорции 11:9 (h:252px w:309px)
const featureIcon = '/images/mockImages/featureIcon.svg';
const featurePhoto1 = '/images/mockImages/featurePhoto.png';
const featurePhoto2 = '/images/mockImages/featurePhoto_1.png';


export const projects: IProject[] = [
    {
        id: 1,
        category: 'Site',
        images: [
            {
                id: 1,
                image: specTechno,
                main: true
            }, 
            {
                id: 2,
                image: specTechno,
                main: false
            }, 
            {
                id: 3,
                image: specTechno,
                main: false
            },  
            {
                id: 4,
                image: specTechno,
                main: false
            },
        ],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        previewDescription: 'A modern corporate website for a technology company specializing in security systems and software solutions. Built with performance, accessibility and a clean user experience in mind',
        stack: [
            {
                id: 1,
                name: 'MongoDB',
                icon: MongoDBImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. I was tired of writing multi-line JavaScript and wanted to learn something more in demand in the market. I decided to try React first, but it turned out that I liked it for its reactivity, ease, and interesting component approach'
                }
            },
            {
                id: 2,
                name: 'TypeScript',
                icon: typeScriptImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. I was tired of writing multi-line JavaScript and wanted to learn something more in demand in the market. I decided to try React first, but it turned out that I liked it for its reactivity, ease, and interesting component approach'
                }
            },
            {
                id: 3,
                name: 'React',
                icon: reactImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. I was tired of writing multi-line JavaScript and wanted to learn something more in demand in the market. I decided to try React first, but it turned out that I liked it for its reactivity, ease, and interesting component approach'
                }
            },
            {
                id: 4,
                name: 'NextJS',
                icon: nextJSImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. I was tired of writing multi-line JavaScript and wanted to learn something more in demand in the market. I decided to try React first, but it turned out that I liked it for its reactivity, ease, and interesting component approach'
                }
            },
            {
                id: 5,
                name: 'Redux',
                icon: reduxImg,
                tooltip: {
                    id: 1,
                    title: 'Why was this technology chosen?',
                    text: 'For building SPAs and convenient reactive  interactions. I was tired of writing multi-line JavaScript and wanted to learn something more in demand in the market. I decided to try React first, but it turned out that I liked it for its reactivity, ease, and interesting component approach'
                }
            },
            {
                id: 6,
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
                text: 'For building SPAs and convenient reactive  interactions. I was tired of writing multi-line JavaScript and wanted to learn something more in demand in the market. I decided to try React first, but it turned out that I liked it for its reactivity, ease, and interesting component approach',
                icon: featureIcon,
                photo: featurePhoto1
            },
            {
                id: 2,
                title: 'Full responsive design',
                text: 'For building SPAs and convenient reactive  interactions. I was tired of writing multi-line JavaScript and wanted to learn something more in demand in the market. I decided to try React first, but it turned out that I liked it for its reactivity, ease, and interesting component approach',
                icon: featureIcon,
                photo: specTechno
            },
            {
                id: 3,
                title: 'Full responsive design',
                text: 'For building SPAs and convenient reactive  interactions. I was tired of writing multi-line JavaScript and wanted to learn something more in demand in the market. I decided to try React first, but it turned out that I liked it for its reactivity, ease, and interesting component approach',
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
        gitHubLink: 'https://github.com/VlassaDassa/Sadovnikov',
        demoLink: 'https://vk.com/7b5l21ya',
        numberTeam: 1,
    },
    {
        id: 2,
        category: 'Site',
        images: [
            {
                id: 1,
                image: specTechno,
                main: true
            }, 
            {
                id: 2,
                image: specTechno,
                main: false
            }, 
            {
                id: 3,
                image: specTechno,
                main: false
            },  
            {
                id: 4,
                image: specTechno,
                main: false
            },
        ],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        previewDescription: 'A modern corporate website for a technology company specializing in security systems and software solutions. Built with performance, accessibility and a clean user experience in mind',
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
        gitHubLink: 'https://github.com/VlassaDassa/Sadovnikov',
        demoLink: 'https://vk.com/7b5l21ya',
        numberTeam: 1,
    },
    {
        id: 3,
        category: 'Site',
        images: [
            {
                id: 1,
                image: specTechno,
                main: true
            }, 
            {
                id: 2,
                image: specTechno,
                main: false
            }, 
            {
                id: 3,
                image: specTechno,
                main: false
            },  
            {
                id: 4,
                image: specTechno,
                main: false
            },
        ],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        previewDescription: 'A modern corporate website for a technology company specializing in security systems and software solutions. Built with performance, accessibility and a clean user experience in mind',
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
        gitHubLink: 'https://github.com/VlassaDassa/Sadovnikov',
        demoLink: 'https://vk.com/7b5l21ya',
        numberTeam: 1,
    },
    {
        id: 4,
        category: 'Site',
        images: [
            {
                id: 1,
                image: specTechno,
                main: true
            }, 
            {
                id: 2,
                image: specTechno,
                main: false
            }, 
            {
                id: 3,
                image: specTechno,
                main: false
            },  
            {
                id: 4,
                image: specTechno,
                main: false
            },
        ],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        previewDescription: 'A modern corporate website for a technology company specializing in security systems and software solutions. Built with performance, accessibility and a clean user experience in mind',
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
        gitHubLink: 'https://github.com/VlassaDassa/Sadovnikov',
        demoLink: 'https://vk.com/7b5l21ya',
        numberTeam: 1,
    },
    {
        id: 5,
        category: 'Site',
        images: [
            {
                id: 1,
                image: specTechno,
                main: true
            }, 
            {
                id: 2,
                image: specTechno,
                main: false
            }, 
            {
                id: 3,
                image: specTechno,
                main: false
            },  
            {
                id: 4,
                image: specTechno,
                main: false
            },
        ],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        previewDescription: 'A modern corporate website for a technology company specializing in security systems and software solutions. Built with performance, accessibility and a clean user experience in mind',
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
        gitHubLink: 'https://github.com/VlassaDassa/Sadovnikov',
        demoLink: 'https://vk.com/7b5l21ya',
        numberTeam: 1,
    },
    {
        id: 6,
        category: 'Site',
        images: [
            {
                id: 1,
                image: specTechno,
                main: true
            }, 
            {
                id: 2,
                image: specTechno,
                main: false
            }, 
            {
                id: 3,
                image: specTechno,
                main: false
            },  
            {
                id: 4,
                image: specTechno,
                main: false
            },
        ],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        previewDescription: 'A modern corporate website for a technology company specializing in security systems and software solutions. Built with performance, accessibility and a clean user experience in mind',
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
        gitHubLink: 'https://github.com/VlassaDassa/Sadovnikov',
        demoLink: 'https://vk.com/7b5l21ya',
        numberTeam: 1,
    },
    {
        id: 7,
        category: 'Site',
        images: [
            {
                id: 1,
                image: specTechno,
                main: true
            }, 
            {
                id: 2,
                image: specTechno,
                main: false
            }, 
            {
                id: 3,
                image: specTechno,
                main: false
            },  
            {
                id: 4,
                image: specTechno,
                main: false
            },
        ],
        teamType: 'solo',
        name: 'SpecTechnologia1',
        shortDescrition: 'Site-card + Admin panel',
        previewDescription: 'A modern corporate website for a technology company specializing in security systems and software solutions. Built with performance, accessibility and a clean user experience in mind',
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
        gitHubLink: 'https://github.com/VlassaDassa/Sadovnikov',
        demoLink: 'https://vk.com/7b5l21ya',
        numberTeam: 1,
    }
]