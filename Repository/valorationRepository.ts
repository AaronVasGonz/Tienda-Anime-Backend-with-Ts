
import { QueryTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

class ValorationRepository {

    async getValorationsByProduct(id: number) {
        try {
            const result = await sequelize.query('SELECT AVG(puntuacion) AS Valoration FROM valoracion WHERE id_producto = ?', { replacements: [id], type: QueryTypes.SELECT });
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching average valoration: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while fetching average valoration`);
            }
        }
    };
}

export default  ValorationRepository;