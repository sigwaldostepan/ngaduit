import { FloatingLabelInput } from '@/components/elements';
import { Head } from '@/components/seo/head';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetTransactions } from '@/features/transactions/api/get-transactions';
import {
  CreateTransactionDialog,
  TransactionTableRow,
} from '@/features/transactions/components';
import { useDebounce } from '@/hooks/useDebounce';
import { SquarePlus } from 'lucide-react';
import { useState } from 'react';

export const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery);
  const { data: transactions } = useGetTransactions({
    descriptionQuery: debouncedSearchQuery,
  });

  return (
    <>
      <Head title="Transaksi" />

      <section className="w-full">
        <div className="flex flex-col border-b gap-4 pb-4">
          <CreateTransactionDialog
            dialogTrigger={
              <Button>
                <SquarePlus />
                Buat transaksi
              </Button>
            }
            title="Buat Transaksi"
          />
          <FloatingLabelInput
            fullWidth
            placeholder="Cari transaksi"
            id="search-transaction"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Akun Rekening</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jenis Transaksi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nominal Transaksi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => {
              return (
                <TransactionTableRow
                  transaction={transaction}
                  key={transaction.id}
                />
              );
            })}
          </TableBody>
        </Table>
      </section>
    </>
  );
};
