import { FloatingLabelInput } from '@/components/elements';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Category } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  editCategoryFormSchema,
  EditCategoryFormSchema,
} from '../schemas/edit-category-schema';
import { useEditCategory } from '../api/edit-category';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

type EditCategoryFormProps = {
  category: Category;
};

export const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: editCategory, isPending } = useEditCategory({
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
  const form = useForm<EditCategoryFormSchema>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      name: category.name || '',
    },
  });

  const onSubmit = (payload: EditCategoryFormSchema) => {
    toast.promise(editCategory({ categoryId: category.id, payload }), {
      loading: 'Sabar y, lg ngeditin kategori lu',
      success: 'Kategori lu berhasil diedit',
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="name"
                  label="Nama kategori yg baru"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner /> : 'Edit Kategori'}
        </Button>
      </form>
    </Form>
  );
};
