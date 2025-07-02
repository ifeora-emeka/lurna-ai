import { LearningPath, Set, Module } from '../../models';

export default class LearningPathService {
  static async createLearningPath(setId: number, userId: string) {
    try {
      const existingPath = await LearningPath.findOne({
        where: { setId, createdBy: userId }
      });

      if (existingPath) {
        return existingPath.toJSON();
      }
      
      const modules = await Module.findAll({
        where: { setId },
        order: [['index', 'ASC']]
      });
      
      if (!modules || modules.length === 0) {
        throw new Error('Cannot create learning path: Set has no modules');
      }
      
      const firstModule = modules[0];
      
      const learningPath = await LearningPath.create({
        setId,
        createdBy: userId,
        currentModuleId: firstModule.id,
        currentUnitId: null,
        lastUsed: new Date(),
        isCompleted: false
      });

      return learningPath.toJSON();
    } catch (error) {
      console.error('[DEBUG] Error in LearningPathService.createLearningPath:', error);
      throw error;
    }
  }
}
