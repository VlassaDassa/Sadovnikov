'use server';

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { IFooterItem } from "@/interfaces/general";
import { requireAdmin } from "@/lib/auth/admin";



export async function updateFooter(footer: IFooterItem[]) {
    await requireAdmin()

    try {
        if (new Set(footer.map((item) => item.id)).size !== footer.length) {
            throw new Error("Duplicate footer item ids are not allowed")
        }

        await prisma.$transaction(async (tx) => {
            const current = await tx.footerItem.findMany()
            const currentById = new Map(current.map((item) => [item.id, item]))
            const nextIds = new Set(footer.map((item) => item.id))
            const removedIds = current
                .filter((item) => !nextIds.has(item.id))
                .map((item) => item.id)

            if (removedIds.length > 0) {
                await tx.footerItem.deleteMany({ where: { id: { in: removedIds } } })
            }

            return Promise.all(footer.map((item, order) => {
                const previous = currentById.get(item.id)
                const data = {
                    text: item.text,
                    icon: item.icon,
                    link: item.link ?? null,
                    order,
                }

                if (!previous) {
                    return tx.footerItem.create({ data: { id: item.id, ...data } })
                }

                if (
                    previous.text !== data.text ||
                    previous.icon !== data.icon ||
                    previous.link !== data.link ||
                    previous.order !== data.order
                ) {
                    return tx.footerItem.update({ where: { id: item.id }, data })
                }

                return previous
            }))
        })
        

        revalidatePath('/')
        revalidatePath('/admin')

        return { success: true }
    } catch {
        return { success: false, error: 'Failed to update footer' }        
    }
}
