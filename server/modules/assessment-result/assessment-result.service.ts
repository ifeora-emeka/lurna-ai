import { AssessmentResult, Assessment, Question, Set, Module, Unit } from '../../models';
import { AI } from '../../helpers/ai.helper';
import { assessmentEvaluationPrompt } from './assessment-result.prompts';
import z from 'zod';
import { AssessmentAnswer, AssessmentEvaluation } from '@/types/assessment-answer.types';

export default class AssessmentResultService {

    static async getPendingAssessmentResult(userId: string, setId?: number, assessmentId?: number) {
        try {
            if (!setId) {
                console.warn('[WARN] getPendingAssessmentResult called without setId, this may cause incorrect assessments to be displayed');
            }

            if (!assessmentId) {
                console.warn('[WARN] getPendingAssessmentResult called without assessmentId, this may cause incorrect assessments to be displayed');
            }

            const where: any = {
                createdBy: userId,
                isCompleted: false
            };

            if (setId) {
                where.setId = setId;
            }
            
            if (assessmentId) {
                where.assessmentId = assessmentId;
            }

            const pendingResult = await AssessmentResult.findOne({
                where,
                order: [['created_at', 'DESC']]
            });

            if (!pendingResult) {
                return null;
            }

            const assessment = await Assessment.findOne({
                where: {
                    id: pendingResult.assessmentId,
                    setId: pendingResult.setId,
                    moduleId: pendingResult.moduleId,
                    unitId: pendingResult.unitId,
                    createdBy: userId
                }
            });

            const questions = await Question.findAll({
                where: {
                    setId: pendingResult.setId,
                    moduleId: pendingResult.moduleId,
                    unitId: pendingResult.unitId,
                    assessmentId: pendingResult.assessmentId
                }
            });

            return {
                assessment: assessment ? assessment.toJSON() : null,
                questions: questions.map(q => q.toJSON()),
                assessment_result: pendingResult.toJSON()
            };
        } catch (error) {
            console.error('[DEBUG] Error in AssessmentResultService.getPendingAssessmentResult:', error);
            throw error;
        }
    }

    static async submitAssessmentAnswers(assessmentResultId: number, answers: any[], userId: string) {
        try {
            const assessmentResult = await AssessmentResult.findOne({
                where: {
                    id: assessmentResultId,
                    createdBy: userId,
                    isCompleted: false
                }
            });

            if (!assessmentResult) {
                throw new Error('Assessment result not found or already completed');
            }

            const assessment = await Assessment.findOne({
                where: {
                    setId: assessmentResult.setId,
                    moduleId: assessmentResult.moduleId,
                    unitId: assessmentResult.unitId,
                    createdBy: userId
                },
                order: [['created_at', 'DESC']]
            });

            if (!assessment) {
                throw new Error('Assessment not found for this assessment result');
            }

            const questions = await Question.findAll({
                where: {
                    setId: assessmentResult.setId,
                    moduleId: assessmentResult.moduleId,
                    unitId: assessmentResult.unitId,
                    assessmentId: assessment.id
                }
            });

            const evaluatedAnswers = answers.map(answer => {
                const question = questions.find(q => q.id === answer.questionId);
                if (!question) {
                    return {
                        question: answer.questionId,
                        correctAnswerText: 'Question not found',
                        correctOptionsIDs: [],
                        isCorrect: false,
                        userAnswers: answer.selectedOptions || [answer.textAnswer],
                        userSelectedOptions: answer.selectedOptions || [],
                        isUnanswered: !answer.selectedOptions || answer.selectedOptions.length === 0
                    };
                }

                let isCorrect = false;
                let correctAnswer = '';
                let correctOptionIds: string[] = [];
                const userSelectedOptions = Array.isArray(answer.selectedOptions) ? answer.selectedOptions : [];

                // This part is for backwards compatibility - we'll use the LLM for evaluation
                if (question.type === 'multiple_choice' || question.type === 'true_false') {
                    const correctOptions = question.options.filter((opt: any) => opt.isCorrect);
                    correctAnswer = correctOptions.map((opt: any) => opt.content).join(', ');
                    correctOptionIds = correctOptions.map((opt: any) => opt.id);
                    
                    const userAnswers = Array.isArray(answer.selectedOptions) ? answer.selectedOptions : [answer.selectedOptions];
                    
                    if (question.type === 'multiple_choice' || question.type === 'true_false') {
                        isCorrect = correctOptionIds.length === userAnswers.length &&
                            correctOptionIds.every(id => userAnswers.includes(id));
                    }
                } else if (question.type === 'multiple_select') {
                    const correctOptions = question.options.filter((opt: any) => opt.isCorrect);
                    correctAnswer = correctOptions.map((opt: any) => opt.content).join(', ');
                    correctOptionIds = correctOptions.map((opt: any) => opt.id);
                    
                    const userAnswers = Array.isArray(answer.selectedOptions) ? answer.selectedOptions : [];
                    
                    isCorrect = correctOptionIds.length === userAnswers.length &&
                        correctOptionIds.every(id => userAnswers.includes(id));
                } else if (question.type === 'short_answer' || question.type === 'text') {
                    const correctOptions = question.options.filter((opt: any) => opt.isCorrect);
                    correctAnswer = correctOptions.length > 0 ? correctOptions[0].content : 'Sample answer provided';
                    
                    const userText = (answer.textAnswer || '').toLowerCase().trim();
                    const correctText = correctAnswer.toLowerCase().trim();
                    
                    isCorrect = userText.length > 0 && (
                        userText === correctText ||
                        userText.includes(correctText) ||
                        correctText.includes(userText)
                    );
                }

                return {
                    question: answer.questionId,
                    correctAnswerText: correctAnswer,
                    correctOptionsIDs: correctOptionIds,
                    userAnswers: answer.selectedOptions || [answer.textAnswer],
                    userSelectedOptions: answer.selectedOptions || [],
                    isCorrect,
                    isUnanswered: !answer.selectedOptions || answer.selectedOptions.length === 0
                };
            });

            const score = evaluatedAnswers.filter(answer => answer.isCorrect).length;
            const totalQuestions = evaluatedAnswers.length;
            const percentage = Math.round((score / totalQuestions) * 100);

            let advice = '';
            if (percentage >= 80) {
                advice = 'Excellent work! You have a strong understanding of this topic and are ready to move forward.';
            } else if (percentage >= 60) {
                advice = 'Good job! You understand most concepts but could benefit from reviewing some areas before proceeding.';
            } else {
                advice = 'You may want to review this topic more thoroughly and practice additional exercises before moving forward.';
            }

            await assessmentResult.update({
                result: evaluatedAnswers,
                advice,
                isCompleted: true
            });

            const questionsWithAnswers = questions.map(q => {
                const questionResult = evaluatedAnswers.find(r => r.question === q.id);
                return {
                    ...q.toJSON(),
                    userResult: questionResult || null
                };
            });

            return {
                assessment_result: assessmentResult.toJSON(),
                questions: questionsWithAnswers,
                assessment: assessment.toJSON(),
                evaluatedAnswers,
                advice,
                score,
                totalQuestions,
                percentage
            };
        } catch (error) {
            console.error('[DEBUG] Error in AssessmentResultService.submitAssessmentAnswers:', error);
            throw error;
        }
    }

    static async evaluateAssessmentWithLLM(
        assessment: any,
        questions: any[],
        answers: any[],
        set: any,
        module: any,
        unit: any
    ): Promise<AssessmentEvaluation> {
        const evaluationSchema = z.object({
            evaluatedAnswers: z.array(z.object({
                question: z.number(),
                correctAnswerText: z.string(),
                correctOptionsIDs: z.array(z.string()),
                userAnswers: z.array(z.string()),
                userSelectedOptions: z.array(z.string()),
                isCorrect: z.boolean(),
                isUnanswered: z.boolean()
            })),
            advice: z.string(),
            score: z.number(),
            totalQuestions: z.number(),
            percentage: z.number()
        });

        // Make sure each question has its user-selected options properly matched up
        const questionsWithUserSelections = questions.map(question => {
            const userAnswer = answers.find(a => a.questionId === question.id) || { selectedOptions: [], textAnswer: '' };
            return {
                ...question,
                userSelectedOptions: userAnswer.selectedOptions || [],
                userTextAnswer: userAnswer.textAnswer || ''
            };
        });

        const prompt = assessmentEvaluationPrompt(
            assessment,
            questionsWithUserSelections,
            answers,
            set,
            module,
            unit
        );

        try {
            const evaluation = await AI.generateStructuredData({
                prompt,
                zodSchema: evaluationSchema
            });
            
            const validatedEvaluation = evaluationSchema.parse(evaluation);
            return validatedEvaluation;
            
        } catch (error) {
            console.error('[DEBUG] Error in evaluateAssessmentWithLLM:', error);
            throw error;
        }
    }

    static async submitAssessment(assessmentResultId: number, answers: AssessmentAnswer[], userId: string) {
        try {
            const assessmentResult = await AssessmentResult.findOne({
                where: {
                    id: assessmentResultId,
                    createdBy: userId,
                    isCompleted: false
                }
            });

            if (!assessmentResult) {
                throw new Error('Assessment result not found or already completed');
            }

            const assessment = await Assessment.findOne({
                where: {
                    setId: assessmentResult.setId,
                    moduleId: assessmentResult.moduleId,
                    unitId: assessmentResult.unitId,
                    id: assessmentResult.assessmentId
                }
            });

            if (!assessment) {
                throw new Error('Assessment not found for this assessment result');
            }

            const questions = await Question.findAll({
                where: {
                    setId: assessmentResult.setId,
                    moduleId: assessmentResult.moduleId,
                    unitId: assessmentResult.unitId,
                    assessmentId: assessment.id
                }
            });

            const set = await Set.findByPk(assessmentResult.setId);
            const module = await Module.findByPk(assessmentResult.moduleId);
            const unit = await Unit.findByPk(assessmentResult.unitId);

            if (!set || !module || !unit) {
                throw new Error('Required context information not found');
            }

            const { evaluatedAnswers, advice, score, totalQuestions, percentage } = 
                await this.evaluateAssessmentWithLLM(
                    assessment.toJSON(),
                    questions.map(q => q.toJSON()),
                    answers,
                    set.toJSON(),
                    module.toJSON(),
                    unit.toJSON()
                );

            await assessmentResult.update({
                result: evaluatedAnswers,
                advice,
                isCompleted: true
            });

            // Enhance the questions with the user's answers for better display
            const questionsWithAnswers = questions.map(q => {
                const questionData = q.toJSON();
                const answerResult = evaluatedAnswers.find(r => r.question === q.id);
                
                return {
                    ...questionData,
                    userResult: answerResult || null,
                    userSelectedOptions: answerResult?.userSelectedOptions || []
                };
            });

            return {
                assessment_result: assessmentResult.toJSON(),
                questions: questionsWithAnswers,
                assessment: assessment.toJSON(),
                evaluatedAnswers,
                advice,
                score,
                totalQuestions,
                percentage
            };
        } catch (error) {
            console.error('[DEBUG] Error in AssessmentResultService.submitAssessment:', error);
            throw error;
        }
    }

    static async updateTimeStarted(assessmentResultId: number, userId: string) {
        try {
            const assessmentResult = await AssessmentResult.findOne({
                where: {
                    id: assessmentResultId,
                    createdBy: userId,
                    isCompleted: false
                }
            });

            if (!assessmentResult) {
                throw new Error('Assessment result not found or already completed');
            }

            if (assessmentResult.timeStarted) {
                return assessmentResult.toJSON();
            }

            await assessmentResult.update({
                timeStarted: new Date()
            });

            return assessmentResult.toJSON();
        } catch (error) {
            console.error('[DEBUG] Error in AssessmentResultService.updateTimeStarted:', error);
            throw error;
        }
    }

}
