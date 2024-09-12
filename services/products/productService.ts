import { ProductImages } from "../../Models/index";
import ProductRepository from "../../Repository/productRepository";

/**
 * This class contains methods to interact with the product data in the database.
 * It only provides methods to get data from the database, not to modify it.
 * The methods are used by the controllers to provide the data to the users.
 */
class ProductService {
    protected productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Gets all products from the database.
     * @returns A list of products
     * @throws An error if there is an unknown error
     */
    async getAllProductsAdmin() {
        try {
            return await this.productRepository.getAllProductsAdmin();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }

    /**
     * Gets a product by its id.
     * @param id The id of the product
     * @returns The product with the given id
     * @throws An error if the product is not found
     * @throws An error if there is an unknown error
     */
    async getProductByIdAdmin(id: number) {
        try {
            const product = await this.productRepository.getProductById(id);

            if (!product) throw new Error("Product not found");

            return product;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }

    /**
     * Gets the images of a product by its id.
     * @param id The id of the product
     * @returns The images of the product with the given id
     * @throws An error if the images are not found
     * @throws An error if there is an unknown error
     */
    async getImagesByProductId(id: number): Promise<ProductImages[]> {
        try {
            const images = await this.productRepository.getProductImagesById(id);
            if (!images) throw new Error("Product images not found");

            return images;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }
}

export default ProductService;