import { api } from '@/lib/api';

export const assessmentResultApi = {
  submitAssessment: async (assessmentResultId: number, answers: any[]) => {
    try {
      const response = await api.post('/api/assessment-results/submit', {
        assessmentResultId,
        answers
      });
      
      // Normalize response to use consistent property names
      const data = response.data;
      if (data?.data) {
        // Convert assessmentResult to assessment_result for consistency if needed
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
  }
};
