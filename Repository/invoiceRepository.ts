import { QueryTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import  Invoice  from '../Models/invoice';

class InvoiceRepository {
    async getInvoice(id: number): Promise<Invoice | null> {
        try {
            return await sequelize.query('SELECT * FROM ObtenerFactura WHERE id_factura = ?', {
                replacements: [id],
                type: QueryTypes.SELECT,
                plain: true
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting invoice: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting invoice`);
            }
        }
    }

    async getOrders(): Promise<object | null> {
        try {
            return await sequelize.query('SELECT * FROM vista_pedido', {
                type: QueryTypes.SELECT
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting invoice: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting invoice`);
            }
        }
    }

    async getInvoiceByUserId(id: number): Promise<object | null> {
        try {
            return await sequelize.query('SELECT * FROM vista_facturas_detalladas WHERE id_factura = ?', {
                replacements: [id],
                type: QueryTypes.SELECT
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting invoice: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting invoice`);
            }
        }
    }

    async getOrdersByUserId(id: number): Promise<object | null> {
        try {
            return await sequelize.query('SELECT * FROM vista_pedido WHERE id_usuario = ?', {
                replacements: [id],
                type: QueryTypes.SELECT
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting orders: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting orders`);
            }
        }
    }

    async updateInvoice(id: number, status: string): Promise<Invoice | null> {
        try {
            const result = await Invoice.update({ status: status }, { where: { id_factura: id } });
            if (!result) {
                return null;
            };

            return await this.getInvoice(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating invoice: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while updating invoice`);
            }
        }
    }
}
export default InvoiceRepository;