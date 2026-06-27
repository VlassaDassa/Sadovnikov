import { AboutMe } from "@/interfaces/general"


export const aboutMe: AboutMe = {
    birth: 2004,
    placeBirth: 'Uzbekistan',
    education: 'Konakovo Energy College, 2025',
    location: 'Moscow, Russia',
    workExperience: [
        {
            id: 1,
            organization: 'Spetstechnologiya (Moscow)',
            position: 'Server Maintenance Engineer',
            workingPeriod: {startDate: 'July 2025', endDate: 'Present'},
            description: 'Ensuring 24/7 uptime for dev environments; configuring servers & CI/CD; assisting with frontend deploys (Nginx); code review (Docker, Nginx).'
        },
        {
            id: 2,
            organization: 'Freelance / Konakovo Energy College',
            position: 'Full-stack Developer',
            workingPeriod: {startDate: 'July 2025', endDate: 'July 2026'},
            description: 'Full-cycle web dev (Python, Django, React, JS/TS, SQL, REST API). Created portal for my college and a system for the local Education Department.'
        },
        {
            id: 3,
            organization: 'InfoTech (Moscow)',
            position: 'Assistant Engineer',
            workingPeriod: {startDate: 'July 2025', endDate: 'July 2027'},
            description: 'Network setup (MikroTik), IP camera troubleshooting, diagnostics (Wireshark).'
        },
    ],
    shortBio: "A proactive Frontend Developer (21 y.o.) with a full-stack background. I specialize in React & TypeScript, have 3+ years of freelance experience, and currently work with server infrastructure, which helps me build more reliable web apps. I'm passionate about clean code and ready for new challenges in Moscow or remotely."
}

