import { z } from "zod";

export const addAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Nama rekeningnya jangan dikosongin wak")
    .max(32, "Nama rekening lu kepanjangan bjir"),
  balance: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().nonnegative("Saldo mana bisa negatif njir")
  ),
});

export type AddAccountSchema = z.infer<typeof addAccountSchema>;
