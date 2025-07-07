import { api } from '@/lib/api';

export const assessmentResultApi = {
  updateTimeStarted: async (assessmentResultId: number) => {
    try {
      const response = await api.put('/api/assessment-results/update-time-started', {
        assessmentResultId
      });
      return response.data;
    } catch (error) {
      console.error('[DEBUG] assessmentResultApi.updateTimeStarted error:', error);
      throw error;
    }
  },

  submitAssessment: async (assessmentResultId: number, answers: any[]) => {
    try {
      const response = await api.post('/api/assessment-results/submit', {
        assessmentResultId,
        answers
      });
      
      const data = response.data;
      if (data?.data) {
        if (data.data.assessmentResult && !data.data.assessment_result) {
          data.data.assessment_result = data.data.assessmentResult;
          delete data.data.assessmentResult;
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('[DEBUG] assessmentResultApi.submitAnswers error:', error);
      throw error;
    }
  },
  submitAnswers: async (assessmentResultId: number, answers: any[]) => {
    try {
      const response = await api.post('/api/assessment-results/submit', {
        assessmentResultId,
        answers
      });
      return response.data;
    } catch (error) {
      console.error('[DEBUG] assessmentResultApi.submitAnswers error:', error);
      throw error;
    }
  }
};
