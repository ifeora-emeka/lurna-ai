import { AI } from '../../helpers/ai.helper';
import Set from '../../models/Set';
import { generateModuleSchema } from './set.dto';

export default class SetsService {
  static async create(prompt: string) {
    console.log('[DEBUG] SetsService.create called with prompt:', prompt);
    
    try {
      const enhancedPrompt = `Based on the following learning topic, generate 5-8 educational modules that would help someone learn this subject comprehensively. Each module should have a clear name and optional description.

Topic: ${prompt}

Please create modules that progress logically from basic concepts to more advanced topics.`;

      console.log('[DEBUG] Enhanced prompt created:', enhancedPrompt);
      console.log('[DEBUG] Calling AI.generateStructuredData...');
      
      const data = await AI.generateStructuredData({
        prompt: enhancedPrompt,
        zodSchema: generateModuleSchema,
      });
      
      console.log('[DEBUG] AI.generateStructuredData completed successfully');
      console.log('[DEBUG] Generated data:', data);
      
      return data;
    } catch (error) {
      console.error('[DEBUG] Error in SetsService.create:', error);
      console.error('[DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error;
    }
  }
}