import { AI } from '../../helpers/ai.helper';
import { generateSetSchema } from './set.dto';
import { setCreationPrompt } from './set.prompts';
import { Set, Module, Unit, LearningPath } from '../../models';
import { GeneratedSetData } from '../../../types/set.types';
import slugify from 'slugify';
import { generateRandomId, getRandomColor } from '../../helpers/random.helper';
import { Op } from 'sequelize';
import LearningPathService from '../learning-path/learning-path.service';
import CategoryService from '../categories/categories.service';
import SubCategoryService from '../subcategories/subcategories.service';

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
        order: [['lastUsed', 'DESC'], ['updated_at', 'DESC']],
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

  static async getSetBySlug(slug: string, userId: string) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const setData = await Set.findOne({
        where: { slug },
        include: [
          {
            model: Module,
            as: 'modules',
            required: false,
            include: [
              {
                model: Unit,
                as: 'units',
                required: false
              }
            ]
          }
        ]
      });

      if (!setData) {
        throw new Error('Set not found');
      }

      await setData.update({ lastUsed: new Date() });

      const result = setData.toJSON();

      let learningPath = null;
      try {
        learningPath = await LearningPathService.findOrCreateLearningPath(setData.id!, userId);
      } catch (error) {
        console.warn('[DEBUG] Could not get/create learning path:', error);
      }

      return {
        ...result,
        learningPath
      };
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

      const categorySlug = slugify(generatedData.categorySlug);
      const subCategorySlug = slugify(generatedData.subCategorySlug);
      
      const category = await CategoryService.findOrCreateBySlug(generatedData.categorySlug, generatedData.iconClass);
      const subCategory = await SubCategoryService.findOrCreateBySlug(generatedData.subCategorySlug, category.id, generatedData.iconClass);

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
        categoryId: category.id,
        subCategoryId: subCategory.id
      });

      return setData.toJSON();
    } catch (error) {
      console.error('[DEBUG] Error in SetsService.createFromPrompt:', error);
      console.error('[DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error; 
    }
  }
}