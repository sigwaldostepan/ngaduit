import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number().min(1, 'Nominal transaksi g boleh kurang dari 1'),
  description: z
    .string()
    .min(1, 'Deskripsiny ga boleh kosong')
    .max(64, 'Deskripsi maksimal 64 karakter, jangan yapping'),
  accountId: z.string().min(1, 'ID akun nggak boleh kosong'),
  categoryId: z.string().nullable(),
});
export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;

export const editTransactionSchema = z.object({
  amount: z.number().optional(),
  description: z
    .string()
    .max(64, 'Deskripsi maksimal 64 karakter, jangan yapping'),
  accountId: z.string().optional(),
  categoryId: z.string().optional().nullable(),
});
export type EditTransactionSchema = z.infer<typeof editTransactionSchema>;
