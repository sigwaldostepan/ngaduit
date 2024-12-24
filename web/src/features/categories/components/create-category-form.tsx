import { FloatingLabelInput } from '@/components/elements';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  createCategorySchema,
  CreateCategorySchema,
} from '../schemas/create-category-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCategory } from '../api/create-category';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';

export const CreateCategoryForm = () => {
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync: createCategory, isPending } = useCreateCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const onSubmit = async (values: CreateCategorySchema) => {
    toast.promise(createCategory(values), {
      loading: 'Sedang nambahin kategori ini ke akun kamu',
      success: 'Kategori berhasil ditambahin',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="name"
                  label="Nama kategori baru"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold" disabled={isPending}>
          {!isPending ? 'Buat Kategori' : <Spinner />}
        </Button>
      </form>
    </Form>
  );
};
