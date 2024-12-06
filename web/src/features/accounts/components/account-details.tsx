import { Button } from "@/components/ui/button";
import { toRupiah } from "@/utils/toRupiah";
import { FilePenLine, Trash } from "lucide-react";
import { ConfirmationDialog } from "@/components/elements";
import { useDeleteAccount } from "../api/delete-account";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { EditAccountDialog } from "./edit-account-dialog";

type AccountDetailsProps = {
  accountId: string;
  name: string;
  balance: number;
};

export const AccountDetails = ({ accountId, name, balance }: AccountDetailsProps) => {
  const formatedBalance = toRupiah(balance);

  const queryClient = useQueryClient();
  const { mutateAsync: deleteAccount } = useDeleteAccount({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const handleDeleteAccount = async (accountId: string) => {
    toast.promise(() => deleteAccount(accountId), {
      loading: "Sabar, lagi menghapus akun beserta kenangannya",
      success: "Akun rekeningmu berhasil dihapus",
    });
  };

  return (
    <div className="w-full flex items-center justify-between px-2 py-3 border-b last:border-b">
      <div className="flex flex-col">
        <p className="text-xl font-bold lg:text-2xl">{name}</p>
        <p className="text-sm font-light lg:text-base">{formatedBalance}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <EditAccountDialog
          dialogTrigger={
            <Button size="icon" variant="secondary">
              <FilePenLine />
            </Button>
          }
          title="Tambah Akun Rekening"
          description="Masukking akun rekening atau dompet kamu biar bisa ngatur duit kamu"
          accountId={accountId}
          initialBalance={balance}
          initialName={name}
        />
        <ConfirmationDialog
          description="Yakin lu mau hapus akun rekening?"
          dialogTrigger={
            <Button size="icon" variant="outline" className="text-destructive">
              <Trash />
            </Button>
          }
          confirmButton={
            <Button variant="destructive" onClick={() => handleDeleteAccount(accountId)}>
              Yakin
            </Button>
          }
        />
      </div>
    </div>
  );
};
