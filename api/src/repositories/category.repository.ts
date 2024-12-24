import { db } from '../lib/db';

export class CategoryRepository {
  private readonly selectOptions = {
    include: {
      transactions: true,
    },
  };

  getAllCategories = async (userId: string) => {
    const categories = await db.category.findMany({
      where: { userId },
      ...this.selectOptions,
    });

    return categories;
  };

  getCategoryById = async (categoryId: string, userId: string) => {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
        userId,
      },
      ...this.selectOptions,
    });

    return category;
  };

  getCategoryByName = async (categoryName: string, userId: string) => {
    const categories = await db.category.findMany({
      where: {
        name: { contains: categoryName, mode: 'insensitive' },
        userId,
      },
      ...this.selectOptions
    });

    return categories;
  };

  createCategory = async (name: string, userId: string) => {
    const category = await db.category.create({
      data: {
        name,
        userId,
      },
      ...this.selectOptions,
    });

    return category;
  };

  editCategory = async (categoryId: string, name: string, userId: string) => {
    return await db.category.update({
      where: { id: categoryId, userId },
      data: { name },
      ...this.selectOptions,
    });
  };

  deleteCategory = async (categoryId: string, userId: string) => {
    return await db.category.delete({
      where: { id: categoryId, userId },
    });
  };
}
