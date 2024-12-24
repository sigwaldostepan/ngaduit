import { Category } from '@/types/api';
import { CategoryItem } from './category-item';

type CategoryListProps = {
  categories?: Category[];
};

export const CategoryList = ({ categories }: CategoryListProps) => {
  if (!categories?.length) {
    return (
      <p className="font-bold text-xl lg:text-2xl text-center">
        Kategori pengeluaranmu ga ada 🤔
      </p>
    );
  }

  return (
    <>
      {categories?.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </>
  );
};
