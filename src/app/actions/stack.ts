'use server';

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";

import prisma from "@/lib/prisma";
import { Stack } from "@/interfaces/general";
import { requireAdmin } from "@/lib/auth/admin";



export async function updateStack(stack: Stack[]) {
    await requireAdmin()

    try {
        if (new Set(stack.map((item) => item.id)).size !== stack.length) {
            throw new Error("Duplicate stack ids are not allowed")
        }

        await prisma.$transaction(async (tx) => {
            const current = await tx.stack.findMany()
            const currentById = new Map(current.map((item) => [item.id, item]))
            const nextIds = new Set(stack.map((item) => item.id))
            const removedIds = current
                .filter((item) => !nextIds.has(item.id))
                .map((item) => item.id)

            if (removedIds.length > 0) {
                await tx.stack.deleteMany({ where: { id: { in: removedIds } } })
            }

            const renamedItems = stack.filter((item) => {
                const previous = currentById.get(item.id)
                return previous && previous.name !== item.name
            })

            // Stack.name is unique. Temporary names make swaps such as A <-> B
            // safe while keeping the operation transactional.
            await Promise.all(renamedItems.map((item) =>
                tx.stack.update({
                    where: { id: item.id },
                    data: { name: `__pending_stack_${item.id}_${randomUUID()}` },
                }),
            ))

            return Promise.all(stack.map((item, order) => {
                const previous = currentById.get(item.id)
                const data = { name: item.name, order }

                if (!previous) {
                    return tx.stack.create({ data: { id: item.id, ...data } })
                }

                if (
                    previous.name !== data.name ||
                    previous.order !== data.order
                ) {
                    return tx.stack.update({
                        where: { id: item.id },
                        data,
                    })
                }

                return previous
            }))
        })

        revalidatePath('/')
        revalidatePath('/admin')

        return { success: true }
    } catch {
        return { success: false, error: 'Failed to update stack' }        
    }
}
