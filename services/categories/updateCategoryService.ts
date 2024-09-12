/**
 * This class is used to update a category on the database.
 * It uses the CategoryRepository to perform the operation.
 * If the operation is successful, it returns the id of the updated category.
 * If the operation fails, it throws an error.
 *
 * @class CategoryUpdateService
 * @constructor
 * @param {CategoryRepository} categoryRepository the category repository to use
 */

import CategoryRepository from "../../Repository/categoryRepository";

class CategoryUpdateService {
    private categoryRepository: CategoryRepository
    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    /**
     * Updates a category on the database.
     * 
     * @param {number} id The id of the category to be updated.
     * @param {string} Detalle The new category name.
     * @param {string} status The new category status.
     * @returns {Promise<number[] | null>} A promise that resolves with the id of the updated category or null if the operation fails.
     */
    async updateCategory(id: number, Detalle: string, status: string): Promise<number[] | null> {
        try {
            return await this.categoryRepository.updateCategory(id, Detalle, status);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating category: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while updating category');
            }
        }
    }
}

export default CategoryUpdateService;
