import ProductService from "./productService";
import ProductRepository from "../../Repository/productRepository";

class ClothingProductService extends ProductService {

    constructor(productRepository: ProductRepository) {
        super(productRepository);
    }

    async getClothesProducts() {
        try {
            return await this.productRepository.getClothesProducts();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting clothes products: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting clothes products`);
            }
        }
    }

    async getClotheById(id: number) {
        try {
            return await this.productRepository.getClotheById(id);
        } catch (error) {
           if (error instanceof Error) {
               throw new Error(`Error while getting clothe by id: ${error.message}`);
           } else {
               throw new Error(`An unknown error occurred while getting clothe by id`);
           }
        }
    }
}

export default ClothingProductService;