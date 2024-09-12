import { Category } from "../Models/index";

class CategoryRepository {
    async getCategoryById(id: number): Promise<Category | null> {
        try {

            const category = await Category.findOne({ where: { id_tipo: id } });
            if (!category) {
                return null;
            }
            return category?.dataValues as Category;
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting category: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting category');
            }
        }
    }

    async getCategories(): Promise<Category[]> {
        try {
            return await Category.findAll();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting categories: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting categories');
            }
        }
    }

    async saveCategory(Detalle: string, status: string): Promise<Category | null> {
        try {
            return await Category.create({ Detalle, status });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while saving category: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while saving category');
            }
        }
    }

    async updateCategory(id: number, Detalle: string, status: string): Promise<number[] | null> {
        try {
            return await Category.update({ Detalle, status }, { where: { id_tipo: id } });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while updating category: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while updating category');
            }
        }
    }

    async deleteCategory(id: number): Promise<number[] | null> {
        try {
            return await Category.update({ status: 'Inactivo' }, { where: { id_tipo: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting category: ${error.message}`)
            } else {
                throw new Error('An unknown error occurred while deleting category');
            }
        }
    }

    async getCategoryNameById(id: number | string): Promise<Category | null> {
        try {
            const category = await Category.findOne({ attributes: ['Detalle'], where: { id_tipo: id } });
            return category?.dataValues as Category;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting category: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting category');
            }
        }
    }
}

export default CategoryRepository;