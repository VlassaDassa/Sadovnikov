import { afterAll, beforeAll } from 'vitest';

import prisma from '@/lib/prisma';


beforeAll(async () => {
    if (!process.env.DATABASE_URL?.includes('sadovnikov_test')) {
        throw new Error('Unsafe test database')
    }

    await prisma.$connect()
})

afterAll(async () => {
    await prisma.$disconnect()
})