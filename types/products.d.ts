
interface ProductAttributes {
    id: number;
    Nombre_producto: string;
    Descripcion_Producto: string;
    Precio_Produtos: number;
    id_coleccion: number;
    id_tipo: number;
    status: string;
}


export interface ProductImagesAttributes {
    id: number;
    id_producto: number;
    imagen: string;
}