import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Account } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

type GetAccountsParams = {
  sortBy?: string;
  order?: string;
  searchQuery?: string;
};

const getAccounts = async ({ sortBy, order, searchQuery }: GetAccountsParams) => {
  const params = {
    sortBy,
    order,
    search: searchQuery,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "" && value !== null)
  );

  const accounts = await api.get<Account[]>("/accounts", {
    withCredentials: true,
    params: filteredParams,
  });

  return accounts.data;
};

type UseGetAccountsOptions = GetAccountsParams & {
  config?: MutationConfig<typeof getAccounts>;
};

export const useGetAccounts = ({ sortBy, order, searchQuery, config }: UseGetAccountsOptions) => {
  return useQuery({
    queryKey: ["accounts", { sortBy, order, searchQuery }],
    queryFn: () => getAccounts({ sortBy, order, searchQuery }),
    ...config,
  });
};
