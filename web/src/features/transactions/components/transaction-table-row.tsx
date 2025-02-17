import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formatDate';
import { toRupiah } from '@/utils/toRupiah';
import { EditTransactionDialog } from './edit-transaction-dialog';
import { Button } from '@/components/ui/button';
import { FilePenLine, Trash } from 'lucide-react';
import { ConfirmationDialog } from '@/components/elements';
import { Transaction } from '@/types/api';
import { useDeleteTransaction } from '../api/delete-transaction';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type TransactionTableRowProps = {
  transaction: Transaction;
};

export const TransactionTableRow = ({
  transaction,
}: TransactionTableRowProps) => {
  const formattedDate = formatDate(transaction.date);
  const formattedAmount = toRupiah(transaction.amount);

  const queryClient = useQueryClient();
  const { mutateAsync: deleteTransactions, isPending } = useDeleteTransaction({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleDeleteTransaction = async (id: string) => {
    toast.promise(deleteTransactions(id), {
      loading: 'Bntr y, lagi ngapusin',
      success: 'Transaksi berhasil dihapus',
    });
  };

  return (
    <TableRow>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{transaction.account.name}</TableCell>
      <TableCell>{transaction.category?.name ?? '-'}</TableCell>
      <TableCell>{transaction.transactionType}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{formattedAmount}</TableCell>
      <TableCell className="flex items-center justify-start gap-4">
        <EditTransactionDialog
          dialogTrigger={
            <Button size="icon" variant="secondary">
              <FilePenLine />
            </Button>
          }
          title="Edit Transaksi"
          transaction={transaction}
        />
        <ConfirmationDialog
          confirmButton={
            <Button
              variant="destructive"
              onClick={() => handleDeleteTransaction(transaction.id)}
              disabled={isPending}
            >
              Yakin bgt
            </Button>
          }
          dialogTrigger={
            <Button size="icon" variant="outline">
              <Trash className="text-destructive" />
            </Button>
          }
          description="Yakin mau hapus transaksi ini?? Jumlah uang di akun rekening juga akan terupdate loo"
        />
      </TableCell>
    </TableRow>
  );
};
