'use server'

import { email, success, z } from 'zod';

import { sendContactEmail } from '@/lib/mail/sendContactEmail';

const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(5)
        .max(10)
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
        console.error('Contact email error: ', error)

        return {
            success: false,
            error: 'Failed to send message'
        }
    }
}