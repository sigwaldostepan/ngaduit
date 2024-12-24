import express from "express";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "../controllers/category.controller";
import { requireUser } from "../middlewares/requireUser";
import { validateBody } from "../middlewares/validation";
import { createCategorySchema, editCategorySchema } from "../schemas/category";

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

const router = express.Router();

// http://url/categories (GET)
router.get("/", requireUser, categoryController.getCategories);
// http://url/categories (GET)
router.get("/:id", requireUser, categoryController.getCategoryById);
// http://url/categories (POST)
router.post(
  "/",
  requireUser,
  validateBody(createCategorySchema),
  categoryController.createCategory
);
// http://url/categories/category-id (PUT)
router.put("/:id", requireUser, validateBody(editCategorySchema), categoryController.editCategory);
// http://url/categories/category-id (DELETE)
router.delete("/:id", requireUser, categoryController.deleteCategory);

export default router;
