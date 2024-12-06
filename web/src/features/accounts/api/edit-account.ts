import { api } from "@/lib/api-client";
import { EditAccountSchema } from "../schemas/edit-account-schema";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { ApiResponse } from "@/types/api";

type EditAccountParams = {
  accountId: string;
  payload: EditAccountSchema;
};

const editAccount = async ({ accountId, payload }: EditAccountParams) => {
  return await api.put<ApiResponse>(`/accounts/${accountId}`, payload, {
    withCredentials: true,
  });
};

type UseEditAccountOptions = MutationConfig<typeof editAccount>;

export const useEditAccount = (config?: UseEditAccountOptions) => {
  return useMutation({
    mutationKey: ["edit-account"],
    mutationFn: editAccount,
    ...config,
  });
};
