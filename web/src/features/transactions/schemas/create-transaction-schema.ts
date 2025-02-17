import { z } from 'zod';

export const createTransactionSchema = z.object({
  accountId: z.string().min(1, 'ID akun nggak boleh kosong'),
  amount: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z
      .number()
      .min(1, 'Nominal transaksi gk boleh kurang dari Rp. 1')
      .nonnegative('Nominal transaksi mana bisa negatif njir')
  ),
  categoryId: z.string().optional().nullable(),
  description: z
    .string()
    .min(1, 'Deskripsiny ga boleh kosong')
    .max(64, 'Deskripsi maksimal 64 karakter, jangan yapping'),
  transactionType: z.enum(['INCOME', 'EXPENSE'], {
    required_error: 'Gk boleh kosong!!',
  }),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
