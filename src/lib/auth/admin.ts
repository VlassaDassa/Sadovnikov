import 'server-only';

import { headers } from 'next/headers';

import { auth } from '../auth';



export async function getAdminSession() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session || session.user.role !== 'ADMIN') {
        return null;
    }

    return session
}


export async function requireAdmin() {
    const session = await getAdminSession()

    if (!session) {
        throw new Error("UNAUTHORIZED");
    }

    return session
}