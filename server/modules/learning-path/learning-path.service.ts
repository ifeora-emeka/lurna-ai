import { AI } from '@/server/helpers/ai.helper';
import { LearningPath, Set, Module, Unit, Assessment, Question, AssessmentResult } from '../../models';
import { LLMNextSteps } from '@/types/llm.types';
import AssessmentResultService from '../assessment-result/assessment-result.service';
import UnitsService from '../units/units.service';
import { evaluateNextStepsPrompt, generateAssessmentPrompt } from './learning-path.prompts';
import z from 'zod';

type CompiledUnitAssessment = {
    assessment: Assessment;
    questions: Question[];
    assessmentResult: AssessmentResult;
  }

export default class LearningPathService {
  static async findOrCreateLearningPath(setId: number, userId: string) {
    try {
      console.log('[DEBUG] findOrCreateLearningPath called with setId:', setId, 'userId:', userId);
      
      if (!setId || !userId) {
        throw new Error('setId and userId are required');
      }
      
      const existingPath = await LearningPath.findOne({
        where: { setId, createdBy: userId }
      });

      if (existingPath) {
        console.log('[DEBUG] Found existing learning path:', existingPath.toJSON());
        return existingPath.toJSON();
      }

      console.log('[DEBUG] No existing path found, creating new one');
      const modules = await Module.findAll({
        where: { setId },
        order: [['index', 'ASC']]
      });

      if (!modules || modules.length === 0) {
        throw new Error('Cannot create learning path: Set has no modules');
      }

      const firstModule = modules[0];
      console.log('[DEBUG] First module for learning path:', firstModule.toJSON());

      const learningPath = await LearningPath.create({
        setId,
        createdBy: userId,
        currentModuleId: firstModule.id,
        currentUnitId: null,
        lastUsed: new Date(),
        isCompleted: false
      });

      console.log('[DEBUG] Created new learning path:', learningPath.toJSON());
      return learningPath.toJSON();
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.findOrCreateLearningPath:', error);
      throw error;
    }
  }
  static async next({ setId, userId }: { userId: string, setId: number }): Promise<{
    nextSteps: LLMNextSteps;
    nextModule: null | number;
    nextUnit: null | number;
    currentUnitId: null | number;
    pendingAssessment: null | {assessment: Assessment, questions: Question[], result: AssessmentResult}
  }> {
    try {
      console.log('[DEBUG] LearningPathService.next called with setId:', setId, 'userId:', userId);
      
      if (!setId || !userId) {
        throw new Error('setId and userId are required');
      }
      
      const pendingAssessment = await AssessmentResultService.getPendingAssessmentResult(userId, setId);
      if (pendingAssessment) {
        return {
          nextSteps: {
            messageForStudent: "You have an incomplete assessment. Please complete it before proceeding.",
            difficultyLevel: null,
            canMoveForward: false,
            isTimed: false,
            areasToTackle: []
          },
          nextModule: null,
          nextUnit: null,
          currentUnitId: null,
          //@ts-ignore
          pendingAssessment
        };
      }

      console.log('[DEBUG] Fetching learning path for setId:', setId, 'userId:', userId);
      const learningPathData = await this.findOrCreateLearningPath(setId, userId);
      console.log('[DEBUG] Learning path result:', learningPathData);
      
      if (!learningPathData || !learningPathData.currentModuleId || !learningPathData.currentUnitId) {
        console.log('[DEBUG] Learning path needs kickstart:', { 
          exists: !!learningPathData, 
          currentModuleId: learningPathData?.currentModuleId, 
          currentUnitId: learningPathData?.currentUnitId 
        });
        const kickstartedPath = await this.kickstartPathLearningPath({ setId, userId });
        const kickstartedPathData = kickstartedPath.toJSON();
        const nextSteps = await this.returnNextPathToTake(kickstartedPathData.currentUnitId!, userId);
        
        return {
          nextSteps,
          nextModule: nextSteps.canMoveForward ? kickstartedPathData.currentModuleId : null,
          nextUnit: nextSteps.canMoveForward ? kickstartedPathData.currentUnitId : null,
          currentUnitId: kickstartedPathData.currentUnitId,
          pendingAssessment: null
        };
      }

      console.log('[DEBUG] Learning path is valid, getting next steps for unitId:', learningPathData.currentUnitId);
      const nextSteps = await this.returnNextPathToTake(learningPathData.currentUnitId!, userId);
      
      let nextModule = null;
      let nextUnit = null;      if (nextSteps.canMoveForward) {
        const nextUnitData = await UnitsService.getOrGenerateNextUnit({
          setId,
          currentUnitID: learningPathData.currentUnitId!,
          currentModuleId: learningPathData.currentModuleId!
        });

        if (nextUnitData.nextUnit) {
          nextUnit = nextUnitData.nextUnit.id;
          nextModule = nextUnitData.nextUnit.moduleId;
          
          const learningPathInstance = await LearningPath.findOne({
            where: { setId, createdBy: userId }
          });
          
          if (learningPathInstance) {
            await LearningPath.update(
              { 
                currentUnitId: nextUnit,
                currentModuleId: nextModule,
                lastUsed: new Date()
              },
              { where: { id: learningPathInstance.id } }
            );
          }
        }
      }

      return {
        nextSteps,
        nextModule,
        nextUnit,
        currentUnitId: learningPathData.currentUnitId,
        pendingAssessment: null
      };
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.next:', error);
      throw error;
    }
  }

  static async kickstartPathLearningPath({ setId, userId }: { userId: string, setId: number }): Promise<LearningPath> {
    try {
      const learningPath = await this.findOrCreateLearningPath(setId, userId);
      
      if (learningPath.currentModuleId && learningPath.currentUnitId) {
        return learningPath as LearningPath;
      }

      const modules = await Module.findAll({
        where: { setId },
        include: [{
          model: Unit,
          as: 'units',
          required: false
        }],
        order: [['index', 'ASC']]
      });

      if (!modules || modules.length === 0) {
        throw new Error('No modules found for this set');
      }

      const firstModule = modules[0];
      let firstUnit = (firstModule as any).units?.[0];

      if (!firstUnit) {
        const generatedUnits = await UnitsService.generateUnitsForModule(firstModule.id, userId);
        if (generatedUnits && generatedUnits.length > 0) {
          firstUnit = generatedUnits[0];
        }
      }

      if (!firstUnit) {
        throw new Error('Failed to create units for the first module');
      }

      const updatedPath = await LearningPath.update(
        {
          currentModuleId: firstModule.id,
          currentUnitId: firstUnit.id,
          lastUsed: new Date()
        },
        {
          where: { id: learningPath.id },
          returning: true
        }
      );

      return updatedPath[1][0];
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.kickstartPathLearningPath:', error);
      throw error;
    }
  }

  static async returnNextPathToTake(unitId: number, userId: string): Promise<LLMNextSteps> {
    try {
      const pendingAssessment = await AssessmentResultService.getPendingAssessmentResult(userId);
      if (pendingAssessment) {
        throw new Error('Student has pending assessment that must be completed first');
      }

      const assessmentHistoryForLLM = await this.compileAllUserResultsForUnit({ unitId, userId });

      if (assessmentHistoryForLLM.length === 0) {
        return {
          messageForStudent: `Welcome to this new unit! Let's start with an assessment to understand your current knowledge level.`,
          difficultyLevel: null,
          canMoveForward: false,
          isTimed: false,
          areasToTackle: [],
          totalUnitAssessment: 0
        };
      }

      const unit = await Unit.findByPk(unitId);
      if (!unit) {
        throw new Error('Unit not found');
      }

      const prompt = evaluateNextStepsPrompt(unit.name, unit.description, assessmentHistoryForLLM);

      const nextStepsSchema = z.object({
        messageForStudent: z.string(),
        difficultyLevel: z.enum(['easy', 'medium', 'hard']).nullable(),
        canMoveForward: z.boolean(),
        isTimed: z.boolean(),
        areasToTackle: z.array(z.string()),
        totalUnitAssessment: z.number().optional()
      });

      const result = await AI.generateStructuredData({ prompt, zodSchema: nextStepsSchema });
      return result;
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.returnNextPathToTake:', error);
      throw error;
    }
  }

  static async compileAllUserResultsForUnit({ unitId, userId }: { unitId: number, userId: string }): Promise<CompiledUnitAssessment[]> {
    try {
      const assessmentResults = await AssessmentResult.findAll({
        where: { 
          unitId, 
          createdBy: userId,
          isCompleted: true 
        },
        order: [['created_at', 'DESC']]
      });

      const compiledResults: CompiledUnitAssessment[] = [];

      for (const result of assessmentResults) {
        const assessment = await Assessment.findOne({
          where: {
            setId: result.setId,
            moduleId: result.moduleId,
            unitId: result.unitId,
            createdBy: userId
          },
          order: [['created_at', 'DESC']]
        });

        if (assessment) {
          const questions = await Question.findAll({
            where: { 
              unitId,
              setId: result.setId,
              moduleId: result.moduleId
            }
          });

          compiledResults.push({
            assessment,
            questions,
            assessmentResult: result
          });
        }
      }

      return compiledResults;
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.compileAllUserResultsForUnit:', error);
      throw error;
    }
  }

  static async evaluatePreviousUnitAssessment(unitAssessments: CompiledUnitAssessment[]): Promise<LLMNextSteps> {
    try {
      if (!unitAssessments || unitAssessments.length === 0) {
        return {
          messageForStudent: "Welcome! Let's start with your first assessment to understand your current knowledge level.",
          difficultyLevel: null,
          canMoveForward: false,
          isTimed: false,
          areasToTackle: []
        };
      }

      const unit = await Unit.findByPk(unitAssessments[0].assessmentResult.unitId);
      if (!unit) {
        throw new Error('Unit not found');
      }

      const prompt = evaluateNextStepsPrompt(unit.name, unit.description, unitAssessments);

      const nextStepsSchema = z.object({
        messageForStudent: z.string(),
        difficultyLevel: z.enum(['easy', 'medium', 'hard']).nullable(),
        canMoveForward: z.boolean(),
        isTimed: z.boolean(),
        areasToTackle: z.array(z.string()),
        totalUnitAssessment: z.number().optional()
      });

      const result = await AI.generateStructuredData({ prompt, zodSchema: nextStepsSchema });
      return result;
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.evaluatePreviousUnitAssessment:', error);
      throw error;
    }
  }

  static async generateAssessment({ unitId, userId, nextSteps }: { unitId: number, userId: string, nextSteps: LLMNextSteps }) {
    try {
      // First check if user has any incomplete assessment for this unit
      const unit = await Unit.findByPk(unitId);
      if (!unit) {
        throw new Error('Unit not found');
      }

      const existingPendingAssessment = await AssessmentResultService.getPendingAssessmentResult(userId, unit.setId);
      if (existingPendingAssessment && existingPendingAssessment.result.unitId === unitId) {
        // Return the existing incomplete assessment
        return existingPendingAssessment;
      }

      const prompt = generateAssessmentPrompt(
        unit.name,
        unit.description,
        nextSteps.difficultyLevel || 'medium',
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
          type: z.enum(['multiple_choice', 'multiple_select', 'true_false', 'short_answer']),
          environment: z.string(),
          options: z.array(z.object({
            id: z.string(),
            content: z.string(),
            isCorrect: z.boolean()
          })),
          correctAnswers: z.array(z.string()),
          explanation: z.string().nullable(),
          hint: z.string().nullable()
        }))
      });

      const generatedData = await AI.generateStructuredData({ prompt, zodSchema: assessmentSchema });

      const assessment = await Assessment.create({
        title: generatedData.assessment.title,
        description: generatedData.assessment.description,
        type: 'quiz',
        timeLimit: generatedData.assessment.timeLimit,
        difficultyLevel: generatedData.assessment.difficultyLevel,
        setId: unit.setId,
        moduleId: unit.moduleId,
        unitId: unit.id,
        createdBy: userId
      });

      const questions = await Promise.all(
        generatedData.questions.map((questionData: any) => 
          Question.create({
            content: questionData.content,
            type: questionData.type,
            environment: questionData.environment || 'default',
            options: questionData.options,
            correctAnswers: questionData.correctAnswers || [],
            explanation: questionData.explanation || null,
            hint: questionData.hint || null,
            setId: unit.setId,
            moduleId: unit.moduleId,
            unitId: unit.id,
            createdBy: userId,
          })
        )
      );

      const assessmentResult = await AssessmentResult.create({
        createdBy: userId,
        setId: unit.setId,
        moduleId: unit.moduleId,
        unitId: unit.id,
        result: [],
        difficultyLevel: generatedData.assessment.difficultyLevel,
        isCompleted: false
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
