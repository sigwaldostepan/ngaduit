import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

const deleteCategory = async (categoryId: string) => {
  return await api.delete(`/categories/${categoryId}`, {
    withCredentials: true,
  });
};

type UseDeleteCategoryOptions = MutationConfig<typeof deleteCategory>;

export const useDeleteCategory = (config?: UseDeleteCategoryOptions) => {
  return useMutation({
    mutationKey: ['delete-category'],
    mutationFn: deleteCategory,
    ...config,
  });
};
