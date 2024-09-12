import ProductService from "./productService";
import ProductRepository from "../../Repository/productRepository";

class PublicProductService extends ProductService {
    constructor(productRepository: ProductRepository) {
        super(productRepository);
    }

    async getPublicProducts() {
        try {
            return await this.productRepository.getPublicProducts();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting public products: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting public products`);
            }
        }
    }

    async getPublicProduct(id: number) {
        try {
            return await this.productRepository.getPublicProductById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting public product: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting public product`);
            }
        }
    }
}

export default PublicProductService;
