import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Transaction } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getTransactions = async (descriptionQuery?: string) => {
  let transactions;

  if (descriptionQuery) {
    transactions = await api.get<Transaction[]>(
      `/transactions?desc=${descriptionQuery}`
    );
  } else {
    transactions = await api.get<Transaction[]>('/transactions');
  }

  return transactions.data;
};

type UseGetTransactionOptions = {
  config?: MutationConfig<typeof getTransactions>;
  descriptionQuery?: string;
};

export const useGetTransactions = ({
  config,
  descriptionQuery,
}: UseGetTransactionOptions) => {
  return useQuery({
    queryKey: ['transactions', descriptionQuery],
    queryFn: () => getTransactions(descriptionQuery),
    ...config,
  });
};
