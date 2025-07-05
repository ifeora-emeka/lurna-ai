import { AssessmentResult, Assessment, Question } from '../../models';
import { AI } from '../../helpers/ai.helper';

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
                        explanation: (question as any)?.explanation || null
                    };
                }

                let isCorrect = false;
                let correctAnswer = '';
                let correctOptionIds: string[] = [];

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

            const results: Array<{
                questionId: number;
                questionContent: string;
                question: number;
                correctAnswerText: string;
                correctOptionsIDs: string[];
                userAnswers: string[];
                userAnswer: string;
                isCorrect: boolean;
                isUnanswered: boolean;
            }> = [];
            
            for (const question of questions) {
                const answer = answers.find(a => a.questionId === question.id);
                
                const correctOptions = question.options.filter((opt: any) => opt.isCorrect);
                const correctAnswers = correctOptions.map((opt: any) => opt.id);
                
                let isCorrect = false;
                let userAnswers: string[] = [];
                
                if (answer && (answer.selectedOptions?.length > 0 || answer.textAnswer)) {
                    if (answer.textAnswer) {
                        userAnswers = [answer.textAnswer];
                        isCorrect = false;
                    } else {
                        userAnswers = Array.isArray(answer.selectedOptions) ? answer.selectedOptions : [answer.selectedOptions];
                        isCorrect = JSON.stringify(correctAnswers.sort()) === JSON.stringify(userAnswers.sort());
                    }
                } else {
                    userAnswers = [];
                    isCorrect = false;
                }

                results.push({
                    questionId: question.id,
                    questionContent: question.content,
                    question: question.id,
                    correctAnswerText: correctOptions.map((opt: any) => opt.content).join(', ') || 'Correct answer',
                    correctOptionsIDs: correctAnswers,
                    userAnswers: userAnswers,
                    userAnswer: userAnswers.length > 0 ? userAnswers.join(', ') : 'No answer provided',
                    isCorrect,
                    isUnanswered: userAnswers.length === 0
                });
            }

            const correctCount = results.filter(r => r.isCorrect).length;
            const unansweredCount = results.filter(r => r.isUnanswered).length;
            const totalQuestions = results.length;
            const percentage = Math.round((correctCount / totalQuestions) * 100);

            const prompt = `
                Based on the following assessment results, provide advice and feedback for the student:
                
                Total Questions: ${totalQuestions}
                Correct Answers: ${correctCount}
                Unanswered Questions: ${unansweredCount}
                Score: ${percentage}%
                
                Questions and Results:
                ${results.map((r, i) => `
                Question ${i + 1}: ${r.isUnanswered ? 'Unanswered' : (r.isCorrect ? 'Correct' : 'Incorrect')}
                Correct Answer: ${r.correctAnswerText}
                User Answers: ${r.userAnswers.length > 0 ? r.userAnswers.join(', ') : 'No answer provided'}
                `).join('\n')}
                
                Provide constructive feedback in 2-3 sentences focusing on:
                1. What the student did well
                2. Areas for improvement
                3. Specific suggestions for studying
                ${unansweredCount > 0 ? '4. Note about the importance of attempting all questions' : ''}
            `;

            console.log('\n\nSUBMIT ASSESSMENT PROMPT:::', prompt)

            const advice = await AI.generateText(prompt);

            await assessmentResult.update({
                result: results,
                advice,
                isCompleted: true
            });

            
            const questionsWithAnswers = questions.map(q => {
                const questionResult = results.find(r => r.question === q.id);
                return {
                    ...q.toJSON(),
                    userResult: questionResult || null
                };
            });

            return {
                assessment_result: assessmentResult.toJSON(),
                questions: questionsWithAnswers,
                assessment: assessment.toJSON(),
                evaluatedAnswers: results,
                advice,
                score: correctCount,
                totalQuestions,
                percentage
            };
        } catch (error) {
            console.error('[DEBUG] Error in AssessmentResultService.submitAssessment:', error);
            throw error;
        }
    }

}
