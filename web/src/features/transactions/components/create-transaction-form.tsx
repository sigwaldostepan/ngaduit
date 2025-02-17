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
import {
  createTransactionSchema,
  CreateTransactionSchema,
} from '../schemas/create-transaction-schema';
import { FloatingLabelInput } from '@/components/elements';
import { Category } from '@/types/api';
import { useGetCategories } from '@/features/categories/api/get-categories';
import { Button } from '@/components/ui/button';
import { useGetAccounts } from '@/features/accounts/api/get-accounts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCreateTransaction } from '../api/create-transaction';

export const CreateTransactionForm = () => {
  const { data: categories } = useGetCategories({});
  const { data: accounts } = useGetAccounts({});
  const form = useForm<CreateTransactionSchema>({
    defaultValues: {
      accountId: '',
      amount: 0,
      categoryId: null,
      description: '',
    },
    resolver: zodResolver(createTransactionSchema),
  });

  const queryClient = useQueryClient();
  const { mutateAsync: createTransaction, isPending } = useCreateTransaction({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const onSubmit = (values: CreateTransactionSchema) => {
    toast.promise(createTransaction(values), {
      loading: 'Bntr y, lgi proses',
      success: 'Transaksi berhasil dibuat.',
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value!}
                value={field.value!}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori transaksi" />
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
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih sumber akun" />
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
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
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
                  <SelectItem value="INCOME">Pemasukkan</SelectItem>
                  <SelectItem value="EXPENSE">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 w-full" disabled={isPending}>
          Buat transaksiii
        </Button>
      </form>
    </Form>
  );
};
