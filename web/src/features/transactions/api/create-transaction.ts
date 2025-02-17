import { useMutation } from '@tanstack/react-query';
import { CreateTransactionSchema } from '../schemas/create-transaction-schema';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/lib/api-client';

const createTransaction = async (payload: CreateTransactionSchema) => {
  return await api.post('/transactions', payload, {
    withCredentials: true,
  });
};

type UseCreateTransactionOptions = MutationConfig<typeof createTransaction>;

export const useCreateTransaction = (config: UseCreateTransactionOptions) => {
  return useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: createTransaction,
    ...config,
  });
};
