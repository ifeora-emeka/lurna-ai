import z from 'zod';

export const generateModuleSchema = z.object({
    modules: z.array(
        z.object({
            name: z.string().min(2).max(100),
            description: z.string().max(500).optional(),
        }).strict()
    )
}).strict();

export const createSetRequestSchema = z.object({
    prompt: z.string().min(10).max(1000),
}).strict();
