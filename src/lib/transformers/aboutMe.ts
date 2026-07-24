import { Prisma } from '@prisma/client';
import { getLocalizedText } from '@/i18n/getLocalizedText';
import { AboutMe, WorkExperience } from '@/interfaces/general';
import { AppLocale } from '@/i18n/routing';

type PrismaAboutMe = Prisma.AboutMeGetPayload<{
    include: {
        workExperience: true;
    };
}>;

function transformWorkExperience(exp: PrismaAboutMe['workExperience'][number], locale: AppLocale): WorkExperience {
    return {
        id: exp.id,
        workingPeriod: {
            startDate: exp.startDate,
            endDate: exp.endDate || '', 
        },
        organization: getLocalizedText(
            locale,
            exp.organization,
            exp.organizationRu
        ),

        position: getLocalizedText(
            locale,
            exp.position,
            exp.positionRu
        ),

        description: getLocalizedText(
            locale,
            exp.description,
            exp.descriptionRu
        ),
    };
}

export function transformAboutMe(data: PrismaAboutMe, locale: AppLocale = 'en'): AboutMe {

    return {
        birth: data.birth,

        placeBirth: getLocalizedText(
            locale,
            data.placeBirth,
            data.placeBirthRu
        ),

        education: getLocalizedText(
            locale,
            data.education,
            data.educationRu
        ),

        location: getLocalizedText(
            locale,
            data.location,
            data.locationRu
        ),

        shortBio: getLocalizedText(
            locale,
            data.shortBio,
            data.shortBioRu
        ),

        workExperience: data.workExperience.map((exp) => transformWorkExperience(exp, locale)),
    };
}



function transformRawWorkExperience(exp: PrismaAboutMe['workExperience'][number]): WorkExperience {
    return {
        id: exp.id,
        workingPeriod: {
            startDate: exp.startDate,
            endDate: exp.endDate || '', 
        },

        organization: exp.organization,
        organizationRu: exp.organizationRu || '',


        position: exp.position,
        positionRu: exp.positionRu || '',

        description: exp.description,
        descriptionRu: exp.descriptionRu || ''
    };
}


export function transformRawAboutMe(data: PrismaAboutMe): AboutMe {
    return {
        birth: data.birth,

        placeBirth: data.placeBirth,
        placeBirthRu: data.placeBirthRu || '',
        

        education: data.education,
        educationRu: data.educationRu || '',

        location: data.location,
        locationRu: data.locationRu || '',

        shortBio: data.shortBio,
        shortBioRu: data.shortBioRu || '',

        workExperience: data.workExperience.map((exp) => transformRawWorkExperience(exp)),
    };
}