
import ProductRepository from '../../Repository/productRepository';
import StorageService from '../../services/storageService';
import CategoryService from '../../services/categories/categoriesService';
import { FormData } from './productUpdaterService';
import { CategoryAttributes } from 'types/categories';

/**
 * Service for adding products to the database and the images to the Firebase Storage.
 * It uses the ProductRepository and StorageService to perform the operations.
 * The service has two methods, one for adding a general product and the other
 * for a clothing product.
 *
 * @class ProductAdderService
 * @param productRepository - The repository for the products.
 * @param storageService - The service for the Firebase Storage.
 * @param categoryService - The service for the categories.
 */
class ProductAdderService {
    protected productRepository: ProductRepository;
    protected storageService: StorageService;
    protected categoryService: CategoryService;
    constructor(productRepository: ProductRepository, storageService: StorageService, categoryService: CategoryService) {
        this.productRepository = productRepository;
        this.storageService = storageService;
        this.categoryService = categoryService;
    }

    async addProduct(formData: FormData, images: string, imagesUrl: string[]) {
        try {
            await this.addProductData(formData, images, imagesUrl);
            return { success: true, message: 'Product has been added successfully' };
        } catch (error) {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products");
            if (error instanceof Error) {
                return { success: false, message: error.message };
            } else {
                return { success: false, message: String(error) };
            }
        }
    }
    async addProductData(formData: FormData, images: string, imagesUrl: string[]) {

        const { category } = formData;
        if (category === '1') {
            await this.addClothingProduct(formData, images, imagesUrl);
        } else {
            await this.addGeneralProduct(formData, images, imagesUrl);
        }
    }

    async addGeneralProduct(formData: FormData, images: string, imagesUrl: string[]) {
        const { Nombre_Producto, Descripcion, Precio, Cantidad, category, provider, collection, status } = formData;

        // Obtener la categoría de la base de datos
        const categoryDb: CategoryAttributes | null = await this.categoryService.getCategoryNameById(category);

        // Verificar si la categoría se encontró
        if (!categoryDb) {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products");
            throw new Error('Category not found');
        }

        // Acceder al nombre de la categoría directamente
        const categoryName: string = categoryDb.Detalle;

        // Verificar si la categoría no soporta productos generales
        if (categoryName === "Ropas") {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products");
            throw new Error(`Category ${categoryName} does not support general products`);
        }
        
        const result = await this.productRepository.saveProduct(Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, images, imagesUrl, status);
        if (!result) {
            throw new Error('Error adding product');
        }
    }

    async addClothingProduct(formData:FormData, images: string, imagesUrl: string[]) {
        const { Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, status, sizes } = formData;
        
        const sizesList = sizes.join(',');

        const result = await this.productRepository.saveClothingProduct(Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizesList, status, images, imagesUrl);
        if (!result) {
            throw new Error('Error adding clothing product');
        }
    }
}


export default ProductAdderService;
