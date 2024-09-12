import ProductService from "./productService";
import ProductRepository from "../../Repository/productRepository";
class CollectionProductService extends ProductService {

    constructor(productRepository: ProductRepository) {
        super(productRepository);
    }

    getProductsByCollection(id_collection: number) {
        try {
            return this.productRepository.getProductsByCollection(id_collection);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting products by collection: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting products by collection`);
            }
        }
    }
}

export default CollectionProductService;