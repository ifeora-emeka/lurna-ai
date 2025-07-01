import { api } from '@/lib/api';
import { CreateSetRequest, CreateSetResponse } from '@/types/set.types';

export const setsApi = {
  getSetBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/api/sets/${slug}`);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] setsApi.getSetBySlug error:', error);
      throw error;
    }
  },

  createSetFromPrompt: async (data: CreateSetRequest): Promise<CreateSetResponse> => {
    try {
      const response = await api.post<CreateSetResponse>('/api/sets/create/prompt', data);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] setsApi.createSetFromPrompt error:', error);
      throw error;
    }
  },
};
