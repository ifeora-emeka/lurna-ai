import { api } from '@/lib/api';
import { CreateSetRequest, CreateSetResponse } from '@/types/set.types';

export const setsApi = {
  createSet: async (data: CreateSetRequest): Promise<CreateSetResponse> => {
    console.log('[DEBUG] setsApi.createSet called');
    console.log('[DEBUG] Request data:', data);
    
    try {
      console.log('[DEBUG] Making POST request to /api/sets/create');
      const response = await api.post<CreateSetResponse>('/api/sets/create', data);
      console.log('[DEBUG] POST request successful');
      console.log('[DEBUG] Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] setsApi.createSet error:', error);
      throw error;
    }
  },
};
