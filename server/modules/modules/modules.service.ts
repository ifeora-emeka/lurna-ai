import { AI } from '../../helpers/ai.helper';
import { generateModulesSchema, generateModuleSchema } from './module.dto';
import { moduleGenerationPrompt } from './modules.prompts';
import { Module, Set } from '../../models';
import slugify from 'slugify';
import { generateRandomId } from '../../helpers/random.helper';

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
      } catch (error) {
        const aiError = error as Error;
        console.error('[DEBUG] AI generation error:', aiError);
        console.error('[DEBUG] AI error stack:', aiError.stack);
        throw new Error(`AI failed to generate valid modules: ${aiError.message}`);
      }

      if (!generatedModules || generatedModules.length === 0) {
        throw new Error('AI failed to generate any modules');
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
