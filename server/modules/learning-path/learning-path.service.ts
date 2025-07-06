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
      console.log('[DEBUG] LearningPathService.next called with setId:', setId, 'userId:', userId);
      
      if (!setId || !userId) {
        throw new Error('setId and userId are required');
      }
      
      console.log('\n\nGETTING PENDING ASSESSMENT RESULT FOR NEXT')
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
          

          if ('pendingAssessment' in nextStepsOrPendingAssessment) {
            return {
              nextSteps: {
                messageForStudent: "You have a pending assessment that needs to be completed first.",
                difficultyLevel: null,
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
          
          return {
            nextSteps: nextStepsOrPendingAssessment,
            nextModule: nextStepsOrPendingAssessment.canMoveForward ? kickstartedPathData.currentModuleId : null,
            nextUnit: nextStepsOrPendingAssessment.canMoveForward ? kickstartedPathData.currentUnitId : null,
            currentUnitId: kickstartedPathData.currentUnitId,
            pendingAssessment: null
          };
        } catch (error) {
          console.error('[DEBUG] Error in kickstartPathLearningPath:', error);
          return {
            nextSteps: {
              messageForStudent: "There was an issue with your learning path. Please try again later.",
              difficultyLevel: null,
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

      console.log('[DEBUG] Learning path is valid, getting next steps for unitId:', learningPathData.currentUnitId);
      const nextStepsOrPendingAssessment = await this.returnNextPathToTake(learningPathData.currentUnitId!, userId);
      

      if ('pendingAssessment' in nextStepsOrPendingAssessment) {
        return {
          nextSteps: {
            messageForStudent: "You have a pending assessment that needs to be completed first.",
            difficultyLevel: null,
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
      
      const nextSteps = nextStepsOrPendingAssessment;
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
      
      console.log('\n\nGETTING PENDING ASSESSMENT RESULT FOR NEXT PATH TO TAKE')
      const pendingAssessment = await AssessmentResultService.getPendingAssessmentResult(
        userId, 
        unit.setId, 
        existingAssessment ? existingAssessment.id : undefined
      );
      if (pendingAssessment) {
        return { pendingAssessment };
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

      // Implement the updated progression criteria manually instead of relying solely on LLM
      const lastAssessment = assessmentHistoryForLLM[0]; // Most recent assessment
      
      // Safety check
      if (!lastAssessment || !lastAssessment.assessment || !lastAssessment.assessmentResult) {
        console.warn('[WARN] Missing last assessment data in returnNextPathToTake');
        return {
          messageForStudent: "Let's start with a new assessment.",
          difficultyLevel: 'easy' as 'easy' | 'medium' | 'hard',
          canMoveForward: false,
          isTimed: false,
          areasToTackle: [],
          totalUnitAssessment: assessmentHistoryForLLM.length
        };
      }
      
      const lastDifficulty = lastAssessment.assessment.difficultyLevel;
      
      // Calculate the score from the assessment result
      const lastScore = this.calculateAssessmentScore(lastAssessment.assessmentResult);
      console.log('[DEBUG] Last assessment score:', lastScore, 'difficulty:', lastDifficulty);
      
      let canMoveForward = false;
      let nextDifficultyLevel = lastDifficulty;
      let message = '';
      
      // Apply new progression rules
      if (lastDifficulty === 'hard' && lastScore >= 80) {
        canMoveForward = true;
        message = `Great job! You've scored ${lastScore}% on a hard assessment, which means you're ready to move to the next unit!`;
      } else if (lastDifficulty === 'hard' && lastScore < 80) {
        canMoveForward = false;
        nextDifficultyLevel = 'hard';
        message = `You scored ${lastScore}% on the hard assessment. You need at least 80% to move forward. Let's try another hard assessment to help you master the material.`;
      } else if (lastDifficulty === 'medium' && lastScore >= 80) {
        canMoveForward = false;
        nextDifficultyLevel = 'hard';
        message = `Excellent work on the medium difficulty assessment! You scored ${lastScore}%. Let's challenge you with a hard assessment before moving to the next unit.`;
      } else if (lastDifficulty === 'medium' && lastScore < 80) {
        canMoveForward = false;
        nextDifficultyLevel = 'medium';
        message = `You scored ${lastScore}% on the medium assessment. Let's try another one to improve your understanding.`;
      } else if (lastDifficulty === 'easy' && lastScore >= 80) {
        canMoveForward = false;
        nextDifficultyLevel = 'medium';
        message = `Good job on the easy assessment! You scored ${lastScore}%. Let's try a medium difficulty assessment next.`;
      } else {
        canMoveForward = false;
        nextDifficultyLevel = 'easy';
        message = `You scored ${lastScore}% on the easy assessment. Let's try another one to strengthen your fundamentals.`;
      }

      // Get areas to tackle from the LLM
      const prompt = evaluateNextStepsPrompt(unit.name, unit.description, assessmentHistoryForLLM);
      const nextStepsSchema = z.object({
        messageForStudent: z.string(),
        difficultyLevel: z.enum(['easy', 'medium', 'hard']).nullable(),
        canMoveForward: z.boolean(),
        isTimed: z.boolean(),
        areasToTackle: z.array(z.string()),
        totalUnitAssessment: z.number().optional()
      });

      const llmResult = await AI.generateStructuredData({ prompt, zodSchema: nextStepsSchema });
      
      // Override LLM decision with our fixed progression rules
      return {
        messageForStudent: message,
        difficultyLevel: nextDifficultyLevel as 'easy' | 'medium' | 'hard',
        canMoveForward: canMoveForward,
        isTimed: llmResult.isTimed || false,
        areasToTackle: llmResult.areasToTackle || [],
        totalUnitAssessment: assessmentHistoryForLLM.length
      };
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.returnNextPathToTake:', error);
      throw error;
    }
  }

  // Helper method to calculate assessment score percentage
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

      console.log('\n\nGETTING PENDING ASSESSMENT RESULT FOR ASSESSMENT GENERATION', unit.name)
      const existingPendingAssessment = await AssessmentResultService.getPendingAssessmentResult(
        userId, 
        unit.setId, //todo: incoming unit is wrong
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
            content: z.string()
          })),
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
        createdBy: userId,
        categoryId: set.categoryId,
        subCategoryId: set.subCategoryId
      });

      const questions = await Promise.all(
        generatedData.questions.map((questionData: any) => 
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
        difficultyLevel: generatedData.assessment.difficultyLevel,
        isCompleted: false,
        categoryId: set.categoryId,
        subCategoryId: set.subCategoryId
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
