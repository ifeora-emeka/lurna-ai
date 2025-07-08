import { api } from '@/lib/api';

export const assessmentApi = {
    generateAssessment: async (unitId: number, nextSteps: any, learningPathId: number) => {
        try {
            const response = await api.post('/api/assessments/generate-assessment', {
                unitId,
                nextSteps,
                learningPathId
            });

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
            console.error('[DEBUG] assessmentApi.generateAssessment error:', error);
            throw error;
        }
    }
};