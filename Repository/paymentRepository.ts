import sequelize from '../config/sequelizeConfig';
import { QueryTypes } from 'sequelize';

export interface NewInvoiceIdResult {
    id_factura: number;
}
class PaymentRepository {

    async savePayment(userId: number, productsId: number, holderName: string, id: number, address: string, date: Date, total: number, quintities: number, prices: number): Promise<{ results: NewInvoiceIdResult; id_factura: number }> {
        try {
            await sequelize.query('CALL Insertar_Factura_Pago(?,?,?,?,?,?,?,?,?, @New_Factura_Id);', {
                replacements: [userId, productsId, holderName, id, address, date, total, quintities, prices],
                type: QueryTypes.RAW
            });

            const results = await sequelize.query<NewInvoiceIdResult>('SELECT @New_Factura_Id AS id_factura;', {
                type: QueryTypes.SELECT
            });

            if (results.length === 0) {
                throw new Error('Error while saving payment');
            }
            const facturaId = results[0].id_factura;
            return { results: results[0], id_factura: facturaId };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while saving payment: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving payment`);
            }
        }
    }
}

export default PaymentRepository;