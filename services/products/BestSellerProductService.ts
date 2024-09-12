import ProductService from "./productService";
import ProductRepository from "../../Repository/productRepository";
class BestSellerProductService extends ProductService {
    constructor(productRepository: ProductRepository) {
        super(productRepository);
    }
    async getBestSellers() {
        try {
            return await this.productRepository.getBestSellers();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting best sellers: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting best sellers`);
            }
        }
    }
}
export default BestSellerProductService;