import { AI } from '../../helpers/ai.helper';
import { generateSetSchema } from './set.dto';
import { setCreationPrompt } from './set.prompts';
import { Set } from '../../models/Set';
import { GeneratedSetData } from '../../../types/set.types';
import slugify from 'slugify';
import { generateRandomId } from '../../helpers/random.helper';

export default class SetsService {
  static async createFromPrompt(prompt: string, userId: string) {
    try {
      console.log('[DEBUG] Creating set from prompt:', prompt);
      const enhancedPrompt = setCreationPrompt(prompt);
      console.log('[DEBUG] Enhanced prompt created');

      let generatedData: GeneratedSetData;
      try {
        console.log('[DEBUG] Calling AI.generateStructuredData');
        generatedData = await AI.generateStructuredData({
          prompt: enhancedPrompt,
          zodSchema: generateSetSchema,
        });
        console.log('[DEBUG] AI response successfully parsed:', generatedData);
      } catch (error) {
        const aiError = error as Error;
        console.error('[DEBUG] AI processing error:', aiError);
        throw new Error(`AI failed to generate valid data: ${aiError.message}`);
      }

      const baseSlug = slugify(generatedData.name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      const uniqueId = generateRandomId();
      const slug = `${baseSlug}-${uniqueId}`;
      console.log('[DEBUG] Generated slug:', slug);

      console.log('[DEBUG] Creating set in database');
      const setData = await Set.create({
        name: generatedData.name,
        slug: slug,
        description: generatedData.description,
        keywords: generatedData.keywords,
        originalPrompt: prompt,
        iconClass: generatedData.iconClass,
        createdBy: userId,
      });
      console.log('[DEBUG] Set created successfully with ID:', setData.id);

      return setData.toJSON();
    } catch (error) {
      console.error('[DEBUG] Error in SetsService.createFromPrompt:', error);
      console.error('[DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error; // Re-throw to be handled by the controller
    }
  }
}