
import ProductRepository from '../../Repository/productRepository';
class ProductDeleterService {
    protected productRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async deleteProduct(id: number): Promise<boolean> {
        try {
            const result = await this.productRepository.deleteProduct(id);
            if (!result) {
                throw new Error('Error deleting product');
            }
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error deleting product: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while deleting product');
            }
        }
    }
}
export default ProductDeleterService;