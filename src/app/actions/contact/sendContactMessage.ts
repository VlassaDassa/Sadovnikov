'use server'

import { z } from 'zod';

import { sendContactEmail } from '@/lib/mail/sendContactEmail';

const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2)
        .max(50)
        .regex(/^[^\r\n]+$/),
    email: z
        .string()
        .trim()
        .email()
        .max(100),
    message: z
        .string()
        .trim()
        .min(10)
        .max(300),    
})


export async function sendContactMessage(input: {
    name: string,
    email: string,
    message: string,
}) {
    const result = contactSchema.safeParse(input)

    if (!result.success) {
        return {
            success: false,
            error: 'Invalid form data'
        }
    }

    try {
        await sendContactEmail(result.data)

        return {
            success: true
        }
    }
    catch(error: unknown) {

        return {
            success: false,
            error: 'Failed to send message'
        }
    }
}