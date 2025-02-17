import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { FloatingLabelInput } from '@/components/elements';
import { Category, Transaction } from '@/types/api';
import { useGetCategories } from '@/features/categories/api/get-categories';
import { Button } from '@/components/ui/button';
import { useGetAccounts } from '@/features/accounts/api/get-accounts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  editTransactionSchema,
  EditTransactionSchema,
} from '../schemas/edit-transaction-schema';
import { useEditTransaction } from '../api/edit-transaction';

type EditTransactionFormProps = {
  transaction: Transaction;
};

export const EditTransactionForm = ({
  transaction,
}: EditTransactionFormProps) => {
  const { data: categories } = useGetCategories({});
  const { data: accounts } = useGetAccounts({});
  const form = useForm<EditTransactionSchema>({
    defaultValues: {
      accountId: transaction.accountId,
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      description: transaction.description,
      transactionType: transaction.transactionType,
    },
    resolver: zodResolver(editTransactionSchema),
  });

  const queryClient = useQueryClient();
  const { mutateAsync: editTransaction, isPending } = useEditTransaction({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const onSubmit = (values: EditTransactionSchema) => {
    toast.promise(editTransaction({ id: transaction.id, payload: values }), {
      loading: 'Bntr y, lgi proses',
      success: 'Transaksi berhasil diedit.',
    });
    console.log(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="amount"
                  label="Nominal transaksi"
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value.toString()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  id="description"
                  label="Deskripsi"
                  labelCentered={false}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori Transaksi (opsional kok)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value!}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Pilih kategori transaksi"
                      defaultValue=""
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!categories?.length ? (
                    <SelectValue
                      className="px-4 py-2"
                      placeholder="Kamu blm bikin kategori transaksi"
                    />
                  ) : (
                    categories?.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sumber Akun</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={transaction.account.name}
                      defaultValue={transaction.accountId}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!accounts?.length ? (
                    <SelectValue
                      className="px-4 py-2"
                      placeholder="Kamu blm bikin akun rekening deh"
                    />
                  ) : (
                    accounts?.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Transaksi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis transaksi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="INCOME">Pemasukkan (INCOME)</SelectItem>
                  <SelectItem value="EXPENSE">Pengeluaran (EXPENSE)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={!form.formState.isDirty || isPending}
        >
          Buat transaksiii
        </Button>
      </form>
    </Form>
  );
};
