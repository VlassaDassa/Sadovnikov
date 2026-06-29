import { Prisma } from '@prisma/client';
import { AboutMe, WorkExperience } from '@/interfaces/general';

type PrismaAboutMe = Prisma.AboutMeGetPayload<{
    include: {
        workExperience: true;
    };
}>;

function transformWorkExperience(exp: PrismaAboutMe['workExperience'][number]): WorkExperience {
    return {
        id: exp.id,
        workingPeriod: {
            startDate: exp.startDate,
            endDate: exp.endDate || '', 
        },
        organization: exp.organization,
        position: exp.position,
        description: exp.description,
    };
}

export function transformAboutMe(data: PrismaAboutMe): AboutMe {
    return {
        birth: data.birth,
        placeBirth: data.placeBirth,
        education: data.education,
        location: data.location,
        shortBio: data.shortBio,
        workExperience: data.workExperience.map(transformWorkExperience),
    };
}