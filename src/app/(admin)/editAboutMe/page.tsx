import React from "react";

import ClientPageWrapper from "./ClientPageWrapper";
import ErrorPage from "@/components/shared/ErrorPage";

import { AboutMe } from "@/interfaces/general";
import { transformRawAboutMe } from '@/lib/transformers/aboutMe';
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


const EditAboutMe: React.FC = async () => {
    let aboutMe: AboutMe | null = null;
    
    try {
        const rawAboutMe = await prisma.aboutMe.findFirst({
            include: {
                workExperience: true
            }
        })

        aboutMe = rawAboutMe ? transformRawAboutMe(rawAboutMe) : null;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return <ErrorPage error={errorMessage} />
    }

    if (!aboutMe) {
        return notFound()
    }


    return (
        <ClientPageWrapper aboutMe={aboutMe} />   
    )
}

export default EditAboutMe;