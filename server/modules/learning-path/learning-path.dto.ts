import z from 'zod';

export const createLearningPathRequestSchema = z.object({
    setId: z.number().min(1)
}).strict();

export const getNextStepsRequestSchema = z.object({
    setId: z.number().min(1)
}).strict();

export const generateAssessmentRequestSchema = z.object({
    unitId: z.number().min(1),
    nextSteps: z.object({
        messageForStudent: z.string(),
        difficultyLevel: z.enum(['easy', 'medium', 'hard']).nullable(),
        canMoveForward: z.boolean(),
        isTimed: z.boolean(),
        areasToTackle: z.array(z.string()),
        totalUnitAssessment: z.number().optional()
    })
}).strict();
