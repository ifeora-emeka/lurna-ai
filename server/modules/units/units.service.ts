import { AI } from '../../helpers/ai.helper';
import { generateUnitsSchema } from './unit.dto';
import { unitGenerationPrompt } from './units.prompts';
import { Unit, Module, Set } from '../../models';

export default class UnitsService {
  static async generateUnitsForModule(moduleId: number, userId: string) {
    try {
      const moduleData = await Module.findOne({ 
        where: { id: moduleId },
        include: [
          {
            model: Set,
            as: 'setRelation',
            required: true
          }
        ]
      });
      
      if (!moduleData) {
        throw new Error('Module not found');
      }

      const existingUnits = await Unit.findAll({ 
        where: { moduleId: moduleId },
        order: [['index', 'ASC']]
      });

      if (existingUnits && existingUnits.length > 0) {
        return existingUnits.map(unit => unit.toJSON());
      }

      const enhancedPrompt = unitGenerationPrompt(
        moduleData.name,
        moduleData.description,
        moduleData.tags
      );

      let generatedUnits;
      try {
        generatedUnits = await AI.generateStructuredData({
          prompt: enhancedPrompt,
          zodSchema: generateUnitsSchema,
        });
        
        const validatedUnits = generateUnitsSchema.parse(generatedUnits);
        generatedUnits = validatedUnits;
        
      } catch (error) {
        const aiError = error as Error;
        throw new Error(`AI failed to generate valid units: ${aiError.message}`);
      }

      if (!generatedUnits || generatedUnits.length === 0) {
        throw new Error('AI failed to generate any units');
      }

      const createdUnits = [];
      
      const setId = moduleData.get('set');
      const setFromRelation = moduleData.get('setRelation');
      if (!setId && !setFromRelation) {
        throw new Error('Cannot create units: Module is not associated with a valid set');
      }
      const finalSetId = setId || (setFromRelation ? (setFromRelation as any).id : null);
      for (const unitData of generatedUnits) {
        const unit = await Unit.create({
          name: unitData.name,
          description: unitData.description,
          setId: Number(finalSetId),
          moduleId: Number(moduleId),    
          createdBy: userId,
          tags: unitData.tags,
          index: unitData.index,
        });
        createdUnits.push(unit.toJSON());
      }

      return createdUnits;
    } catch (error) {
      throw error;
    }
  }

  static async getOrGenerateNextUnit({setId, currentUnitID, currentModuleId}: {setId:number, currentUnitID:number, currentModuleId:number}) {
    try {
      const currentUnit = await Unit.findByPk(currentUnitID);
      if (!currentUnit) {
        throw new Error('Current unit not found');
      }

      const nextUnitInSameModule = await Unit.findOne({
        where: {
          moduleId: currentModuleId,
          index: currentUnit.index + 1
        }
      });

      if (nextUnitInSameModule) {
        return {
          nextUnit: nextUnitInSameModule.toJSON(),
          isNewModule: false
        };
      }

      const currentModule = await Module.findByPk(currentModuleId);
      if (!currentModule) {
        throw new Error('Current module not found');
      }

      const nextModule = await Module.findOne({
        where: {
          setId,
          index: currentModule.index + 1
        },
        include: [{
          model: Unit,
          as: 'units',
          required: false,
          order: [['index', 'ASC']]
        }]
      });

      if (!nextModule) {
        return {
          nextUnit: null,
          isNewModule: false,
          isCompleted: true
        };
      }

      let firstUnitOfNextModule = (nextModule as any).units?.[0];

      if (!firstUnitOfNextModule) {
        const generatedUnits = await this.generateUnitsForModule(nextModule.id, currentUnit.createdBy);
        if (generatedUnits && generatedUnits.length > 0) {
          firstUnitOfNextModule = generatedUnits[0];
        }
      }

      if (!firstUnitOfNextModule) {
        throw new Error('Failed to create units for the next module');
      }

      return {
        nextUnit: firstUnitOfNextModule,
        isNewModule: true
      };
    } catch (error) {
      console.error('[DEBUG] Error in UnitsService.getOrGenerateNextUnit:', error);
      throw error;
    }
  }
}
