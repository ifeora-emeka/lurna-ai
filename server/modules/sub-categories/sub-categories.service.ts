import { SubCategory } from '../../models';
import { slugify } from '../../../lib/utils';
import CategoryService from '../categories/categories.service';
import { getRandomColor } from '../../helpers/random.helper';

export default class SubCategoryService {
  static async findOrCreateBySlug(name: string, categoryName: string = 'General') {
    try {
      const slug = slugify(name);
      
      const defaultIconClass = 'fa-solid fa-cube';
      
      const category = await CategoryService.findOrCreateBySlug(categoryName);
      
      const [subCategory, created] = await SubCategory.findOrCreate({
        where: { slug },
        defaults: {
          name,
          slug,
          categoryId: category.id,
          color: getRandomColor(),
          iconClass: defaultIconClass
        }
      });
      
      return subCategory;
    } catch (error) {
      console.error('[DEBUG] Error in SubCategoryService.findOrCreateBySlug:', error);
      throw error;
    }
  }
}
