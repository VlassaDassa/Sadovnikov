import { z } from 'zod';

export const evolutionDraftItemSchema =
    z.object({
        id: z
            .string()
            .trim()
            .min(1)
            .max(100),

        name: z
            .string()
            .trim()
            .min(3)
            .max(70),

        date: z
            .string()
            .trim()
            .min(1)
            .max(40),

        text: z
            .string()
            .trim()
            .min(10)
            .max(240),

        sourceShas: z
            .array(
                z
                    .string()
                    .trim()
                    .min(7)
                    .max(64),
            )
            .max(100),
    })
    .strict();

export const evolutionDraftSchema =
    z.array(
        evolutionDraftItemSchema,
    )
    .min(1)
    .max(20);

export const gigaChatMilestoneSchema =
    z.object({
        name: z
            .string()
            .trim()
            .min(3)
            .max(70),

        text: z
            .string()
            .trim()
            .min(10)
            .max(240),

        sourceShas: z
            .array(
                z
                    .string()
                    .trim()
                    .min(7)
                    .max(64),
            )
            .min(1)
            .max(100),
    })
    .strict();

export const gigaChatMilestoneResponseSchema =
    z.object({
        milestones: z
            .array(
                gigaChatMilestoneSchema,
            )
            .min(1)
            .max(15),
    })
    .strict();