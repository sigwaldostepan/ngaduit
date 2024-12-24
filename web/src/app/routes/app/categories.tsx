import { FloatingLabelInput } from '@/components/elements';
import { Head } from '@/components/seo/head';
import { CategoryItemSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import { useGetCategories } from '@/features/categories/api/get-categories';
import {
  CategoryList,
  CreateCategoryDialog,
} from '@/features/categories/components';
import { useDebounce } from '@/hooks/useDebounce';
import { SquarePlus } from 'lucide-react';
import { useState } from 'react';

export const Categories = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery);
  const { data, isPending } = useGetCategories({
    categoryName: debouncedSearchQuery,
  });

  return (
    <>
      <Head title="Kategori" />
      <section className="w-full">
        <div className="flex flex-col border-b pb-4 gap-4">
          <CreateCategoryDialog
            title="Buat kategori baru"
            description="Bikin kategori transaksi kamu, biar kamu lebih gampang ngatur duitnya"
            dialogTrigger={
              <Button className="w-full font-semibold">
                <SquarePlus />
                Buat kategori baru
              </Button>
            }
          />

          <FloatingLabelInput
            fullWidth
            label="Cari kategori"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col py-2">
          {isPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CategoryItemSkeleton key={index} />
            ))
          ) : (
            <CategoryList categories={data} />
          )}
        </div>
      </section>
    </>
  );
};
