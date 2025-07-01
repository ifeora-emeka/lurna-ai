import { AI } from '../../helpers/ai.helper';
import { generateModulesSchema, generateModuleSchema } from './module.dto';
import { moduleGenerationPrompt } from './modules.prompts';
import { Module, Set } from '../../models';
import slugify from 'slugify';
import { generateRandomId } from '../../helpers/random.helper';

// Fallback modules in case AI generation fails
function generateFallbackModules(setName: string) {
  return [
    {
      name: `Introduction to ${setName}`,
      description: `Learn the fundamentals and core concepts of ${setName}`,
      tags: ["introduction", "basics", "fundamentals"],
      index: 0
    },
    {
      name: `Intermediate ${setName} Concepts`,
      description: `Build upon the basics with more advanced ${setName} techniques and practices`,
      tags: ["intermediate", "practical", "techniques"],
      index: 1
    },
    {
      name: `Advanced ${setName} Topics`,
      description: `Master complex aspects and specialized knowledge in ${setName}`,
      tags: ["advanced", "specialized", "mastery"],
      index: 2
    }
  ];
}

export default class ModulesService {
  static async generateModulesForSet(setSlug: string, userId: string) {
    try {
      const setData = await Set.findOne({ where: { slug: setSlug } });
      
      if (!setData) {
        throw new Error('Set not found');
      }

      // Check if modules already exist for this set
      const existingModules = await Module.findAll({ 
        where: { set: setData.id },
        order: [['index', 'ASC']]
      });

      if (existingModules && existingModules.length > 0) {
        console.log('[DEBUG] Modules already exist for this set, returning existing modules');
        return existingModules.map(module => module.toJSON());
      }

      const enhancedPrompt = moduleGenerationPrompt(
        setData.name,
        setData.description,
        setData.keywords
      );

      let generatedModules;
      try {
        console.log('[DEBUG] Sending prompt to AI:', enhancedPrompt.substring(0, 200) + '...');
        generatedModules = await AI.generateStructuredData({
          prompt: enhancedPrompt,
          zodSchema: generateModulesSchema,
        });
        console.log('[DEBUG] Successfully generated modules:', JSON.stringify(generatedModules).substring(0, 200) + '...');
      } catch (error) {
        const aiError = error as Error;
        console.error('[DEBUG] AI generation error:', aiError);
        console.error('[DEBUG] AI error stack:', aiError.stack);
        throw new Error(`AI failed to generate valid modules: ${aiError.message}`);
      }

      // If no modules were generated or the array is empty, use fallback modules
      if (!generatedModules || generatedModules.length === 0) {
        console.log('[DEBUG] Using fallback modules as AI returned empty result');
        generatedModules = generateFallbackModules(setData.name);
      }

      const createdModules = [];
      
      for (const moduleData of generatedModules) {
        const baseSlug = slugify(moduleData.name, {
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g
        });
        const uniqueId = generateRandomId();
        const slug = `${baseSlug}-${uniqueId}`;

        const module = await Module.create({
          name: moduleData.name,
          slug: slug,
          description: moduleData.description,
          set: setData.id!,
          createdBy: userId,
          tags: moduleData.tags,
          index: moduleData.index,
        });

        createdModules.push(module.toJSON());
      }

      return createdModules;
    } catch (error) {
      console.error('[DEBUG] Error in ModulesService.generateModulesForSet:', error);
      throw error;
    }
  }
}
