import z from 'zod';

export const submitAssessmentAnswersSchema = z.object({
    assessmentResultId: z.number().min(1),
    answers: z.array(z.object({
        questionId: z.number().min(1),
        selectedOptions: z.array(z.string()),
        textAnswer: z.string().optional()
    }))
}).strict();