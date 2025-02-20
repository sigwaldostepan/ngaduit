import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { RecentTransaction } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getRecentTransactions = async () => {
  const response = await api.get<RecentTransaction>(`/transactions/recent`);

  return response.data;
};

type UseGetRecentTransactionsOptions = MutationConfig<
  typeof getRecentTransactions
>;

export const useGetRecentTransactions = (
  config?: UseGetRecentTransactionsOptions
) => {
  return useQuery({
    queryKey: ['recent-transactions'],
    queryFn: getRecentTransactions,
    ...config,
  });
};
