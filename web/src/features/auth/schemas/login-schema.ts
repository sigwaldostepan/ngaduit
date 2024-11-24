import { z } from "zod";

export const loginInputSchema = z.object({
  email: z
    .string()
    .email({ message: "Email apa ini dawg ☠" })
    .min(1, "Emailnya diisi dong maniezz")
    .max(32, "Max 32 karakter aja brok"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter yah maniezz")
    .max(32, "Password sepanjang ini dawg ☠ ?!"),
});

export type LoginInputSchema = z.infer<typeof loginInputSchema>;
