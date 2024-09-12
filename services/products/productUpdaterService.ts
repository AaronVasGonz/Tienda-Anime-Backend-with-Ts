
import ProductRepository from '../../Repository/productRepository';
import StorageService from '../../services/storageService';
import ImageManager from '../../services/imageManager';

export interface FormData {
    Nombre_Producto: string;
    Descripcion: string;
    Precio: string|number;
    Cantidad: string | number;
    category: string | number;
    provider: string | number;
    collection: string | number;
    status: string;
    gender: string;
    sizes: string[];
}
/**
 * Class that handles the update of products in the database.
 * It also handles the update of the images of the product in the Firebase Storage.
 * The class has two methods, one for updating a general product and the other
 * for a clothing product.
 *
 * @class ProductUpdater
 * @param productRepository - The repository for the products.
 * @param storageService - The service for the Firebase Storage.
 * @param imageManager - The service for managing the images.
 */
class ProductUpdater {
    protected productRepository: ProductRepository;
    protected storageService: StorageService;
    protected imageManager: ImageManager;
    constructor(productRepository: ProductRepository, storageService: StorageService, imageManager: ImageManager) {
        this.productRepository = productRepository;
        this.imageManager = imageManager;
        this.storageService = storageService;
    }


    /**
     * Updates a product in the database and the images in the Firebase Storage.
     * @param id - The id of the product.
     * @param formData - The form data with the information of the product.
     * @param textImages - The text of the images.
     * @param imagesUrls - The URLs of the images.
     * @returns A promise with the result of the operation.
     */
    async updateProduct(id: number, formData: FormData, textImages: string[], imagesUrls: string[]) {

        const images = this.imageManager.manageImages(textImages, imagesUrls);    
        try {
        
            await this.updateProductData(id, formData, images, imagesUrls);
            return { success: true, message: 'Has been updated successfully' };

        } catch (error: unknown) {
            // Eliminar archivos usando las URLs proporcionadas
            this.storageService.deleteFilesFromFirebase(imagesUrls, "products");

            if (error instanceof Error) {
                throw new Error(`Update failed: ${error.message}`);
            } else {
                throw new Error(`Update failed: ${String(error)}`);
            }
        }
    }

    /**
     * Updates a product in the database and the images in the Firebase Storage.
     * @param id - The id of the product.
     * @param formData - The form data with the information of the product.
     * @param images - The text of the images.
     * @param imagesUrl - The URLs of the images.
     * @returns A promise with the result of the operation.
     */
    async updateProductData(id: number, formData: FormData, images: string, imagesUrl: string[]) {
       
        const { category } = formData;
        if (category === '1') {
            await this.updateClothingProduct(id, formData, images, imagesUrl);
        } else {
            await this.updateGeneralProduct(id, formData, images, imagesUrl);
        }
    }

    /**
     * Updates a general product in the database and the images in the Firebase Storage.
     * @param id - The id of the product.
     * @param formData - The form data with the information of the product.
     * @param images - The text of the images.
     * @param imagesUrl - The URLs of the images.
     * @returns A promise with the result of the operation.
     */
    async updateGeneralProduct(id: number, formData: FormData, images: string, imagesUrl: string[]) {
        const { Nombre_Producto, Descripcion, Precio, Cantidad, category, provider, collection, status } = formData;
        
          
            try {
            const result = await this.productRepository.updateProduct(id, Nombre_Producto, Descripcion, Precio, Cantidad, category, provider, collection, images, status, imagesUrl);

            if (!result) {
                throw new Error('Error trying to update product');
            }
        } catch (error: unknown) {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products")
            if (error instanceof Error) {
                throw new Error(`Update failed: ${error.message}`);
            } else {
                throw new Error(`Update failed: ${String(error)}`);

            }
        }
    }

    /**
     * Updates a clothing product in the database and the images in the Firebase Storage.
     * @param id - The id of the product.
     * @param formData - The form data with the information of the product.
     * @param images - The text of the images.
     * @param imagesUrl - The URLs of the images.
     * @returns A promise with the result of the operation.
     */
    async updateClothingProduct(id: number, formData: FormData, images: string, imagesUrl: string[]) {
        const { Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizes, status } = formData;
        try {
            const sizesStr = Array.isArray(sizes) ? sizes.join(',') : sizes;
            const result = await this.productRepository.updateClothingProduct(id, Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizesStr, status, images, imagesUrl);

            if (!result) {
                throw new Error('Error trying to update clothing product');
            }
        } catch (error: unknown) {
            this.storageService.deleteFilesFromFirebase(imagesUrl, "products")

            if (error instanceof Error) {
                throw new Error(`Update failed: ${error.message}`);
            } else {
                throw new Error(`Error trying to update clothing product`);
            }
        }
    }
}
export default ProductUpdater;