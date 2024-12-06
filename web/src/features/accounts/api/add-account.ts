import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { ApiResponse } from "@/types/api";
import { AddAccountSchema } from "../schemas/add-account-schema";

const addAccount = async (payload: AddAccountSchema) => {
  return await api.post<ApiResponse>("/accounts", payload, {
    withCredentials: true,
  });
};

type UseAddAccountOptions = MutationConfig<typeof addAccount>;

export const useAddAccount = (config?: UseAddAccountOptions) => {
  return useMutation({
    mutationKey: ["add-account"],
    mutationFn: addAccount,
    ...config,
  });
};
