
export interface InvoiceAttributes {
    id_factura: number;
    id_usuario: number;
    titular: string;
    cedula: number | string;
    direccion_pago: string;
    fecha: Date;
    total: number;
    status: string;
}

export interface InvoiceDetailsAttributes {
    id_detallefactura: number;
    id_factura: number;
    id_producto: number;
    cantidad: number;
    precio: number;
}
