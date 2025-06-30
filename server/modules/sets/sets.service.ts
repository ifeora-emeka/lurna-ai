import { AI } from '../../helpers/ai.helper';
import Set from '../../models/Set';
import { generateModuleSchema } from './set.dto';

export default class SetsService {
  static async create() {
    const data = await AI.generateStructuredData({
      prompt: 'Generate a hardcoded set with a name and description',
      zodSchema: generateModuleSchema,
    })
    return data;
  }
}