import { z } from 'zod';

export const editCategoryFormSchema = z.object({
  name: z.string().min(3, 'Nama kategori minimal 3 karakter wak'),
});

export type EditCategoryFormSchema = z.infer<typeof editCategoryFormSchema>;
