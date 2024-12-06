import { FloatingLabelInput, SortList, SortSelect } from "@/components/elements";
import { Head } from "@/components/seo/head";
import { AccountDetailsSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/get-accounts";
import { AccountDetailsList, AddAccountDialog } from "@/features/accounts/components";
import { useDebounce } from "@/hooks/useDebounce";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const sortList = [
  { label: "Nama", sortBy: "name", order: "asc" },
  { label: "Saldo terbanyak", sortBy: "balance", order: "desc" },
  { label: "Saldo terdikit", sortBy: "balance", order: "asc" },
] satisfies SortList[];

export const Accounts = () => {
  const [params, _] = useSearchParams();
  const sortBy = params.get("sortBy") || "";
  const order = params.get("order") || "";

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const { data: accounts, isPending } = useGetAccounts({
    sortBy,
    order,
    searchQuery: debouncedSearchQuery,
  });

  return (
    <>
      <Head title="Akun Rekening" />

      <section className="w-full">
        <div className="flex flex-col gap-4">
          <AddAccountDialog
            title="Tambah akun rekening"
            description="Tambah rekeningmu biar kamu lebih gampang ngatur duit kamu"
            dialogTrigger={
              <Button className="w-full font-semibold text-base">
                <SquarePlus />
                Tambah rekening baru
              </Button>
            }
          />

          <div className="w-full flex items-center justify-center pb-4 gap-2 border-b">
            <FloatingLabelInput
              fullWidth
              label="Cari akun rekeningmu"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SortSelect sortList={sortList} />
          </div>

          {isPending ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <AccountDetailsSkeleton key={index} />
              ))}
            </>
          ) : (
            <AccountDetailsList accounts={accounts} />
          )}
        </div>
      </section>
    </>
  );
};
