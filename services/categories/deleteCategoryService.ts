/**
 * This class is used to delete a category from the database.
 * It uses the CategoryRepository to perform the operation.
 * If the operation is successful, it returns the id of the deleted category.
 * If the operation fails, it throws an error.
 *
 * @class CategoryDeleteService
 * @constructor
 * @param {CategoryRepository} categoryRepository the category repository to use
 */
import CategoryRepository from "../../Repository/categoryRepository";

class CategoryDeleteService {
    private categoryRepository: CategoryRepository;
    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    /**
     * Deletes a category from the database.
     * 
     * @param {number} id The id of the category to be deleted.
     * @returns {Promise<number[] | null>} A promise that resolves with the id of the deleted category or null if the operation fails.
     */
    async deleteCategory(id: number): Promise<number[] | null> {
        try {
            return await this.categoryRepository.deleteCategory(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting category: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while deleting category.');
            }
        }
    }
}
export default CategoryDeleteService;
