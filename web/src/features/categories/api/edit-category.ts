import { api } from '@/lib/api-client';
import { EditCategoryFormSchema } from '../schemas/edit-category-schema';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

type EditCategoryParams = {
  categoryId: string;
  payload: EditCategoryFormSchema;
};

const editCategory = async ({ categoryId, payload }: EditCategoryParams) => {
  return api.put(`/categories/${categoryId}`, payload, {
    withCredentials: true,
  });
};

type UseEditCategoryOptions = MutationConfig<typeof editCategory>;

export const useEditCategory = (config?: UseEditCategoryOptions) => {
  return useMutation({
    mutationKey: ['edit-category'],
    mutationFn: editCategory,
    ...config,
  });
};
