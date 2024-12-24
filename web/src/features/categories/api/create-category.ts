import { api } from '@/lib/api-client';
import { CreateCategorySchema } from '../schemas/create-category-schema';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

const createCategory = async (payload: CreateCategorySchema) => {
  return api.post('/categories', payload, {
    withCredentials: true,
  });
};

type UseCreateCategoryOptions = MutationConfig<typeof createCategory>;

export const useCreateCategory = (config?: UseCreateCategoryOptions) => {
  return useMutation({
    mutationKey: ['create-category'],
    mutationFn: createCategory,
    ...config,
  });
};
