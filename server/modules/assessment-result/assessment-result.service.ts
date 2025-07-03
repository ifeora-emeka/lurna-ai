import { AssessmentResult, Assessment, Question } from '../../models';
import { AI } from '../../helpers/ai.helper';

export default class AssessmentResultService {

    static async getPendingAssessmentResult(userId: string, setId?: number) {
        try {
            const where: any = {
                createdBy: userId,
                isCompleted: false
            };

            if (setId) {
                where.setId = setId;
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
                    setId: pendingResult.setId,
                    moduleId: pendingResult.moduleId,
                    unitId: pendingResult.unitId,
                    createdBy: userId
                },
                order: [['created_at', 'DESC']]
            });

            const questions = await Question.findAll({
                where: {
                    setId: pendingResult.setId,
                    moduleId: pendingResult.moduleId,
                    unitId: pendingResult.unitId
                }
            });

            return {
                assessment: assessment ? assessment.toJSON() : null,
                questions: questions.map(q => q.toJSON()),
                result: pendingResult
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

            const questions = await Question.findAll({
                where: {
                    setId: assessmentResult.setId,
                    moduleId: assessmentResult.moduleId,
                    unitId: assessmentResult.unitId
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
                        explanation: (question as any)?.explanation || null
                    };
                }

                let isCorrect = false;
                let correctAnswer = '';
                let correctOptionIds: string[] = [];

                // Handle different question types
                if (question.type === 'multiple_choice' || question.type === 'true_false') {
                    const correctOptions = question.options.filter((opt: any) => opt.isCorrect);
                    correctAnswer = correctOptions.map((opt: any) => opt.content).join(', ');
                    correctOptionIds = correctOptions.map((opt: any) => opt.id);
                    
                    const userAnswers = Array.isArray(answer.selectedOptions) ? answer.selectedOptions : [answer.selectedOptions];
                    
                    // For single-select questions, check if user selected the correct option
                    if (question.type === 'multiple_choice' || question.type === 'true_false') {
                        isCorrect = correctOptionIds.length === userAnswers.length &&
                            correctOptionIds.every(id => userAnswers.includes(id));
                    }
                } else if (question.type === 'multiple_select') {
                    const correctOptions = question.options.filter((opt: any) => opt.isCorrect);
                    correctAnswer = correctOptions.map((opt: any) => opt.content).join(', ');
                    correctOptionIds = correctOptions.map((opt: any) => opt.id);
                    
                    const userAnswers = Array.isArray(answer.selectedOptions) ? answer.selectedOptions : [];
                    
                    // For multi-select, user must select all correct options and no incorrect ones
                    isCorrect = correctOptionIds.length === userAnswers.length &&
                        correctOptionIds.every(id => userAnswers.includes(id));
                } else if (question.type === 'short_answer' || question.type === 'text') {
                    // For text answers, we'll use a more lenient comparison
                    const correctOptions = question.options.filter((opt: any) => opt.isCorrect);
                    correctAnswer = correctOptions.length > 0 ? correctOptions[0].content : 'Sample answer provided';
                    
                    // Simple text comparison (can be enhanced with AI evaluation later)
                    const userText = (answer.textAnswer || '').toLowerCase().trim();
                    const correctText = correctAnswer.toLowerCase().trim();
                    
                    // Basic similarity check - this can be improved with AI evaluation
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
                    isCorrect,
                    explanation: (question as any).explanation || null
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

            return {
                assessmentResult: assessmentResult.toJSON(),
                score,
                totalQuestions,
                percentage,
                evaluatedAnswers,
                advice
            };
        } catch (error) {
            console.error('[DEBUG] Error in AssessmentResultService.submitAssessmentAnswers:', error);
            throw error;
        }
    }

    static async submitAssessment(assessmentResultId: number, answers: any[], userId: string) {
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

            const questions = await Question.findAll({
                where: {
                    setId: assessmentResult.setId,
                    moduleId: assessmentResult.moduleId,
                    unitId: assessmentResult.unitId
                }
            });

            const results = answers.map((answer, index) => {
                const question = questions.find(q => q.id === answer.questionId);
                if (!question) {
                    throw new Error(`Question with ID ${answer.questionId} not found`);
                }

                const correctOptions = question.options.filter((opt: any) => opt.isCorrect);
                const correctAnswers = correctOptions.map((opt: any) => opt.id);
                const userAnswers = Array.isArray(answer.selectedOptions) ? answer.selectedOptions : [answer.selectedOptions];
                
                const isCorrect = JSON.stringify(correctAnswers.sort()) === JSON.stringify(userAnswers.sort());

                return {
                    question: question.id,
                    correctAnswerText: correctOptions.map((opt: any) => opt.content).join(', ') || 'Correct answer',
                    correctOptionsIDs: correctAnswers,
                    userAnswers: userAnswers,
                    isCorrect
                };
            });

            const prompt = `
                Based on the following assessment results, provide advice and feedback for the student:
                
                Questions and Results:
                ${results.map((r, i) => `
                Question ${i + 1}: ${r.isCorrect ? 'Correct' : 'Incorrect'}
                Correct Answer: ${r.correctAnswerText}
                User Answers: ${r.userAnswers.join(', ')}
                `).join('\n')}
                
                Provide constructive feedback in 2-3 sentences focusing on what the student did well and areas for improvement.
            `;

            const advice = await AI.generateText(prompt);

            await assessmentResult.update({
                result: results,
                advice,
                isCompleted: true
            });

            return {
                ...assessmentResult.toJSON(),
                result: results,
                advice
            };
        } catch (error) {
            console.error('[DEBUG] Error in AssessmentResultService.submitAssessment:', error);
            throw error;
        }
    }

}
