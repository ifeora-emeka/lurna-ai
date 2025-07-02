import { AI } from '../../helpers/ai.helper';
import { generateSetSchema } from './set.dto';
import { setCreationPrompt } from './set.prompts';
import { Set, Module } from '../../models';
import { GeneratedSetData } from '../../../types/set.types';
import slugify from 'slugify';
import { generateRandomId, getRandomColor } from '../../helpers/random.helper';
import { Op } from 'sequelize';

export default class SetsService {
  static async getUserSets(userId: string, page: number = 1, limit: number = 20, search?: string) {
    try {
      const offset = (page - 1) * limit;
      const where: any = { createdBy: userId };
      
      if (search) {
        where[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { keywords: { [Op.like]: `%${search}%` } }
        ];
      }

      const { count, rows } = await Set.findAndCountAll({
        where,
        order: [['lastUsed', 'DESC'], ['updatedAt', 'DESC']],
        limit,
        offset
      });

      return {
        sets: rows.map(set => set.toJSON()),
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
          hasMore: page * limit < count
        }
      };
    } catch (error) {
      console.error('[DEBUG] Error in SetsService.getUserSets:', error);
      throw error;
    }
  }

  static async getSetBySlug(slug: string) {
    try {
      const setData = await Set.findOne({
        where: { slug },
        include: [
          {
            model: Module,
            as: 'modules',
            required: false
          }
        ]
      });

      if (!setData) {
        throw new Error('Set not found');
      }

      await setData.update({ lastUsed: new Date() });

      return setData.toJSON();
    } catch (error) {
      console.error('[DEBUG] Error in SetsService.getSetBySlug:', error);
      throw error;
    }
  }

  static async createFromPrompt(prompt: string, userId: string) {
    try {
      const enhancedPrompt = setCreationPrompt(prompt);

      let generatedData: GeneratedSetData;
      try {
        generatedData = await AI.generateStructuredData({
          prompt: enhancedPrompt,
          zodSchema: generateSetSchema,
        });
        
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

      const setData = await Set.create({
        name: generatedData.name,
        slug: slug,
        description: generatedData.description,
        keywords: generatedData.keywords,
        originalPrompt: prompt,
        iconClass: generatedData.iconClass,
        color: getRandomColor(),
        createdBy: userId,
      });

      return setData.toJSON();
    } catch (error) {
      console.error('[DEBUG] Error in SetsService.createFromPrompt:', error);
      console.error('[DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error; 
    }
  }
}