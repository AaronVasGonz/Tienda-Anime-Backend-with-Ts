/**
 * This class contains methods for retrieving categories from the database.
 *
 * @class
 */
import { CategoryAttributes } from "types/categories";
import CategoryRepository from "../../Repository/categoryRepository";
import { Category } from "../../Models/index";
class CategoriesService {
    private categoryRepository: CategoryRepository
    /**
     * Constructor for the CategoriesService class.
     *
     * @param {CategoryRepository} categoryRepository An instance of the CategoryRepository class.
     */
    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    /**
     * Retrieves all categories from the database.
     *
     * @returns {Promise<Category[] | null>} A promise that resolves with an array of categories or null if the operation fails.
     */
    async getCategories(): Promise<Category[] | null> {
        try {
            return await this.categoryRepository.getCategories()
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting categories: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting categories');
            }
        }
    }

    /**
     * Retrieves a category by its id from the database.
     *
     * @param {number} id The id of the category to be retrieved.
     * @returns {Promise<Category | null>} A promise that resolves with the category or null if the operation fails.
     */
    async getCategoryById(id: number): Promise<Category | null> {
        try {
            return await this.categoryRepository.getCategoryById(id)
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting category: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting category');
            }
        }
    }

    /**
     * Retrieves the name of a category by its id from the database.
     *
     * @param {number} id The id of the category to be retrieved.
     * @returns {Promise<Category | null>} A promise that resolves with the category or null if the operation fails.
     */
    async getCategoryNameById(categoryId: number | string): Promise<CategoryAttributes | null> {
        const category = await this.categoryRepository.getCategoryNameById(categoryId);
        if (category) {
            //Mapping the result of the Sequelize model to CategoryAttributes
            return {
                id_tipo: category.id_tipo,
                Detalle: category.Detalle,
                status: category.status
            };
        }
        return null;
    }
}

export default CategoriesService;
