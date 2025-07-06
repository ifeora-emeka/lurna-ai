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
  },

  generateAssessment: async (unitId: number, nextSteps: any) => {
    try {
      const response = await api.post('/api/learning-path/generate-assessment', { 
        unitId, 
        nextSteps 
      });
      
      // Normalize assessment result property for consistency
      const data = response.data;
      if (data?.data) {
        if (data.data.assessmentResult && !data.data.assessment_result) {
          data.data.assessment_result = data.data.assessmentResult;
        } else if (data.data.assessment_result && !data.data.assessmentResult) {
          data.data.assessmentResult = data.data.assessment_result;
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('[DEBUG] learningPathApi.generateAssessment error:', error);
      throw error;
    }
  }
};
