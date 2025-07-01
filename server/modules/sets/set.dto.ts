import z from 'zod';

export const createSetRequestSchema = z.object({
    prompt: z.string().min(1).max(1000).trim()
}).strict();

export const generateSetSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500),
    keywords: z.array(z.string().min(1).max(50)).min(5).max(20),
    iconClass: z.string().min(1).max(50),
}).strict();
