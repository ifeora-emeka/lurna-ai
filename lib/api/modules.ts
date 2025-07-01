import { api } from '../api';

export const modulesApi = {
  generateModulesForSet: async (setSlug: string) => {
    try {
      const response = await api.post(`/api/modules/generate/${setSlug}`);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] modulesApi.generateModulesForSet error:', error);
      throw error;
    }
  },
};
