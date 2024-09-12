import {
    ProductService, ProductUpdater,
    ClothingProductService, SizesService,
    CollectionProductService, BestSellerProductService,
    ValorationService, PublicProductService,
    StorageService, ProductRepository,
    ImageManager, ProductAdderService,
    ProductDeleterService
} from "../services/index";

import { RequestWithUrl } from "./collectionController";
import { Request, Response } from "express";
interface ValorationResult {
    Valoration: number
}
interface Size {
    Tallas: string;
}

class ProductController {
    protected productService: ProductService;
    protected productUpdaterService: ProductUpdater;
    protected clothingProductService: ClothingProductService;
    protected sizesService: SizesService;
    protected collectionProductService: CollectionProductService;
    protected bestSellerProductService: BestSellerProductService;
    protected valorationService: ValorationService;
    protected publicProductService: PublicProductService;
    protected storageService: StorageService;
    protected productRepository: ProductRepository;
    protected imageManager: ImageManager;
    protected productAdderService: ProductAdderService;
    protected productDeleterService: ProductDeleterService;


    constructor(
        productService: ProductService,
        productUpdaterService: ProductUpdater,
        clothingProductService: ClothingProductService,
        sizesService: SizesService,
        collectionProductService: CollectionProductService,
        bestSellerProductService: BestSellerProductService,
        valorationService: ValorationService,
        publicProductService: PublicProductService,
        storageService: StorageService,
        productRepository: ProductRepository,
        imageManager: ImageManager,
        productAdderService: ProductAdderService,
        productDeleterService: ProductDeleterService
    ) {
        this.productService = productService;
        this.productUpdaterService = productUpdaterService;
        this.clothingProductService = clothingProductService;
        this.sizesService = sizesService;
        this.collectionProductService = collectionProductService;
        this.bestSellerProductService = bestSellerProductService;
        this.valorationService = valorationService;
        this.publicProductService = publicProductService;
        this.storageService = storageService;
        this.productRepository = productRepository;
        this.imageManager = imageManager;
        this.productAdderService = productAdderService;
        this.productDeleterService = productDeleterService;
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            const result = await this.productService.getAllProductsAdmin();
            return res.status(200).json({ products: result });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    };

    getProduct = async (req: Request, res: Response) => {
        const idParam = req.params.id;
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        try {
            const product = await this.productService.getProductByIdAdmin(id);
            if (!product) return res.status(404).json({ error: 'Product does not exist' });

            const images = await this.productService.getImagesByProductId(id);
            if (!images || images.length === 0) return res.status(404).json({ error: 'Product does not have images' });

            const result = { product, images };
            return res.status(200).json({ product: result });

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            } else {
                console.error(error);
                return res.status(500).json({ error: 'Server error' });
            }
        }
    }

    addProduct = async (req: RequestWithUrl, res: Response) => {

        const formData = JSON.parse(req.body.data);
        const images = (req.fileUrls?.join(',') || '') as string;
        const imagesUrl = req.fileUrls ?? [];
        formData.sizes = req.body.selectedSizes;
       
        try {
            
            const result = await this.productAdderService.addProduct(formData, images, imagesUrl);
            if (!result) return res.status(500).json({ error: 'Insert error' });

            return res.status(200).json({ message: 'Product was added successfully' });

        } catch (error: unknown) {

            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    };

    updateProduct = async (req: RequestWithUrl, res: Response) => {
        const idParam = req.params.id;
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const formData = JSON.parse(req.body.data);
        const textImages = req.body.textImages;
        const imagesUrl = req.fileUrls ?? [];
        formData.sizes = req.body.selectedSizes;

        try {

            const result = await this.productUpdaterService.updateProduct(id, formData, textImages, imagesUrl);
            if (!result) return res.status(500).json({ error: 'Update error' });

            res.status(200).json({ message: 'Product was updated successfully' });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        const idParam = req.params.id;
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        try {
            const result = await this.productDeleterService.deleteProduct(id);
            if (!result) return res.status(500).json({ error: 'Delete error' });

            res.status(200).json({ message: 'Product was deleted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    getClothes = async (req: Request, res: Response) => {
        try {
            const result = await this.clothingProductService.getClothesProducts();
            if (!result) {
                res.status(404).json({ error: 'Products not found' });
            }

            res.status(200).json({ clothes: result });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    getClothe = async (req: Request, res: Response) => {
        const idParam = req.params.id;
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        try {
            const result = await this.clothingProductService.getClotheById(id);
            if (!result) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.status(200).json({ product: result });

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    getSizes = async (req: Request, res: Response) => {
        try {
            const result = await this.sizesService.getSizes();
            if (!result) return res.status(404).json({ error: 'Sizes not found' });

            return res.status(200).json({ sizes: result });

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    getPublicProducts = async (req: Request, res: Response) => {
        try {
            const result = await this.publicProductService.getPublicProducts();

            if (result.length === 0) {
                return res.status(404).json({ error: 'Products not found' });
            }

            const valorationsPromises = result.map(product =>
                this.valorationService.getValorationByProduct(product.Id)
            );

            const valorationsResults: (ValorationResult[] | object[])[] = await Promise.all(valorationsPromises);

            result.forEach((product, index) => {
                const valorationResult = valorationsResults[index];
                if (Array.isArray(valorationResult) && valorationResult.every((item) => 'Valoration' in item)) {
                    product.valoracion = valorationResult.length > 0 ? (valorationResult[0] as ValorationResult).Valoration : 0;
                } else {
                    console.error('Invalid valoration result:', valorationResult);
                    product.valoracion = 0;
                }
                const imageUrls = product.images.map(image => image.imagen);
                product.imageUrls = imageUrls;
            });
            return res.status(200).json({ products: result });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    getPublicProduct = async (req: Request, res: Response) => {
        const idParam = req.params.id;
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        try {
            const result = await this.publicProductService.getPublicProduct(id);
            if (!result) {
                return res.status(404).json({ error: 'No se encontraron productos' });
            }

            const valorationsPromises = result.map(product =>
                this.valorationService.getValorationByProduct(product.Id)
            );
            const valorationsResults = await Promise.all(valorationsPromises);

            for (const [index, product] of result.entries()) {
                const valorationResult = valorationsResults[index];

                // Asignación de valoración
                if (Array.isArray(valorationResult) && valorationResult.every((item) => 'Valoration' in item)) {
                    product.valoracion = valorationResult.length > 0 ? (valorationResult[0] as ValorationResult).Valoration : 0;
                } else {
                    console.error('Invalid valoration result:', valorationResult);
                    product.valoracion = 0;
                }

                // Asignación de URLs de imágenes
                const imageUrls = product.images.map(image => image.imagen);
                product.imageUrls = imageUrls;

                // Asignación de tallas si el producto pertenece a la categoría 1
                if (product.Categoria === 1) {
                    const sizes = await this.sizesService.getSizeById(product.Id);
                    const size = sizes[0] as Size;
                    product.sizes = size ? size.Tallas.split(',') : null;
                }
            }
            return res.status(200).json({ product: result });

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    getProductsByCollection = async (req: Request, res: Response) => {
        const idParam = req.params.id;
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }
        try {
            const result = await this.collectionProductService.getProductsByCollection(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'No se encontraron productos' });
            }

            for (const product of result) {

                const valorationResult = await this.valorationService.getValorationByProduct(product.Id);
                if (Array.isArray(valorationResult) && valorationResult.every((item) => 'Valoration' in item)) {
                    product.valoracion = valorationResult.length > 0 ? (valorationResult[0] as ValorationResult).Valoration : 0;

                } else {
                    console.error('Invalid valoration result:', valorationResult);

                    product.valoracion = 0;
                }
                const imageUrls = product.images.map(image => image.imagen);
                product.imageUrls = imageUrls;
            }

            return res.status(200).json({ products: result });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    getBestSellers = async (req: Request, res: Response) => {
        try {
            const results = await this.bestSellerProductService.getBestSellers();
            if (!results) return res.status(404).json({ error: 'No se encontraron productos' });

            for (const product of results) {
                const valorationResult = await this.valorationService.getValorationByProduct(product.Id);

                if (!valorationResult) res.status(400).json({ error: 'Valoration not found' });

                if (Array.isArray(valorationResult) && valorationResult.every((item) => 'Valoration' in item)) {
                    product.valoracion = valorationResult.length > 0 ? (valorationResult[0] as ValorationResult).Valoration : 0;
                } else {
                    console.error('Invalid valoration result:', valorationResult);
                    product.valoracion = 0;
                }

                const imageUrls = product.images.map(image => image.imagen);
                product.imageUrls = imageUrls;
            }
            return res.status(200).json({ products: results });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return res.status(500).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

export default ProductController;