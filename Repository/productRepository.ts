import sequelize from '../config/sequelizeConfig';
import { QueryTypes } from 'sequelize';
import { deleteFilesFromFirebase } from '../utils/actions';
import { ProductImages } from '../Models';

export interface Product {
    Id: number;
    [key: string]: unknown; // Esto permite que el producto tenga propiedades adicionales
}

class ProductRepository {

    async getAllProductsAdmin() {
        try {
            return await sequelize.query('SELECT * FROM Vista_Productos', { type: QueryTypes.SELECT });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting all products for admin: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting all products for admin`);
            }
        }
    }

    async getProductById(id: number) {
        try {
            return await sequelize.query('SELECT * FROM vista_productos_general WHERE id = ?', { replacements: [id], type: QueryTypes.SELECT });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting product by id: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting product by id`);
            }
        }
    }

    async getProductImagesById(id: number): Promise<ProductImages[]> {
        try {
            return await ProductImages.findAll({ where: { id_producto: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting product images by id: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting product images by id`);
            }
        }
    }

    async updateClothingProduct(id: number, Nombre_Producto: string, Descripcion: string, Precio: string | number, collection: string | number, category: string | number, provider: string | number, Cantidad: string | number, gender: string, sizes: string, status: string, images: string, filePaths: string[]) {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const result = await sequelize.query('CALL ActualizarProductoRopa  (?,?,?,?,?,?,?,?,?,?,?,?)', {
                replacements: [id, Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizes, images, status],
                type: QueryTypes.RAW
            });

            return true;
        } catch (error: unknown) {
            deleteFilesFromFirebase(filePaths, 'products');
            if (error instanceof Error) {
                throw new Error(`Error while updating clothing product: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating clothing product`);
            }
        }
    }

    async updateProduct(id: number, Nombre_Producto: string, Descripcion: string, Precio: string|number, Cantidad: string | number, category: string | number, provider: string|number, collection: string|number, images: string, status: string, filePaths: string[]) {
        try {
        
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const results = await sequelize.query(
                'CALL ActualizarProductoInventario(?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
                {
                    replacements: [id, Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, images, status],
                    type: QueryTypes.RAW
                }
            );

            return true;

        } catch (error: unknown) {
            deleteFilesFromFirebase(filePaths, 'products');
            if (error instanceof Error) {
                throw new Error(`Error while updating product: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating product`);
            }
        }
    }

    async saveProduct(Nombre_Producto: string, Descripcion: string, Precio: string | number, collection: string | number, category: string| number, provider: string| number, Cantidad: string|number, images: string, filePaths: string[], status: string) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const results = await sequelize.query(
                'CALL InsertarProductoInventario(:Nombre_Producto, :Descripcion, :Precio, :collection, :category, :provider, :Cantidad, :images, :status)',
                {
                    replacements: { Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, images, status },
                    type: QueryTypes.RAW
                }
            );
            return true;
        } catch (error: unknown) {
            deleteFilesFromFirebase(filePaths, 'products');
            if (error instanceof Error) {
                throw new Error(`Error while saving product: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving product`);
            }
        }
    }

    async saveClothingProduct(Nombre_Producto: string, Descripcion: string, Precio: number|string, collection: number | string, category: number|string, provider: number|string, Cantidad: number|string, gender: string, sizes: string, status: string, images: string, filePaths: string[]) {

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const result = await sequelize.query('CALL InsertarProductoRopa (?,?,?,?,?,?,?,?,?,?,?)', {
                replacements: [Nombre_Producto, Descripcion, Precio, collection, category, provider, Cantidad, gender, sizes, status, images],
                type: QueryTypes.RAW
            });

            return true;
        } catch (error: unknown) {
            deleteFilesFromFirebase(filePaths, 'products');
            if (error instanceof Error) {
                throw new Error(`Error while saving clothing product: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving clothing product`);
            }
        }
    }

    async deleteProduct(id: number): Promise<boolean> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const results = await sequelize.query(
                'CALL DeleteProductLogical (?)', {
                replacements: [id], type: QueryTypes.RAW
            }
            )
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting product: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while deleting product`)
            }
        }
    }

    //CLOTHES
    async getClothesProducts() {
        try {
            const products = await sequelize.query('Select *from Vista_Productos_Ropa_Talla', { type: QueryTypes.SELECT });

            if (!products) {
                throw new Error('Products not found');
            }

            return products;

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting clothes products: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting clothes products`)
            }
        }
    }

    //Products BY Collection
    async getProductsByCollection(id_collection: number): Promise<(Product & { images: ProductImages[] })[]> {
        try {
            const products: Product[] = await sequelize.query('Select *from Vista_Productos_General WHERE Id_Coleccion = ?', { replacements: [id_collection], type: QueryTypes.SELECT });

            const imagesPerProduct = await Promise.all(products.map(async (product) => {
                if (!product.Id) {
                    throw new Error('Product not found');
                }
                const images = await ProductImages.findAll({ where: { id_producto: product.Id } });
                return { product, images };
            }));

            return imagesPerProduct.map(({ product, images }) => {
                (product as Product & { images: ProductImages[] }).images = images;
                return product as Product & { images: ProductImages[] };
            });

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting products by collection: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting products by collection`)
            }
        }
    }

    async getClotheById(id: number) {
        try {
            const product = await sequelize.query('SELECT * FROM Vista__Ropa_Talla WHERE id = ?', { replacements: [id], type: QueryTypes.SELECT });
            const images = await ProductImages.findAll({ where: { id_producto: id } });
            return { product: product, images: images };
        } catch (error) {
            console.log(error);
        }
    }

    //PUBLIC PRODUCTS

    async getPublicProducts(): Promise<(Product & { images: ProductImages[] })[]> {
        try {
            // Realiza la consulta y tipifica el resultado como Product[]
            const products: Product[] = await sequelize.query(
                'SELECT * FROM Vista_Productos_General',
                { type: QueryTypes.SELECT }
            );

            // Obtén las imágenes asociadas a cada producto
            const imagesPerProduct = await Promise.all(products.map(async (product) => {
                // Verifica si el producto tiene la propiedad Id
                if (!product.Id) {
                    throw new Error(`Product with missing Id found: ${JSON.stringify(product)}`);
                }
                // Obtén las imágenes del producto
                const images = await ProductImages.findAll({ where: { id_producto: product.Id } });
                return { product, images };
            }));

            // Asocia las imágenes con cada producto y devuelve el resultado
            return imagesPerProduct.map(({ product, images }) => {
                // Añade las imágenes al producto
                (product as Product & { images: ProductImages[] }).images = images;
                return product as Product & { images: ProductImages[] };
            });

        } catch (error) {
            console.error('Error while getting public products:', error);
            throw new Error('Failed to get public products'); // Lanza un error para que el llamador pueda manejarlo
        }
    }

    //Best Sellers
    async getBestSellers(): Promise<(Product & { images: ProductImages[] })[]> {
        try {
            const result: Product[] = await sequelize.query('SELECT * FROM bestsellers', { type: QueryTypes.SELECT });

            const imagesPerProduct = await Promise.all(result.map(async (product) => {
                if (!product.Id) {
                    throw new Error('Product not found');
                }

                const images = await ProductImages.findAll({ where: { id_producto: product.Id } });
                return { product, images };
            }));

            return imagesPerProduct.map(({ product, images }) => {
                (product as Product & { images: ProductImages[] }).images = images;
                return product as Product & { images: ProductImages[] };
            });

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting best sellers: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting best sellers`)
            }
        }
    }

    async getPublicProductById(id: number) {
        try {
            const product: Product[] = await sequelize.query('Select *from Vista_Productos_General WHERE id = ?', { replacements: [id], type: QueryTypes.SELECT });

            const imagesPerProduct = await Promise.all(product.map(async (prod) => {

                if (!prod.Id) {
                    throw new Error('Product not found');
                }

                const images = await ProductImages.findAll({ where: { id_producto: prod.Id } });

                return { product: prod, images };
            }));

            return imagesPerProduct.map(({ product, images }) => {
                (product as Product & { images: ProductImages[] }).images = images;
                return product as Product & { images: ProductImages[] };
            });

        } catch (error) {
            console.log(error);
        }
    }
}
export default ProductRepository;