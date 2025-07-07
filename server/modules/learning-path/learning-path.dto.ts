import z from 'zod';

export const createLearningPathRequestSchema = z.object({
    setId: z.number().min(1)
}).strict();

export const getNextStepsRequestSchema = z.object({
    setId: z.number().min(1)
}).strict();

