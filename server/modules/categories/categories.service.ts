import { Category } from '../../models';
import { slugify } from '../../../lib/utils';
import { getRandomColor } from '../../helpers/random.helper';

export default class CategoryService {
  static async findOrCreateBySlug(name: string, iconClass: string = 'fa-solid fa-book') {
    try {
      const slug = slugify(name);
      
      const [category, created] = await Category.findOrCreate({
        where: { slug },
        defaults: {
          name,
          slug,
          color: getRandomColor(),
          iconClass
        }
      });
      
      return category;
    } catch (error) {
      console.error('[DEBUG] Error in CategoryService.findOrCreateBySlug:', error);
      throw error;
    }
  }
}
