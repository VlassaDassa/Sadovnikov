'use server'

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from 'zod';

import { auth } from "@/lib/auth";


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(128),
    rememberMe: z.boolean()
})

export interface LoginActionState {
    success: boolean,
    error: string
}


export async function loginAction(
    _state: LoginActionState,
    formData: FormData
): Promise<LoginActionState> {
    const result = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        rememberMe: true,
    })

    if (!result.success) {
        return {
            success: false,
            error: 'Invalid credentials'
        }
    }

    try {
        await auth.api.signInEmail({
            body: {
                email: result.data.email,
                password: result.data.password,
                rememberMe: result.data.rememberMe,
            },
            headers: await headers()
        })
    }
    catch {
        return {
            success: false,
            error: 'Invalid credentials'
        }
    }

    redirect('/admin')
}