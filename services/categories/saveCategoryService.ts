/**
 * This class is used to save a new category on the database.
 * It uses the CategoryRepository to perform the operation.
 * If the operation is successful, it returns the saved category.
 * If the operation fails, it throws an error.
 *
 * @class CategorySaveService
 * @constructor
 * @param {CategoryRepository} categoryRepository the category repository to use
 */

import CategoryRepository from "../../Repository/categoryRepository";
import { Category } from "../../Models/index";
class CategorySaveService {
    private categoryRepository:CategoryRepository
    constructor(categoryRepository:CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    /**
     * Saves a new category on the database.
     * @param {string} Detalle the category name
     * @param {string} status the category status
     * @return {Promise<Category>} the saved category or null if the operation fails
     */
    async saveCategory(Detalle: string, status: string): Promise<Category | null> {
        try {
            return await this.categoryRepository.saveCategory(Detalle, status);
        } catch (error) {
           if (error instanceof Error) {
               throw new Error(`Error while saving category: ${error.message}`);
           } else {
               throw new Error('An unknown error occurred while saving category');
           }
        }
    }
}
export default CategorySaveService;
