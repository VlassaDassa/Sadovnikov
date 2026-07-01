'use server'

import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"
import { AboutMe } from "@/interfaces/general"
import { transformAboutMe } from "@/lib/transformers/aboutMe"


export async function editAboutMe(aboutMe: AboutMe) {
    try {
        await prisma.aboutMe.deleteMany()

        const newAboutMe = await prisma.aboutMe.create({
            data: {
                birth: aboutMe.birth,  
                placeBirth: aboutMe.placeBirth,  
                education: aboutMe.education,   
                location: aboutMe.location,    
                shortBio: aboutMe.shortBio,    

                workExperience: {
                    create: aboutMe.workExperience.map(item => ({
                        organization: item.organization,
                        position: item.position,   
                        startDate: item.workingPeriod.startDate,   
                        endDate: item.workingPeriod.endDate,     
                        description: item.description 
                    }))
                }
            },

            include: {
                workExperience: true
            }
        })

        const transformObjectAboutMe = transformAboutMe(newAboutMe)

        revalidatePath('/admin')
        revalidatePath('/')

        return { success: true, adboutMe: transformObjectAboutMe }
    } catch (error) {
        console.error('Error editing aboutMe', error)
        return { success: true, error: 'Failed to editing aboutMe' }
    }
}