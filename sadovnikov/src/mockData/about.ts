interface WorkExperience {
    id: number,
    title: string,
    text: string,
}


const workExperience: WorkExperience[] = [
    {
        id: 1,
        title: 'Spetstechnologiya (Moscow) — Server Maintenance Engineer (July 2025 – Present)',
        text: 'Ensuring 24/7 uptime for dev environments; configuring servers & CI/CD; assisting with frontend deploys (Nginx); code review (Docker, Nginx).'
    },
    {
        id: 2,
        title: 'Freelance / Konakovo Energy College  — Full-stack Developer (June 2022 – Present)',
        text: 'Full-cycle web dev (Python, Django, React, JS/TS, SQL, REST API). Created portal for my college and a system for the local Education Department.'
    },
    {
        id: 3,
        title: 'InfoTech(Moscow) —  Assistant Engineer (Dec 2023 – June 2024)',
        text: 'Network setup (MikroTik), IP camera troubleshooting, diagnostics (Wireshark).'
    }
]


export const shortBio: string = "A proactive Frontend Developer (21 y.o.) with a full-stack background. I specialize in React & TypeScript, have 3+ years of freelance experience, and currently work with server infrastructure, which helps me build more reliable web apps. I'm passionate about clean code and ready for new challenges in Moscow or remotely."

export default workExperience;
