import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setsApi } from '@/lib/api/sets';
import { CreateSetRequest } from '@/types/set.types';

export const useSets = () => {
  const queryClient = useQueryClient();

  const createSetMutation = useMutation({
    mutationFn: (data: CreateSetRequest) => {
      console.log('[DEBUG] useSets - createSetMutation starting');
      console.log('[DEBUG] Request data:', data);
      return setsApi.createSet(data);
    },
    onSuccess: (data) => {
      console.log('[DEBUG] useSets - createSetMutation success');
      console.log('[DEBUG] Success data:', data);
      queryClient.invalidateQueries({ queryKey: ['sets'] });
    },
    onError: (error) => {
      console.error('[DEBUG] useSets - createSetMutation error');
      console.error('[DEBUG] Error:', error);
    },
  });

  return {
    createSet: createSetMutation.mutate,
    createSetAsync: createSetMutation.mutateAsync,
    isCreating: createSetMutation.isPending,
    createError: createSetMutation.error,
    createData: createSetMutation.data,
    resetCreate: createSetMutation.reset,
  };
};
