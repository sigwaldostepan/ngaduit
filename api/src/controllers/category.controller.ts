import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { sendErrorResponse, sendOkResponse } from '../utils/responses';

export class CategoryController {
  constructor(private categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  getCategories = async (req: Request, res: Response) => {
    try {
      if (req.query.categoryName) {
        return this.getCategoryByName(req, res);
      }

      const userId = req.user?.id as string;

      const categories = await this.categoryService.getCategories(userId);

      sendOkResponse({
        res,
        payload: {
          data: categories,
        },
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  getCategoryByName = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const categoryName = req.query.categoryName as string;

      const categories = await this.categoryService.getCategoryByName(
        categoryName,
        userId
      );

      sendOkResponse({
        res,
        payload: {
          data: categories,
        },
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  getCategoryById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const categoryId = req.params.id;

      const category = await this.categoryService.getCategoryById(
        categoryId,
        userId
      );

      sendOkResponse({
        res,
        payload: {
          data: category,
        },
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const payload = req.body;

      const category = await this.categoryService.createCategory(
        payload,
        userId
      );

      sendOkResponse({
        res,
        payload: { message: 'Category berhasil dibuat coy', data: category },
        status: 201,
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  editCategory = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const categoryId = req.params.id as string;
      const payload = req.body;

      await this.categoryService.editCategory(payload, categoryId, userId);

      sendOkResponse({ res, payload: { message: 'Kategori berhasil diedit' } });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const categoryId = req.params.id as string;

      await this.categoryService.deleteCategory(categoryId, userId);

      sendOkResponse({
        res,
        payload: { message: 'Kategori berhasil dihapus' },
      });
    } catch (error) {
      sendErrorResponse({ res, error });
    }
  };
}
