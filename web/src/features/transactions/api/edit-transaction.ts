import { useMutation } from '@tanstack/react-query';

import { EditTransactionSchema } from '../schemas/edit-transaction-schema';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/lib/api-client';

type EditTransactionParams = {
  id: string;
  payload: EditTransactionSchema;
};

const editTransaction = async ({ id, payload }: EditTransactionParams) => {
  return await api.put(`/transaction/${id}`, payload, {
    withCredentials: true,
  });
};

type UseEditTransactionOptions = MutationConfig<typeof editTransaction>;

export const useEditTransaction = (config: UseEditTransactionOptions) => {
  return useMutation({
    mutationKey: ['edit-transaction'],
    mutationFn: editTransaction,
    ...config,
  });
};
