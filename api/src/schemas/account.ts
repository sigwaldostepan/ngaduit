import { z } from "zod";

export const addAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Nama rekening jangan dikosongin ya wak")
    .max(32, "Nama rekening lu panjang bener bjir"),
  balance: z.number().default(0).optional(),
});

export type AddAccountSchema = z.infer<typeof addAccountSchema>;

export const topUpSchema = z.object({
  amount: z.number().min(1, "Ga ada nominal top upnya"),
});
export type TopUpSchema = z.infer<typeof topUpSchema>;

export const editAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Nama rekeningnya jangan dikosongin wak")
    .max(32, "Nama rekening lu kepanjangan bjir"),
  balance: z.number().optional(),
});
export type EditAccountSchema = z.infer<typeof editAccountSchema>;
