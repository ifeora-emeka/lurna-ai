import { api } from '@/lib/api';
import { CreateLearningPathRequest } from '@/types/learning-path.types';

export const learningPathApi = {
  createLearningPath: async (data: CreateLearningPathRequest) => {
    try {
      const response = await api.post('/api/learning-path/create', data);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] learningPathApi.createLearningPath error:', error);
      throw error;
    }
  },
};
