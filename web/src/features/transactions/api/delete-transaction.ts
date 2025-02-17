import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

const deleteTransaction = async (transactionId: string) => {
  return await api.delete(`/transaction/${transactionId}`, {
    withCredentials: true,
  });
};

type UseDeleteTransactionOptions = MutationConfig<typeof deleteTransaction>;

export const useDeleteTransaction = (config?: UseDeleteTransactionOptions) => {
  return useMutation({
    mutationKey: ['delete-transaction'],
    mutationFn: deleteTransaction,
    ...config,
  });
};
