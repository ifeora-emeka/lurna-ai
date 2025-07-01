import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setsApi } from '@/lib/api/sets';
import { CreateSetRequest } from '@/types/set.types';

export const useSets = () => {
  const queryClient = useQueryClient();

  const createSetFromPromptMutation = useMutation({
    mutationFn: (data: CreateSetRequest) => {
      return setsApi.createSetFromPrompt(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sets'] });
    }
  });

  return {
    createSet: createSetFromPromptMutation.mutate,
    createSetAsync: createSetFromPromptMutation.mutateAsync,
    isCreating: createSetFromPromptMutation.isPending,
    createError: createSetFromPromptMutation.error,
    createData: createSetFromPromptMutation.data,
    resetCreate: createSetFromPromptMutation.reset,
  };
};
