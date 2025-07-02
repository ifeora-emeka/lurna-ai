import z from 'zod';

export const generateUnitsRequestSchema = z.object({
    moduleId: z.number().int().positive()
}).strict();

export const generateUnitSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500),
    tags: z.array(z.string().min(1).max(50)).min(1).max(10),
    index: z.number().min(0),
}).strict();

export const generateUnitsSchema = z.array(generateUnitSchema).min(1).max(25);
