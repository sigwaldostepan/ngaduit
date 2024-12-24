import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

type GetCategoriesParams = {
  categoryName?: string;
};

const getCategories = async ({ categoryName }: GetCategoriesParams) => {
  const categories = await api.get('/categories', {
    withCredentials: true,
    params: { categoryName },
  });

  return categories.data;
};

type UseGetCategoriesOptions = {
  categoryName?: string;
  config?: MutationConfig<typeof getCategories>;
};

export const useGetCategories = ({
  categoryName,
  config,
}: UseGetCategoriesOptions) => {
  return useQuery({
    queryKey: ['categories', { query: categoryName }],
    queryFn: () => getCategories({ categoryName }),
    ...config,
  });
};
