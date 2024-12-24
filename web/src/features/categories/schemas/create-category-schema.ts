import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Nama kategori gak boleh kosong")
    .max(32, "Nama kategorinya jangan kepanjangan dong"),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
