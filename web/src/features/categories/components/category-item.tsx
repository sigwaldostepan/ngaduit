import { ConfirmationDialog } from '@/components/elements';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/api';
import { FilePenLine, Trash } from 'lucide-react';
import { useDeleteCategory } from '../api/delete-category';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { EditCategoryDialog } from './edit-category-dialog';

type CategoryItemProps = {
  category: Category;
};

export const CategoryItem = ({ category }: CategoryItemProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCategory, isPending } = useDeleteCategory({
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });

  const handleDeleteCategory = (categoryId: string) => {
    toast.promise(deleteCategory(categoryId), {
      loading: 'Sabar y, lagi ngehapusin kategori kamu',
      success: 'Kategori berhasil dihapus',
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-3 border-b">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl lg:text-2xl">{category.name}</p>
          <p className="text-sm">
            Jumlah transaksi dgn kategori ini :{' '}
            {category.transactions.length || 0}{' '}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <EditCategoryDialog
            category={category}
            title="Edit kategori"
            dialogTrigger={
              <Button variant="secondary" size="icon">
                <FilePenLine />
              </Button>
            }
          />
          <ConfirmationDialog
            confirmButton={
              <Button
                variant="destructive"
                onClick={() => handleDeleteCategory(category.id)}
                disabled={isPending}
              >
                Yakin
              </Button>
            }
            description="Yakin mau hapus kategori ini?"
            dialogTrigger={
              <Button variant="outline" size="icon">
                <Trash className="text-red-600" />
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
};
