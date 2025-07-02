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

      console.log('[DEBUG] Module data:', {
        id: moduleData.id,
        name: moduleData.name,
        set: moduleData.set,
        setRelationExists: Boolean(moduleData.get('setRelation'))
      });

      const existingUnits = await Unit.findAll({ 
        where: { moduleId: moduleId },
        order: [['index', 'ASC']]
      });

      if (existingUnits && existingUnits.length > 0) {
        console.log('[DEBUG] Units already exist for this module, returning existing units');
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
      } catch (error) {
        const aiError = error as Error;
        console.error('[DEBUG] AI generation error:', aiError);
        console.error('[DEBUG] AI error stack:', aiError.stack);
        throw new Error(`AI failed to generate valid units: ${aiError.message}`);
      }

      if (!generatedUnits || generatedUnits.length === 0) {
        throw new Error('AI failed to generate any units');
      }

      const createdUnits = [];
      
      const setId = moduleData.get('set');
      const setFromRelation = moduleData.get('setRelation');
      
      console.log('[DEBUG] Module setId:', setId);
      console.log('[DEBUG] Module setRelation exists:', Boolean(setFromRelation));
      
      if (!setId && !setFromRelation) {
        throw new Error('Cannot create units: Module is not associated with a valid set');
      }
      
      const finalSetId = setId || (setFromRelation ? (setFromRelation as any).id : null);
      
      if (!finalSetId) {
        throw new Error('Cannot create units: Failed to determine set ID from module data');
      }
      
      console.log('[DEBUG] Creating units with setId:', finalSetId);
      
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
      console.error('[DEBUG] Error in UnitsService.generateUnitsForModule:', error);
      throw error;
    }
  }
}
