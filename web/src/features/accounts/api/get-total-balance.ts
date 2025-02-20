import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { TotalBalance } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getTotalBalance = async () => {
  const response = await api.get<TotalBalance>('/total-balance');

  return response.data;
};

type UseGetTotalBalanceOptions = MutationConfig<typeof getTotalBalance>;

export const useGetTotalBalance = (config?: UseGetTotalBalanceOptions) => {
  return useQuery({
    queryKey: ['total-balance'],
    queryFn: getTotalBalance,
    ...config,
  });
};
