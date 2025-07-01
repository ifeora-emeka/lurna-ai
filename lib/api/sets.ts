import { api } from '@/lib/api';
import { CreateSetRequest, CreateSetResponse } from '@/types/set.types';

export const setsApi = {
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
