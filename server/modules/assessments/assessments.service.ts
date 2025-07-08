import { LLMNextSteps } from '../../../types/llm.types';
import AssessmentResultService from '../assessment-result/assessment-result.service';
import { Set, Unit, Assessment, Question, AssessmentResult } from '../../models';
import z from 'zod';
import { AI } from '../../helpers/ai.helper';
import { generateAssessmentPrompt } from '../learning-path/learning-path.prompts'

export default class AssessmentsService {

     static async generateAssessment({ unitId, userId, nextSteps, learningPathId }: { unitId: number, userId: string, nextSteps: LLMNextSteps, learningPathId: number }) {
    try {
      const unit = await Unit.findByPk(unitId);
      if (!unit) {
        throw new Error('Unit not found');
      }
      
      const set = await Set.findByPk(unit.setId);
      if (!set) {
        throw new Error('Set not found');
      }

      const existingAssessment = await Assessment.findOne({
        where: {
          unitId,
          setId: unit.setId,
          createdBy: userId
        },
        order: [['created_at', 'DESC']]
      });

      const existingPendingAssessment = await AssessmentResultService.getPendingAssessmentResult(
        userId, 
        unit.setId,
        existingAssessment ? existingAssessment.id : undefined
      );
      
      if (existingPendingAssessment) {
        const assessmentResult = existingPendingAssessment.assessment_result;
        
        if (assessmentResult && assessmentResult.unitId === unitId && assessmentResult.assessmentId) {
          return existingPendingAssessment;
        }
      }

      const prompt = generateAssessmentPrompt(
        unit.name,
        unit.description,
        nextSteps.difficultyLevel,
        nextSteps.areasToTackle,
        nextSteps.isTimed
      );

      const assessmentSchema = z.object({
        assessment: z.object({
          title: z.string(),
          description: z.string(),
          type: z.string(),
          timeLimit: z.number().nullable(),
          difficultyLevel: z.enum(['easy', 'medium', 'hard'])
        }),
        questions: z.array(z.object({
          content: z.string(),
          type: z.enum(['multiple_choice', 'multiple_select', 'true_false', 'short_answer', 'text']),
          environment: z.string(),
          options: z.array(z.object({
            id: z.string(),
            content: z.string()
          })),
          explanation: z.string().nullable(),
          hint: z.string().nullable()
        }))
      });

      const generatedData = await AI.generateStructuredData({ prompt, zodSchema: assessmentSchema });

      const validatedData = assessmentSchema.parse(generatedData);

      const assessment = await Assessment.create({
        title: validatedData.assessment.title,
        description: validatedData.assessment.description,
        type: 'quiz',
        timeLimit: validatedData.assessment.timeLimit,
        difficultyLevel: validatedData.assessment.difficultyLevel,
        setId: unit.setId,
        moduleId: unit.moduleId,
        unitId: unit.id,
        createdBy: userId,
        categoryId: set.categoryId,
        subCategoryId: set.subCategoryId
      });

      const questions = await Promise.all(
        validatedData.questions.map((questionData: any) => 
          Question.create({
            content: questionData.content,
            type: questionData.type,
            environment: questionData.environment || 'default',
            options: questionData.options,
            explanation: questionData.explanation || null,
            hint: questionData.hint || null,
            setId: unit.setId,
            moduleId: unit.moduleId,
            unitId: unit.id,
            assessmentId: assessment.id,
            createdBy: userId,
            categoryId: set.categoryId,
            subCategoryId: set.subCategoryId
          })
        )
      );

      const assessmentResult = await AssessmentResult.create({
        createdBy: userId,
        setId: unit.setId,
        moduleId: unit.moduleId,
        unitId: unit.id,
        assessmentId: assessment.id,
        result: [],
        difficultyLevel: validatedData.assessment.difficultyLevel,
        isCompleted: false,
        categoryId: set.categoryId,
        subCategoryId: set.subCategoryId,
        learningPathId
      });

      return {
        assessment: assessment.toJSON(),
        questions: questions.map(q => q.toJSON()),
        assessmentResult: assessmentResult.toJSON()
      };
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.generateAssessment:', error);
      throw error;
    }
  } 

}
