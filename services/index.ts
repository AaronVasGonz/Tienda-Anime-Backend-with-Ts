// Importing Storage Services
import StorageService from './storageService';
import ImageManager from './imageManager';

// Importing repositories
import ProductRepository from '../Repository/productRepository';
import CategoryRepository from '../Repository/categoryRepository';
import CollectionRepository from '../Repository/collectionRepository';
import ProviderRepository from '../Repository/providerRepository';
import RoleRepository from '../Repository/roleRepository';
import UserRepository from '../Repository/userRepository';
import UserDetailsRepository from '../Repository/userDetailsRepository';
import LoginRepository from '../Repository/loginRepository';
import RoleLoginRepository from '../Repository/roleLoginRepository';
import SignUpRepository from '../Repository/signUpRepository';
import PaymentRepository from '../Repository/paymentRepository';
import InvoiceRepository from '../Repository/invoiceRepository';

// Importing products Services
import ProductService from './products/productService';
import ProductUpdater from './products/productUpdaterService';
import ClothingProductService from './products/clothingProductService';
import SizesService from './sizesService';
import CollectionProductService from './products/collectionProductService';
import BestSellerProductService from './products/BestSellerProductService';
import ValorationService from './valorationService';
import PublicProductService from './products/publicProductService';
import ProductAdderService from './products/productAdderService';
import ProductDeleterService from './products/ProductDeleterService';

// Importing categories Services
import CategoryService from './categories/categoriesService';
import CategorySaveService from './categories/saveCategoryService';
import CategoryUpdateService from './categories/updateCategoryService';
import CategoryDeleteService from './categories/deleteCategoryService';

// Importing Collection Services
import CollectionService from './collections/collectionService';
import CollectionSaveService from './collections/saveCollectionService';
import CollectionUpdateService from './collections/updateCollectionService';
import CollectionDeleteService from './collections/deleteCollectionService';

// Importing Provider Services
import ProviderService from './provider/providerService';
import ProviderSaveService from './provider/saveProviderService';
import ProviderUpdateService from './provider/updateProviderService';
import ProviderDeleteService from './provider/deleteProviderService';

// Importing Authentication Services
import AuthenticationService from './authentication/authUserService';

// Importing Login Services
import LoginService from './authentication/loginService';

// Importing Sign Up Service
import SignUpService from './authentication/signUpService';

// Importing User Services
import UserService from './users/userService';
import UserSaveService from './users/saveUserService';
import UserUpdateService from './users/updateUserService';
import UserDeleteService from './users/deleteUserService';

// Importing UserDetails Services
import UserDetailsService from './userDetails/userDetailsService';

// Importing Contact Services
import ContactService from './contact/contactService';

// Importing Countries Services
import CountryService from './countries/countriesService';

// Importing Invoice Services
import InvoiceService from './invoices/invoiceService';
import InvoiceUpdateService from './invoices/invoiceUpdateService';

// Importing Payment Services
import PaymentService from './payment/paymentService';

export  {
    ProductService,
    ProductUpdater,
    ClothingProductService,
    SizesService,
    CollectionProductService,
    BestSellerProductService,
    ValorationService,
    PublicProductService,
    StorageService,
    ProductRepository,
    ImageManager,
    ProductAdderService,
    ProductDeleterService,
    CategoryService,
    CategoryRepository,
    CategorySaveService,
    CategoryUpdateService,
    CategoryDeleteService,
    CollectionService,
    CollectionRepository,
    CollectionSaveService,
    CollectionUpdateService,
    CollectionDeleteService,
    ProviderService,
    ProviderRepository,
    ProviderSaveService,
    ProviderUpdateService,
    ProviderDeleteService,
    RoleRepository,
    UserRepository,
    UserService,
    UserSaveService,
    UserUpdateService,
    UserDeleteService,
    UserDetailsRepository,
    UserDetailsService,
    LoginRepository,
    RoleLoginRepository,
    LoginService,
    SignUpRepository,
    SignUpService,
    ContactService,
    CountryService,
    PaymentRepository,
    PaymentService,
    InvoiceRepository,
    InvoiceService,
    InvoiceUpdateService,
    AuthenticationService
};