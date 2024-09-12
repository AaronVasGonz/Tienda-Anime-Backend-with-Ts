import express from 'express';
import cors from 'cors';
// Importing Middlewares
import { authAdmin } from '../middlewares/jwtServices';
import { uploadFiles, uploadFileProductsToFirebase } from '../middlewares/files';

// Importing Repositories
import SizesRepository from '../Repository/sizesRepository';
import ValorationRepository from '../Repository/valorationRepository';

// Importing Services
import {
    ProductService, ProductUpdater, ClothingProductService, SizesService, 
    CollectionProductService, BestSellerProductService, ValorationService, 
    PublicProductService, StorageService, ProductRepository, ImageManager, 
    ProductAdderService, ProductDeleterService, CategoryService, CategoryRepository 
} from '../services/index';


// Importing Controllers
import ProductController from '../controllers/productController';

//categories Services
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);

//Product Services
const productRepository = new ProductRepository();
const sizesRepository = new SizesRepository ();
const valorationRepository = new ValorationRepository();
const imageManager = new ImageManager();
const productService = new ProductService(productRepository);
const clothingProductService = new ClothingProductService(productRepository);
const collectionProductService = new CollectionProductService(productRepository);
const bestSellerProductService = new BestSellerProductService(productRepository);
const sizesService = new SizesService(sizesRepository);
const storageService = new StorageService();
const valorationService = new ValorationService(valorationRepository); 
const publicProductService = new PublicProductService(productRepository);
const productUpdaterService = new ProductUpdater(productRepository, storageService, imageManager);
const productAdderService = new ProductAdderService( productRepository, storageService, categoryService);
const productDeleterService = new ProductDeleterService(productRepository);

const productController = new ProductController(
    productService, productUpdaterService,clothingProductService,
    sizesService,collectionProductService,bestSellerProductService,
    valorationService,publicProductService,storageService,
    productRepository,imageManager, productAdderService,
    productDeleterService
)

const routerProducts = express.Router();
routerProducts.use(cors());
routerProducts.use(express.json());
/*Protected products routes */
routerProducts.get('/productsAdmin', authAdmin,productController.getProducts);
routerProducts.post('/productsAdmin', authAdmin, uploadFiles, uploadFileProductsToFirebase, productController.addProduct);
routerProducts.get('/productsAdmin/:id', authAdmin, productController.getProduct);
routerProducts.put('/productsAdmin/:id', authAdmin, uploadFiles, uploadFileProductsToFirebase, productController.updateProduct);
routerProducts.delete('/productsAdmin/:id', authAdmin, productController.deleteProduct);

/*routing clothes products */
routerProducts.get('/clothesAdmin', authAdmin, productController.getClothes);
routerProducts.get('/clothesAdmin/sizes', authAdmin ,productController.getSizes);

routerProducts.get('/clothesAdmin/:id', authAdmin, productController.getClothe);
/*Public products */
routerProducts.get('/public/products', productController.getPublicProducts);
routerProducts.get('/public/products/:id', productController.getPublicProduct);
routerProducts.get('/public/products-collection/:id', productController.getProductsByCollection);

/* Best Sellers */
routerProducts.get('/bestSellers', productController.getBestSellers);


export default routerProducts;