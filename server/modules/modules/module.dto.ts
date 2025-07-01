import z from 'zod';

export const generateModulesRequestSchema = z.object({
    setSlug: z.string().min(1).max(200).trim()
}).strict();

export const generateModuleSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500),
    tags: z.array(z.string().min(1).max(50)).min(1).max(10),
    index: z.number().min(0),
}).strict();

export const generateModulesSchema = z.array(generateModuleSchema).min(1).max(20);
