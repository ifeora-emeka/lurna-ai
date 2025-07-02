import { LearningPath, Set } from '../../models';

export default class LearningPathService {
  static async createLearningPath(setId: number, userId: string) {
    try {
      const existingPath = await LearningPath.findOne({
        where: { setId, createdBy: userId }
      });

      if (existingPath) {
        return existingPath.toJSON();
      }

      const learningPath = await LearningPath.create({
        setId,
        createdBy: userId,
        currentModuleId: null,
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
