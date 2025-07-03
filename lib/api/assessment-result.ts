import { api } from '@/lib/api';

export const assessmentResultApi = {
  submitAssessment: async (assessmentResultId: number, answers: any[]) => {
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
