import 'dotenv/config';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function main() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error('Missing admin credentials')
    }

    await auth.api.signUpEmail({
        body: {
            name: 'Admin',
            email,
            password
        }
    })

    await prisma.user.update({
        where: {
            email,
        },
        data: {
            role: 'ADMIN'
        }
    })
}

main().catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
})
.finally(async () => {
    await prisma.$disconnect()
})