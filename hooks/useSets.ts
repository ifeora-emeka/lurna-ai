import { useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
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

  const {
    data: setsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['sets'],
    queryFn: ({ pageParam = 1 }) => setsApi.getUserSets(pageParam, 20),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const sets = setsData?.pages.flatMap(page => page.sets) ?? [];

  return {
    sets,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: status === 'pending',
    error,
    createSet: createSetFromPromptMutation.mutate,
    createSetAsync: createSetFromPromptMutation.mutateAsync,
    isCreating: createSetFromPromptMutation.isPending,
    createError: createSetFromPromptMutation.error,
    createData: createSetFromPromptMutation.data,
    resetCreate: createSetFromPromptMutation.reset,
  };
};
