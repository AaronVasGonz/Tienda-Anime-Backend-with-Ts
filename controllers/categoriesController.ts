
import { CategoryService, CategorySaveService, CategoryUpdateService, CategoryDeleteService } from "../services/index";
import express from "express";
class CategoryController {
    protected categoryService: CategoryService;
    protected categorySaveService: CategorySaveService;
    protected categoryUpdateService: CategoryUpdateService;
    protected categoryDeleteService: CategoryDeleteService;
    constructor
        (
            categoryService: CategoryService,
            categorySaveService: CategorySaveService,
            categoryUpdateService: CategoryUpdateService,
            categoryDeleteService: CategoryDeleteService
        ) {
        this.categoryService = categoryService;
        this.categorySaveService = categorySaveService;
        this.categoryUpdateService = categoryUpdateService;
        this.categoryDeleteService = categoryDeleteService;
    }

    getCategories = async (req: express.Request, res: express.Response) => {
        try {
            const categories = await this.categoryService.getCategories();
            if (!categories) {
                return res.status(404).json({ error: 'No categories found' });
            }
            res.json({ categories: categories });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    getCategory = async (req: express.Request, res: express.Response) => {
        const idParam = req.params.id;
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        try {
            const result = await this.categoryService.getCategoryById(id);
            if (!result) {
                res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ category: result });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    saveCategory = async (req: express.Request, res: express.Response) => {
        const { Detalle, status } = req.body;
        try {
            const result = await this.categorySaveService.saveCategory(Detalle, status);
            if (!result) {
                return res.status(500).json({ error: 'Error while saving category' });
            }
            res.status(200).json({ message: 'Category saved successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    updateCategory = async (req: express.Request, res: express.Response) => {
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        const { Detalle, status } = req.body;

        try {
            const result = await this.categoryUpdateService.updateCategory(id, Detalle, status);
            if (!result) {
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
            res.status(200).json({ message: 'Categoría actualizada correctamente' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    deleteCategory = async (req: express.Request, res: express.Response) => {
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        try {
            const result = await this.categoryDeleteService.deleteCategory(id);
            if (!result) {
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
            res.status(200).json({ message: 'Categoría eliminada correctamente' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }
}
export default CategoryController;