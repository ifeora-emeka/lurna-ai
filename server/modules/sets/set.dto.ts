import z from 'zod';

export const generateModuleSchema = z.object({
    modules: z.array(
        z.object({
            name: z.string().min(2).max(100),
            description: z.string().max(500).optional(),
        }).strict()
    )
}).strict();
