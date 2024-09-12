
import sequelize from "../config/sequelizeConfig";
import { QueryTypes } from "sequelize";
class SizesRepository {
    async getSizes() {
        try {
            return await sequelize.query('select *from Vista_Talla', { type: QueryTypes.SELECT });
        } catch (error:unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting sizes: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting sizes`);
            }
        }
    }
    async getSizesById(id: number) {
        try {
            return await sequelize.query('select Tallas from Vista_Productos_Ropa_Talla where Id = ?', { replacements: [id], type: QueryTypes.SELECT });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting sizes by id: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while getting sizes by id`);
            }
        }
    }
}
export default SizesRepository;


