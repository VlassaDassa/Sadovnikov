'use server'

import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"
import { AboutMe } from "@/interfaces/general"
import { transformAboutMe } from "@/lib/transformers/aboutMe"
import { requireAdmin } from "@/lib/auth/admin";


export async function updateAboutMe(aboutMe: AboutMe) {
    requireAdmin()

    try {
        
        await prisma.workExperience.deleteMany();
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

        return { success: true, aboutMe: transformObjectAboutMe }
    } catch (error) {
        console.error('Error updating aboutMe', error)
        return { success: false, error: error }
    }
}