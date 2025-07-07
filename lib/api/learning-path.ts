import { api } from '@/lib/api';

export const learningPathApi = {
  createLearningPath: async (setId: number) => {
    try {
      const response = await api.post('/api/learning-path/create', { setId });
      return response.data;
    } catch (error) {
      console.error('[DEBUG] learningPathApi.createLearningPath error:', error);
      throw error;
    }
  },

  getNextSteps: async (setId: number) => {
    try {
      const response = await api.post('/api/learning-path/next', { setId });
      return response.data;
    } catch (error) {
      console.error('[DEBUG] learningPathApi.getNextSteps error:', error);
      throw error;
    }
  }
};
