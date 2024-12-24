import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategorySchema, EditCategorySchema } from '../schemas/category';
import { ErrorResponse } from '../utils/responses';

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  getCategories = async (userId: string) => {
    const category = await this.categoryRepository.getAllCategories(userId);

    return category;
  };

  getCategoryById = async (categoryId: string, userId: string) => {
    const category = await this.categoryRepository.getCategoryById(
      categoryId,
      userId
    );

    if (!category) {
      throw new ErrorResponse('ID kategori gk ketemu', 404);
    }

    return category;
  };

  getCategoryByName = async (categoryName: string, userId: string) => {
    const categories = await this.categoryRepository.getCategoryByName(
      categoryName,
      userId
    );

    return categories;
  };

  createCategory = async (payload: CreateCategorySchema, userId: string) => {
    const category = await this.categoryRepository.createCategory(
      payload.name,
      userId
    );

    return category;
  };

  editCategory = async (
    payload: EditCategorySchema,
    categoryId: string,
    userId: string
  ) => {
    const category = await this.getCategoryById(categoryId, userId);

    return await this.categoryRepository.editCategory(
      category.id,
      payload.name,
      userId
    );
  };

  deleteCategory = async (categoryId: string, userId: string) => {
    const category = await this.getCategoryById(categoryId, userId);

    return await this.categoryRepository.deleteCategory(category.id, userId);
  };
}
