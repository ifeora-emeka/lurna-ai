import { Category, SubCategory } from '../../models';
import { slugify } from '../../../lib/utils';
import { getRandomColor } from '../../helpers/random.helper';

export default class SubCategoryService {
  static async findOrCreateBySlug(name: string, categoryId: number, iconClass: string = 'fa-solid fa-bookmark') {
    try {
      const slug = slugify(name);
      
      const [subCategory, created] = await SubCategory.findOrCreate({
        where: { slug },
        defaults: {
          name,
          slug,
          categoryId,
          color: getRandomColor(),
          iconClass
        }
      });
      
      return subCategory;
    } catch (error) {
      console.error('[DEBUG] Error in SubCategoryService.findOrCreateBySlug:', error);
      throw error;
    }
  }
}
