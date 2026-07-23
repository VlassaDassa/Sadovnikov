import { z } from 'zod'

const milestoneNameSchema = z
    .string()
    .trim()
    .min(3)
    .max(70)

const milestoneDateSchema = z
    .string()
    .trim()
    .min(1)
    .max(40)

const milestoneTextSchema = z
    .string()
    .trim()
    .min(10)
    .max(300)

const sourceShaSchema = z
    .string()
    .trim()
    .min(7)
    .max(64)

export const evolutionDraftItemSchema = z
    .object({
        id: z
            .string()
            .trim()
            .min(1)
            .max(100),

        name: milestoneNameSchema,
        nameRu: milestoneNameSchema,

        date: milestoneDateSchema,
        dateRu: milestoneDateSchema,

        text: milestoneTextSchema,
        textRu: milestoneTextSchema,

        sourceShas: z
            .array(sourceShaSchema)
            .max(100),
    })
    .strict()

export const evolutionDraftSchema = z
    .array(evolutionDraftItemSchema)
    .min(1)
    .max(20)

export const gigaChatMilestoneSchema = z
    .object({
        name: milestoneNameSchema,
        nameRu: milestoneNameSchema,

        text: milestoneTextSchema,
        textRu: milestoneTextSchema,

        sourceShas: z
            .array(sourceShaSchema)
            .min(1)
            .max(100),
    })
    .strict()

export const gigaChatMilestoneResponseSchema = z
    .object({
        milestones: z
            .array(gigaChatMilestoneSchema)
            .min(1)
            .max(15),
    })
    .strict()