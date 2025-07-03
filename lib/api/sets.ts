import { api } from '@/lib/api';
import { CreateSetRequest, CreateSetResponse } from '@/types/set.types';

export const setsApi = {
  getUserSets: async (page: number = 1, limit: number = 20, search?: string) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search })
      });
      const response = await api.get(`/api/sets/user?${params}`);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] setsApi.getUserSets error:', error);
      throw error;
    }
  },

  getSetBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/api/sets/${slug}`);
      console.log('SET DETAILS RES::::::', response.data)
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
