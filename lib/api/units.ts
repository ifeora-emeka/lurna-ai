import { api } from '../api';

export const unitsApi = {
  generateUnitsForModule: async (moduleId: number) => {
    try {
      const response = await api.post(`/api/units/generate/${moduleId}`);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] unitsApi.generateUnitsForModule error:', error);
      throw error;
    }
  },
};
