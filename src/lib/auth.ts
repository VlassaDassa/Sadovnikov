import 'server-only'

import { betterAuth } from 'better-auth'
import { prismaAdapter } from '@better-auth/prisma-adapter'
import { nextCookies } from 'better-auth/next-js'

import prisma from '@/lib/prisma';



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql'
    }),

    emailAndPassword: {
        enabled: true,
        disableSignUp: process.env.AUTH_BOOTSTRAP !== 'true',
        autoSignIn: false,
        minPasswordLength: 12,
        maxPasswordLength: 64
    },

    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'USER',
                input: false
            }
        }
    },

    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24
    },

    rateLimit: {
        enabled: true
    },

    plugins: [
        nextCookies()
    ]

})