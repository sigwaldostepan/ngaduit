import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

const deleteAccount = async (accountId: string) => {
  return await api.delete<ApiResponse>(`/accounts/${accountId}`, {
    withCredentials: true,
  });
};

type UseDeleteAccountOptions = MutationConfig<typeof deleteAccount>;

export const useDeleteAccount = (config?: UseDeleteAccountOptions) => {
  return useMutation({
    mutationKey: ["delete-account"],
    mutationFn: deleteAccount,
    ...config,
  });
};
