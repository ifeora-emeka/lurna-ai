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

type PendingAssessmentResult = {
    pendingAssessment: {
        assessment: any | null;
        questions: any[];
        assessment_result: any;
    }
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

      const modules = await Module.findAll({
        where: { setId },
        order: [['index', 'ASC']]
      });

      if (!modules || modules.length === 0) {
        throw new Error('Cannot create learning path: Set has no modules');
      }

      const firstModule = modules[0];
      console.log('[DEBUG] First module for learning path:', firstModule.toJSON());

      const existingUnits = await Unit.findAll({
        where: { moduleId: firstModule.id },
        order: [['index', 'ASC']]
      });

      let firstUnit = null;
      if (!existingUnits || existingUnits.length === 0) {
        console.log('[DEBUG] No units found for first module, generating units');
        const generatedUnits = await UnitsService.generateUnitsForModule(firstModule.id, userId);
        if (generatedUnits && generatedUnits.length > 0) {
          firstUnit = generatedUnits[0];
        }
      } else {
        firstUnit = existingUnits[0];
      }

      const learningPath = await LearningPath.create({
        setId,
        createdBy: userId,
        currentModuleId: firstModule.id,
        currentUnitId: firstUnit ? firstUnit.id : null,
        lastUsed: new Date(),
        isCompleted: false
      });

      console.log('[DEBUG] Created new learning path:', learningPath.toJSON());
      
      if (firstUnit && !learningPath.currentUnitId) {
        await learningPath.update({
          currentUnitId: firstUnit.id
        });
        console.log('[DEBUG] Updated learning path with first unit ID:', firstUnit.id);
        return (await LearningPath.findByPk(learningPath.id))?.toJSON() || learningPath.toJSON();
      }
      
      return learningPath.toJSON();
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.findOrCreateLearningPath:', error);
      throw error;
    }
  };

  
  static async next({ setId, userId }: { userId: string, setId: number }): Promise<{
    nextSteps: LLMNextSteps;
    nextModule: null | number;
    nextUnit: null | number;
    currentUnitId: null | number;
    pendingAssessment: null | {
      assessment: Assessment | null;
      questions: any[];
      assessment_result: any;
    }
  }> {
    try {
      console.log('\n\n\n\nNEXT WAS CALLED FOR::', setId, 'userId:', userId);
      
      if (!setId || !userId) {
        throw new Error('setId and userId are required');
      }
      
      const pendingAssessment = await AssessmentResultService.getPendingAssessmentResult(userId, setId);
      if (pendingAssessment) {
        return {
          nextSteps: {
            messageForStudent: "You have an incomplete assessment. Please complete it before proceeding.",
            difficultyLevel: 'easy',
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

      const learningPathData = await this.findOrCreateLearningPath(setId, userId);
      
      if (!learningPathData || !learningPathData.currentModuleId || !learningPathData.currentUnitId) {
        console.log('[DEBUG] Learning path needs kickstart:', { 
          exists: !!learningPathData, 
          currentModuleId: learningPathData?.currentModuleId, 
          currentUnitId: learningPathData?.currentUnitId 
        });
        
        try {
          const kickstartedPath = await this.kickstartPathLearningPath({ setId, userId });
          if (!kickstartedPath) {
            throw new Error('Failed to kickstart learning path');
          }
          
          const kickstartedPathData = kickstartedPath.toJSON();
          const nextStepsOrPendingAssessment = await this.returnNextPathToTake(kickstartedPathData.currentUnitId!, userId);
          
          console.log('NEXT STEPS TO TAKE:::::::::', nextStepsOrPendingAssessment)

          if ('pendingAssessment' in nextStepsOrPendingAssessment) {
            return {
              nextSteps: {
                messageForStudent: "You have a pending assessment that needs to be completed first.",
                difficultyLevel: 'easy',
                canMoveForward: false,
                isTimed: false,
                areasToTackle: [],
                totalUnitAssessment: 0
              },
              nextModule: null,
              nextUnit: null,
              currentUnitId: kickstartedPathData.currentUnitId,
              pendingAssessment: nextStepsOrPendingAssessment.pendingAssessment
            };
          }
          
          const nextSteps = nextStepsOrPendingAssessment as LLMNextSteps;
          return {
            nextSteps,
            nextModule: nextSteps.canMoveForward ? kickstartedPathData.currentModuleId : null,
            nextUnit: nextSteps.canMoveForward ? kickstartedPathData.currentUnitId : null,
            currentUnitId: kickstartedPathData.currentUnitId,
            pendingAssessment: null
          };
        } catch (error) {
          console.error('[DEBUG] Error in kickstartPathLearningPath:', error);
          return {
            nextSteps: {
              messageForStudent: "There was an issue with your learning path. Please try again later.",
              difficultyLevel: 'easy',
              canMoveForward: false,
              isTimed: false,
              areasToTackle: [],
              totalUnitAssessment: 0
            },
            nextModule: null,
            nextUnit: null,
            currentUnitId: null,
            pendingAssessment: null
          };
        }
      }

      const nextStepsOrPendingAssessment = await this.returnNextPathToTake(learningPathData.currentUnitId!, userId);
      console.log('NEXT STEPS TO TAKE:::', nextStepsOrPendingAssessment)

      if ('pendingAssessment' in nextStepsOrPendingAssessment) {
        return {
          nextSteps: {
            messageForStudent: "You have a pending assessment that needs to be completed first.",
            difficultyLevel: 'easy',
            canMoveForward: false,
            isTimed: false,
            areasToTackle: [],
            totalUnitAssessment: 0
          },
          nextModule: null,
          nextUnit: null,
          currentUnitId: learningPathData.currentUnitId,
          pendingAssessment: nextStepsOrPendingAssessment.pendingAssessment
        };
      }
      
      const nextSteps = nextStepsOrPendingAssessment as LLMNextSteps;
      let nextModule = null;
      let nextUnit = null;      
      
      if (nextSteps.canMoveForward) {
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
      console.error('[DEBUG] Error in LearningPathService.next:', error)
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

      await LearningPath.update(
        {
          currentModuleId: firstModule.id,
          currentUnitId: firstUnit.id,
          lastUsed: new Date()
        },
        {
          where: { id: learningPath.id }
        }
      );


      const updatedLearningPath = await LearningPath.findByPk(learningPath.id);
      if (!updatedLearningPath) {
        throw new Error('Failed to retrieve updated learning path');
      }
      
      return updatedLearningPath;
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.kickstartPathLearningPath:', error);
      throw error;
    }
  }

  static async returnNextPathToTake(unitId: number, userId: string): Promise<LLMNextSteps | PendingAssessmentResult> {
    try {
      const unit = await Unit.findByPk(unitId);
      if (!unit) {
        throw new Error('Unit not found');
      }
      
      const existingAssessment = await Assessment.findOne({
        where: { 
          unitId, 
          setId: unit.setId,
          createdBy: userId 
        },
        order: [['created_at', 'DESC']]
      });
      
      const pendingAssessment = await AssessmentResultService.getPendingAssessmentResult(
        userId, 
        unit.setId, 
        existingAssessment ? existingAssessment.id : undefined
      );
      if (pendingAssessment) {
        return { pendingAssessment };
      }

      const assessmentHistoryForLLM = await this.compileAllUserResultsForUnit({ unitId, userId });

      if (assessmentHistoryForLLM.length > 0) {
        const lastAssessment = assessmentHistoryForLLM[0];
        const correctAnswers = lastAssessment.assessmentResult.result.filter((r: any) => r.isCorrect).length;
        const totalQuestions = lastAssessment.assessmentResult.result.length;
        const score = Math.round((correctAnswers / totalQuestions) * 100);
        const passed = score >= 80;
        
        console.log('PREVIOUS ASSESSMENT ANALYSIS::', {
          lastAssessmentScore: score,
          lastAssessmentDifficulty: lastAssessment.assessment.difficultyLevel,
          passed: passed,
          correctAnswers: correctAnswers,
          totalQuestions: totalQuestions,
          expectedProgression: passed && lastAssessment.assessment.difficultyLevel === 'easy' ? 'medium' : 
                              passed && lastAssessment.assessment.difficultyLevel === 'medium' ? 'hard' :
                              passed && lastAssessment.assessment.difficultyLevel === 'hard' ? 'next unit' :
                              'stay at current level'
        });
      }

      const prompt = evaluateNextStepsPrompt(unit.name, unit.description, assessmentHistoryForLLM);
      const nextStepsSchema = z.object({
        messageForStudent: z.string(),
        difficultyLevel: z.enum(['easy', 'medium', 'hard']),
        canMoveForward: z.boolean(),
        isTimed: z.boolean(),
        areasToTackle: z.array(z.string()),
        totalUnitAssessment: z.number().optional()
      });

      const LLMDecisionOnNextSteps = await AI.generateStructuredData({ prompt, zodSchema: nextStepsSchema });

      const validatedDecision = nextStepsSchema.parse(LLMDecisionOnNextSteps);
      
      return {
        messageForStudent: validatedDecision.messageForStudent,
        difficultyLevel: validatedDecision.difficultyLevel,
        canMoveForward: validatedDecision.canMoveForward,
        isTimed: validatedDecision.isTimed,
        areasToTackle: validatedDecision.areasToTackle || [],
        totalUnitAssessment: assessmentHistoryForLLM.length
      };
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.returnNextPathToTake:', error);
      throw error;
    }
  }

  static calculateAssessmentScore(assessmentResult: any): number {
    if (!assessmentResult) {
      console.warn('[WARN] calculateAssessmentScore called with null assessmentResult');
      return 0;
    }
    
    if (!assessmentResult.result || !Array.isArray(assessmentResult.result)) {
      console.warn('[WARN] calculateAssessmentScore: assessmentResult has no valid result array', 
        typeof assessmentResult.result, assessmentResult.result);
      return 0;
    }
    
    const correctAnswers = assessmentResult.result.filter((r: any) => r.isCorrect).length;
    const totalQuestions = assessmentResult.result.length;
    
    if (totalQuestions === 0) return 0;
    return Math.round((correctAnswers / totalQuestions) * 100);
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
              moduleId: result.moduleId,
              assessmentId: assessment.id
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
          difficultyLevel: 'easy',
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
        difficultyLevel: z.enum(['easy', 'medium', 'hard']),
        canMoveForward: z.boolean(),
        isTimed: z.boolean(),
        areasToTackle: z.array(z.string()),
        totalUnitAssessment: z.number().optional()
      });

      const result = await AI.generateStructuredData({ prompt, zodSchema: nextStepsSchema });
      
      const validatedResult = nextStepsSchema.parse(result);
      return validatedResult;
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.evaluatePreviousUnitAssessment:', error);
      throw error;
    }
  }

  

  
}
